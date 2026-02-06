from flask import Flask, jsonify, request
from flask_cors import CORS
import time
import random

app = Flask(__name__)
# Enable CORS for frontend at port 5173 and 5174 (common vite ports)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# --- MOCK DATA STORE ---
DATASETS = [
    { "id": "1", "name": "PLFS_Annual_2024", "rowCount": 15400, "riskScore": 78, "status": "Active", "lastModified": "2024-01-15", "privacyScore": 88, "sensitivity": "High", "schema": [{"name": "Person_ID", "type": "Integer"}, {"name": "Age", "type": "Integer"}] },
    { "id": "2", "name": "NSS_Consumer_Expenditure", "rowCount": 8520, "riskScore": 45, "status": "Archived", "lastModified": "2024-01-20", "privacyScore": 92, "sensitivity": "Medium", "schema": [] },
    { "id": "3", "name": "ASI_Industrial_Data", "rowCount": 12000, "riskScore": 62, "status": "Analysis Ready", "lastModified": "2024-02-01", "privacyScore": 75, "sensitivity": "High", "schema": [] },
    { "id": "4", "name": "Health_Survey_2024", "rowCount": 25000, "riskScore": 30, "status": "Active", "lastModified": "2024-02-05", "privacyScore": 95, "sensitivity": "Low", "schema": [] },
    { "id": "5", "name": "Census_Sample_A", "rowCount": 50000, "riskScore": 85, "status": "Pending Review", "lastModified": "2024-02-10", "privacyScore": 60, "sensitivity": "Critical", "schema": [] }
]

import logging
from datetime import datetime
import time

# --- LOGGING CONFIG ---
logging.basicConfig(level=logging.INFO, format='[%(levelname)s] [%(asctime)s] %(message)s')
logger = logging.getLogger(__name__)

# --- RATE LIMIT STORAGE ---
# Format: { ip_address: { 'attempts': 0, 'lock_until': 0 } }
LOGIN_LIMITS = {}
MAX_ATTEMPTS = 5
LOCKOUT_TIME = 900  # 15 minutes in seconds

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username', '').lower().strip()
    password = data.get('password', '')
    ip = request.remote_addr
    
    current_time = time.time()
    
    # 1. Check Rate Limit
    if ip in LOGIN_LIMITS:
        record = LOGIN_LIMITS[ip]
        if record['lock_until'] > current_time:
             wait_time = int(record['lock_until'] - current_time)
             logger.warning(f"[AUTH] [FAIL] {ip} - Account locked. Wait {wait_time}s")
             return jsonify({
                 "error": f"Account locked due to too many failed attempts. Try again in {wait_time // 60} minutes."
             }), 429
        
        # Reset if lock expired
        if record['lock_until'] < current_time and record['lock_until'] != 0:
            LOGIN_LIMITS[ip] = {'attempts': 0, 'lock_until': 0}

    # 2. Accept All (Frontend handles strict format validation)
    # User requested to not enforce specific hardcoded credentials in backend.
    
    # Success (Mock)
    if ip in LOGIN_LIMITS:
        del LOGIN_LIMITS[ip] # Clear failures
        
    logger.info(f"[AUTH] [SUCCESS] {ip} - User: {username}")
    return jsonify({
        "token": "secure_session_token_" + str(int(current_time)),
        "user": { "name": "Government Official", "email": username, "role": "Administrator" }
    })
    
    # 3. Failure Handling
    if ip not in LOGIN_LIMITS:
        LOGIN_LIMITS[ip] = {'attempts': 0, 'lock_until': 0}
    
    LOGIN_LIMITS[ip]['attempts'] += 1
    
    if LOGIN_LIMITS[ip]['attempts'] >= MAX_ATTEMPTS:
        LOGIN_LIMITS[ip]['lock_until'] = current_time + LOCKOUT_TIME
        logger.warning(f"[AUTH] [LOCKOUT] {ip} - Exceeded max attempts")
        return jsonify({ "error": "Too many failed attempts. Account locked for 15 minutes." }), 429
        
    remaining = MAX_ATTEMPTS - LOGIN_LIMITS[ip]['attempts']
    logger.warning(f"[AUTH] [FAIL] {ip} - Invalid Creds. Attempts left: {remaining}")
    
    return jsonify({ "error": "Invalid credentials. Please try again." }), 401

@app.route('/api/list-tables/', methods=['GET'])
def list_tables():
    time.sleep(0.5) # Simulate latency
    # Format matches frontend expectation: { "tables": [ {table_name, schema...} ] }
    # Mapping DATASETS to backend format
    backend_tables = []
    for d in DATASETS:
        backend_tables.append({
            "table_name": d["name"],
            "schema": d["schema"]
        })
    return jsonify({"tables": backend_tables, "count": len(backend_tables)})

@app.route('/api/assess-table/', methods=['POST'])
def assess_table():
    time.sleep(0.5)
    data = request.json
    table_name = data.get('table_name', 'Unknown')
    
    return jsonify({
        "id": table_name,
        "name": table_name,
        "rowCount": 12500,
        "recordCount": 12500, # Explicitly adding this for ProofPage
        "schema": [
            { "name": "Person_ID", "type": "Integer" },
            { "name": "Age", "type": "Integer" },
            { "name": "Income", "type": "Float" },
            { "name": "Region", "type": "String" },
            { "name": "Disease", "type": "String" }
        ],
        "preview": [
            { "Person_ID": 101, "Age": 45, "Income": 50000, "Region": 'North', "Disease": 'Flu' },
            { "Person_ID": 102, "Age": 32, "Income": 35000, "Region": 'South', "Disease": 'Diabetes' },
            { "Person_ID": 103, "Age": 28, "Income": 62000, "Region": 'East', "Disease": 'None' },
            { "Person_ID": 104, "Age": 55, "Income": 48000, "Region": 'West', "Disease": 'Hypertension' },
            { "Person_ID": 105, "Age": 41, "Income": 54000, "Region": 'North', "Disease": 'Flu' }
        ],
        "sample_records": [ # Fallback duplications to ensuring frontend catches it
             { "Person_ID": 101, "Age": 45, "Income": 50000, "Region": 'North', "Disease": 'Flu' },
             { "Person_ID": 102, "Age": 32, "Income": 35000, "Region": 'South', "Disease": 'Diabetes' }
        ],
        "riskScore": 78
    })

@app.route('/api/assess-dataset/', methods=['POST'])
def assess_dataset():
    time.sleep(0.8)
    data = request.json
    dataset_name = data.get('dataset_name', 'Dataset')
    
    # Generate dynamic-looking but consistent data
    score = 45 if 'Consumer' in dataset_name else (78 if 'PLFS' in dataset_name else 60)
    
    return jsonify({
        "dataset": dataset_name,
        "risk_result": {
            "score": score,
            "level": "High" if score > 70 else "Medium",
            "summary": { "highRisk": 15, "mediumRisk": 25, "lowRisk": 60 }, # Sum should be 100 for proper pie interpretation
            "riskBreakdown": { "quasiIdentifier": 35, "uniqueness": 45, "anonymization": 50, "residual": 20 }
        },
        "sample_records": [
            { "Person_ID": 101, "Age": 45, "Income": 50000, "Region": 'North', "Disease": 'Flu' },
            { "Person_ID": 102, "Age": 32, "Income": 35000, "Region": 'South', "Disease": 'Diabetes' },
            { "Person_ID": 103, "Age": 28, "Income": 62000, "Region": 'East', "Disease": 'None' },
            { "Person_ID": 104, "Age": 55, "Income": 48000, "Region": 'West', "Disease": 'Hypertension' },
            { "Person_ID": 105, "Age": 41, "Income": 54000, "Region": 'North', "Disease": 'Flu' }
        ],
        "globalStats": { 
             "totalFiles": 12, "highRisk": 3, "pending": 4, "approved": 5
        },
        "dpOutput": {
            "epsilon": 1.2,
            "noiseDistribution": "Laplace", 
            "totalRecords": 1540
        }
    })

@app.route('/api/assess-query/', methods=['POST'])
def assess_query():
    time.sleep(0.3)
    return jsonify({
        "preview": [],
        "sample_records": []
    })

@app.route('/api/assess-and-privatize/', methods=['POST'])
def assess_and_privatize():
    time.sleep(1.5)
    return jsonify({
        "privatized_data": [], 
        "risk_score": 20, 
        "new_risk_score": 10, 
        "reduction": 50
    })

@app.route('/api/dashboard/activity', methods=['GET'])
def dashboard_activity():
    time.sleep(0.5)
    # Return realistic backend data to distinguish from mock fallback
    return jsonify({
        "data": [
            {"name": "Jan", "value": 15},
            {"name": "Feb", "value": 22},
            {"name": "Mar", "value": 18},
            {"name": "Apr", "value": 25},
            {"name": "May", "value": 32},
            {"name": "Jun", "value": 28},
            {"name": "Jul", "value": 35},
            {"name": "Aug", "value": 40},
            {"name": "Sep", "value": 38},
            {"name": "Oct", "value": 50},
            {"name": "Nov", "value": 45},
            {"name": "Dec", "value": 60}
        ]
    })

@app.route('/api/export-report/<dataset_id>', methods=['GET'])
def export_report(dataset_id):
    time.sleep(1.0)
    # Validate dataset exists
    dataset = next((d for d in DATASETS if d["id"] == dataset_id or d["name"] == dataset_id), None)
    
    if not dataset:
        return jsonify({"error": "Dataset not found"}), 404
        
    # Generate CSV content
    csv_content = f"Report for Dataset: {dataset['name']}\n"
    csv_content += f"Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n"
    csv_content += "Metric,Value\n"
    csv_content += f"Risk Score,{dataset['riskScore']}\n"
    csv_content += f"Privacy Score,{dataset['privacyScore']}\n"
    csv_content += f"Row Count,{dataset['rowCount']}\n"
    csv_content += f"Sensitivity,{dataset['sensitivity']}\n"
    
    from flask import Response
    return Response(
        csv_content,
        mimetype="text/csv",
        headers={"Content-disposition": f"attachment; filename={dataset['name']}_PrivacyReport.csv"}
    )

@app.route('/api/list-policies/', methods=['GET'])
def list_policies():
    return jsonify({ "policies": ['standard', 'strict', 'moderate', 'k-anonymity'] })

if __name__ == '__main__':
    print("Starting ShadowSafe Backend on port 8000...")
    app.run(port=8000, debug=True)
