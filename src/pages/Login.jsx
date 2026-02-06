import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, User, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { ShadowSafeLogo } from '../components/ui/ShadowSafeLogo';
import { api } from '../services/api';
import './Login.css';

export const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [generalError, setGeneralError] = useState('');

    useEffect(() => {
        console.log("Login Component v2.1 Loaded - Frontend Allowed");
    }, []);

    // --- GOVERNMENT VALIDATION RULES ---
    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)?(gov\.in|nic\.in|mospi\.gov\.in|nss\.gov\.in)$/;
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setGeneralError('');

        // Auto-trim inputs to avoid accidental spaces causing validation errors
        const cleanUsername = credentials.username.trim();
        const cleanPassword = credentials.password.trim(); // Optional: password usually shouldn't be trimmed, but for initial login often helps. Let's start with just username.

        // Update state with trimmed username
        const cleanCredentials = { ...credentials, username: cleanUsername };

        console.log("Validating credentials for:", cleanUsername);

        // Validate using the CLEANED username
        const validate = () => {
            const newErrors = {};

            // Email Validation
            if (!cleanUsername) {
                newErrors.username = "Username is required.";
            } else if (!EMAIL_REGEX.test(cleanUsername)) {
                newErrors.username = "Access Restricted: Use official government email ID (@gov.in, @nic.in).";
                console.warn("Validation Failed: Invalid Email Domain", cleanUsername);
            }

            // Password Validation (Check against raw or trimmed?)
            // Usually passwords are strict. But for user ease, let's keep raw matching but ensure no surrounding spaces if they copy-pasted.
            // For now, testing raw password as typed.
            if (!credentials.password) {
                newErrors.password = "Password is required.";
            } else if (!PASSWORD_REGEX.test(credentials.password)) {
                newErrors.password = "Password must be at least 12 characters, with uppercase, lowercase, number, and special char.";
                console.warn("Validation Failed: Password complexity not met");
            }

            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        };

        if (!validate()) return;

        // --- FRONTEND BYPASS FOR DEMO/OFFLINE ACCESS ---
        const targetUser = 'admin@mospi.gov.in';
        if (cleanUsername.toLowerCase() === targetUser.toLowerCase()) {
            console.log("BYPASS: Using Frontend-Only Login for Admin");
            setIsLoading(true);

            // Simulate network delay
            setTimeout(() => {
                const fakeResponse = {
                    token: "mock-backend-token-" + Date.now(),
                    user: {
                        id: 1,
                        username: "admin@mospi.gov.in",
                        email: "admin@mospi.gov.in",
                        role: "admin",
                        name: "System Administrator"
                    }
                };

                localStorage.setItem('token', fakeResponse.token);
                localStorage.setItem('user', JSON.stringify(fakeResponse.user));
                setIsLoading(false);
                navigate('/dashboard');
            }, 800);
            return;
        }
        // -----------------------------------------------

        setIsLoading(true);
        console.log("Sending login request to API...");
        try {
            const response = await api.login(cleanUsername, credentials.password);
            console.log("API Response received:", response);

            if (response.token) {
                // Success
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
                navigate('/dashboard');
            }
        } catch (error) {
            console.error("Login Failed:", error);
            if (error.status === 429) {
                setGeneralError("Account Locked: Too many failed attempts. Please try again later.");
            } else if (error.status === 401) {
                setGeneralError("Invalid credentials. Please check your username and password.");
            } else {
                setGeneralError(`Service unavailable: ${error.message || 'Connection Refused'}`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-header">
                    <div className="login-logo">
                        <ShadowSafeLogo className="shield-icon" style={{ width: '64px', height: '64px', color: 'white' }} />
                    </div>
                    <h1 className="white-text">ShadowSafe NSS</h1>
                    <p>Privacy Risk Auditing System</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    {generalError && (
                        <div className="login-alert error">
                            <AlertCircle size={16} />
                            <span>{generalError}</span>
                        </div>
                    )}

                    <div className="form-group">
                        <label>Username / Email</label>
                        <div className={`input-with-icon ${errors.username ? 'has-error' : ''}`}>
                            <User size={18} className="field-icon" />
                            <input
                                type="text"
                                placeholder="name@dept.gov.in"
                                value={credentials.username}
                                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                                className={errors.username ? 'input-error' : ''}
                            />
                        </div>
                        {errors.username && <span className="field-error-text">{errors.username}</span>}
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className={`input-with-icon ${errors.password ? 'has-error' : ''}`}>
                            <Lock size={18} className="field-icon" />
                            <input
                                type="password"
                                placeholder="Enter secure password"
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, username: credentials.username, password: e.target.value })}
                            />
                        </div>
                        {errors.password ? (
                            <span className="field-error-text">{errors.password}</span>
                        ) : (
                            <span className="field-hint-text">Min 12 chars, Upper, Lower, Number, Special.</span>
                        )}
                    </div>

                    <button type="submit" className="login-button" disabled={isLoading}>
                        {isLoading ? 'Authenticating...' : 'Login to Portal'}
                    </button>

                    <div className="login-footer">
                        <p>Ministry of Statistics & Programme Implementation</p>
                        <p className="footer-subtext">Unauthorized access is a punishable offense under IT Act, 2000.</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
