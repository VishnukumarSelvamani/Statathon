import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const ApiContext = createContext();

export const useApi = () => useContext(ApiContext);

export const ApiProvider = ({ children }) => {
    // Global State
    const [datasets, setDatasets] = useState([]);
    const [selectedDataset, setSelectedDataset] = useState(null);

    // Risk Metrics State (Dashboard, Analyzer, Proof)
    const [riskMetrics, setRiskMetrics] = useState({
        globalStats: { totalFiles: 0, highRisk: 0, pending: 0, approved: 0 },
        auditStatus: 'Pending',
        riskAttributes: { high: [], medium: [], low: [] },
        explanations: {},
        summary: { highRisk: 0, mediumRisk: 0, lowRisk: 0, highRiskCount: 0, mediumRiskCount: 0, lowRiskCount: 0 },
        score: 0,
        fileRisks: [],
        riskBreakdown: { quasiIdentifier: 0, uniqueness: 0, anonymization: 0, residual: 0 }
    });

    // Differential Privacy Output State
    const [dpOutput, setDpOutput] = useState({
        epsilon: 0,
        noiseDistribution: 'None',
        noiseAdded: 0,
        totalRecords: 0,
        explanation: 'Select a dataset to view privacy impact.'
    });
    const [noiseLevel, setNoiseLevel] = useState('standard'); // 'standard' or 'low'

    // Anonymization State
    const [policies, setPolicies] = useState([]);
    const [anonymizationResult, setAnonymizationResult] = useState(null);
    const [activityData, setActivityData] = useState([]);

    // Loading & Error States
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Initial Load
    useEffect(() => {
        loadDatasets();
        fetchPolicies();
        loadActivityData();
    }, []);

    // Actions
    const loadDatasets = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await api.fetchTables();
            setDatasets(Array.isArray(data) ? data : []);

            // Auto-select first dataset if none selected
            if (!selectedDataset && data && data.length > 0) {
                const first = data[0];
                setSelectedDataset(first);
                runDatasetAssessment(first.id || first.name);
            }
        } catch (err) {
            console.error("Failed to load datasets:", err);
            setError(err.message || "Failed to load datasets.");
        } finally {
            setIsLoading(false);
        }
    };

    const runDatasetAssessment = async (datasetId, options = {}) => {
        if (!datasetId) return;
        setIsLoading(true);
        setError(null);
        // Merge current noise choice if not overridden
        const assessmentOptions = {
            noiseLevel: options.noiseLevel || noiseLevel,
            ...options
        };
        try {
            const result = await api.assessDataset(datasetId, assessmentOptions);

            // Backend returns { dataset, record_count, risk_result, sample_records }
            // We need to map this to our internal riskMetrics state

            console.log("API RESPONSE:", result);

            const riskData = result.risk_result || {};

            // Map risk attributes with explainability logic
            // Use backend attributes if available, else defaults
            const mappedAttributes = riskData.riskAttributes || {
                high: [],
                medium: [],
                low: []
            };

            const explanations = {
                high: "Attributes with high cardinality or low entropy that can uniquely identify individuals when combined.",
                medium: "Common demographic filters that narrow down the population significantly.",
                low: "Aggregated or low-cardinality flags that provide minimal individual insight."
            };

            // Synthesize a 'fileRisk' entry for the analyzer table
            const currentFileRisk = {
                file: result.dataset || datasetId,
                riskLevel: riskData.level || (riskData.score > 70 ? 'High' : (riskData.score > 30 ? 'Medium' : 'Low')),
                approval: 'Processed',
                dpRecords: result.record_count || 0,
                riskScore: riskData.score || 0
            };

            setRiskMetrics(prev => {
                const safePrev = prev || {};
                return {
                    ...safePrev,
                    globalStats: result.globalStats || safePrev.globalStats || { totalFiles: 0, highRisk: 0, pending: 0, approved: 0 },
                    auditStatus: 'Completed',
                    riskAttributes: mappedAttributes,
                    explanations: explanations,
                    summary: riskData.summary || { highRisk: 0, mediumRisk: 0, lowRisk: 0, highRiskCount: 0, mediumRiskCount: 0, lowRiskCount: 0 },
                    score: riskData.score !== undefined ? riskData.score : 0, // Allow 0
                    // Replace fileRisks with the current dataset's risk
                    fileRisks: [currentFileRisk],
                    riskBreakdown: riskData.riskBreakdown || {
                        quasiIdentifier: 0,
                        uniqueness: 0,
                        anonymization: 0,
                        residual: 0
                    }
                };
            });

            // Align Scientific DP Output
            // If backend provides dpOutput, use it. Else fall back to null/undefined.
            const dpOutputData = result.dpOutput || riskData.dpOutput || {};

            setDpOutput({
                epsilon: dpOutputData.epsilon, // distinct from null/undefined if possible
                noiseDistribution: dpOutputData.noiseDistribution,
                noiseAdded: dpOutputData.noiseAdded,
                totalRecords: result.record_count || dpOutputData.totalRecords || 0,
                explanation: assessmentOptions.noiseLevel === 'low'
                    ? `Using ε=${dpOutputData.epsilon} (Relaxed Privacy) provides higher utility.`
                    : `Using ε=${dpOutputData.epsilon} ensures strict $(\epsilon, \delta)$-differential privacy.`
            });

            return result;
        } catch (err) {
            console.error("Dataset assessment failed:", err);
            setError(err.message || "Assessment failed.");
        } finally {
            setIsLoading(false);
        }
    };

    const runTableAssessment = async (tableId) => {
        setIsLoading(true);
        try {
            return await api.assessTable(tableId);
        } catch (err) {
            setError(err.message || "Table assessment failed");
        } finally {
            setIsLoading(false);
        }
    };

    const updateNoiseLevel = async (level) => {
        if (!selectedDataset) return;
        setNoiseLevel(level);
        await runDatasetAssessment(selectedDataset.id || selectedDataset.name, { noiseLevel: level });
    };

    const runQueryAssessment = async (query) => {
        setIsLoading(true);
        try {
            return await api.assessQuery(query);
        } catch (err) {
            setError(err.message || "Query assessment failed");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchPolicies = async () => {
        try {
            const result = await api.listPolicies();
            setPolicies(result);
        } catch (err) {
            console.error("Failed to fetch policies:", err);
            setPolicies([]);
        }
    };

    const loadActivityData = async () => {
        try {
            const data = await api.fetchDashboardActivity();
            setActivityData(data);
        } catch (err) {
            console.error("Failed to load activity data:", err);
            setActivityData([]);
        }
    };

    const runAnonymization = async (datasetId, policy) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await api.assessAndPrivatize(datasetId, policy);
            setAnonymizationResult(result);
            return result;
        } catch (err) {
            console.error("Anonymization failed:", err);
            setError(err.message || "Anonymization failed");
        } finally {
            setIsLoading(false);
        }
    };

    const selectDataset = (dataset) => {
        if (!dataset || (selectedDataset && selectedDataset.id === dataset.id)) return;

        // RESET STATE to safe defaults to prevent stale data but avoid null
        setRiskMetrics({
            globalStats: { totalFiles: 0, highRisk: 0, pending: 0, approved: 0 },
            auditStatus: 'Analyzing...',
            riskAttributes: { high: [], medium: [], low: [] },
            explanations: {},
            summary: { highRisk: 0, mediumRisk: 0, lowRisk: 0, highRiskCount: 0, mediumRiskCount: 0, lowRiskCount: 0 },
            score: 0,
            fileRisks: [],
            riskBreakdown: { quasiIdentifier: 0, uniqueness: 0, anonymization: 0, residual: 0 }
        });
        setDpOutput({
            epsilon: 0,
            noiseDistribution: 'None',
            noiseAdded: 0,
            totalRecords: 0,
            explanation: 'Analyzing...'
        });
        setAnonymizationResult(null);
        setError(null);

        setSelectedDataset(dataset);
        runDatasetAssessment(dataset.id || dataset.name);
    };

    // Value Object
    const value = {
        datasets,
        selectedDataset,
        setSelectedDataset,
        selectDataset,
        riskMetrics,
        dpOutput,
        isLoading,
        error,
        loadDatasets,
        runTableAssessment,
        runQueryAssessment,
        runDatasetAssessment,
        noiseLevel,
        updateNoiseLevel,
        anonymizationResult,
        runAnonymization,
        policies,
        fetchPolicies,
        activityData,
        exportReport: api.exportReport // Direct mapping
    };

    return (
        <ApiContext.Provider value={value}>
            {children}
        </ApiContext.Provider>
    );
};
