import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, User, Lock } from 'lucide-react';
import './Login.css';

export const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-header">
                    <div className="login-logo">
                        <Shield size={48} className="shield-icon" />
                    </div>
                    <h1 className="white-text">ShadowSafe NSS</h1>
                    <p>Privacy Risk Auditing System</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username / Email</label>
                        <div className="input-with-icon">
                            <User size={18} className="field-icon" />
                            <input
                                type="text"
                                placeholder="Enter your username"
                                value={credentials.username}
                                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-with-icon">
                            <Lock size={18} className="field-icon" />
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="login-button">
                        Login to Portal
                    </button>

                    <div className="login-footer">
                        <p>Ministry of Statistics & Programme Implementation</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
