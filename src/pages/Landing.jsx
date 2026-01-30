import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import './Landing.css';

export const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-page">
            <header className="landing-header">
                <div className="landing-logo">
                    <ShieldCheck size={28} className="logo-icon white-text" />
                    <span className="white-text">ShadowSafe NSS</span>
                </div>
            </header>

            <main className="landing-hero">
                <div className="hero-content">
                    <h1 className="hero-title white-text">ShadowSafe NSS</h1>
                    <p className="hero-subtitle white-text">
                        Privacy Risk Auditing & Differential Privacy System for NSS Data
                    </p>
                    <p className="hero-description white-text">
                        ShadowSafe NSS is a government-grade privacy-preserving system that analyzes re-identification risk in NSS datasets, applies adaptive anonymization and differential privacy without altering original data, and ensures safe data sharing through auditable zero-trust workflows.
                    </p>
                    <div className="cta-container">
                        <button className="cta-button" onClick={() => navigate('/login')}>
                            Login to Portal <ArrowRight size={20} />
                        </button>
                    </div>
                </div>

                <div className="hero-features">
                    <div className="feature-pill">
                        <span>Govt Security</span>
                    </div>
                    <div className="feature-pill">
                        <span>Adaptive DP</span>
                    </div>
                    <div className="feature-pill">
                        <span>Audit Compliance</span>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Landing;
