import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Bell, Monitor, AlertTriangle, CheckCircle, Save, User as UserIcon, Key, Smartphone, Mail, LogOut, FileText, Settings as LeSettings, ChevronRight, ChevronLeft } from 'lucide-react';
import './Settings.css';

export const Settings = () => {
    // State Management
    const [password, setPassword] = useState('');
    const [isBreachDetected, setIsBreachDetected] = useState(false);
    const [showBreachAlert, setShowBreachAlert] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    // Toggles
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [emailAlerts, setEmailAlerts] = useState(true);
    const [systemAlerts, setSystemAlerts] = useState(true);
    const [breachProtection, setBreachProtection] = useState(true);

    const navigate = useNavigate();

    // Mock Logout Logic
    const handleLogout = () => {
        console.log("User confirmed logout");
        setShowLogoutConfirm(false);
        navigate('/'); // Redirect to landing or login
    };

    // Mock Security Breach Simulation
    const simulateBreach = () => {
        setIsBreachDetected(true);
        setShowBreachAlert(true);
    };

    const handlePasswordChange = () => {
        // In a real app, this would call an API with salted hashing
        console.log("Password update requested - Secure payload prepared");
        alert("Password updated successfully using secure channel.");
        setIsBreachDetected(false);
        setShowBreachAlert(false);
    };

    return (
        <div className="gov-settings-page force-light-theme">
            {/* Header with Back Button */}
            <div className="settings-header-nav">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ChevronLeft size={20} /> Back
                </button>
                <h1 className="page-title">Admin Settings</h1>
            </div>

            {/* Emergency Breach Alert Modal */}
            {showBreachAlert && (
                <div className="breach-alert-overlay">
                    <div className="breach-alert-card">
                        <div className="alert-header">
                            <AlertTriangle size={32} />
                            <h2>Security Alert: Critical Integrity Check Failed</h2>
                        </div>
                        <div className="alert-body">
                            <p className="alert-msg">
                                <strong>Warning:</strong> Abnormal login patterns detected originating from IP 10.23.4.55.
                                Per security protocol <strong>SEC-2026-A</strong>, your password integrity is compromised.
                            </p>
                            <p className="alert-instruction">
                                You must change your password immediately to restore account access.
                                All sensitive actions are temporarily restricted.
                            </p>
                        </div>
                        <div className="alert-footer">
                            <button className="gov-btn-danger" onClick={handlePasswordChange}>
                                Change Password Now
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Logout Confirmation Modal */}
            {showLogoutConfirm && (
                <div className="breach-alert-overlay">
                    <div className="breach-alert-card" style={{ borderTop: '6px solid #4b5563' }}>
                        <div className="alert-header" style={{ background: '#f3f4f6', color: '#1f2937' }}>
                            <LogOut size={24} />
                            <h2>Confirm Logout</h2>
                        </div>
                        <div className="alert-body">
                            <p className="alert-msg">
                                Are you sure you want to sign out of the admin portal?
                            </p>
                        </div>
                        <div className="alert-footer">
                            <button className="gov-btn-outline" onClick={() => setShowLogoutConfirm(false)} style={{ marginRight: '12px' }}>
                                Cancel
                            </button>
                            <button className="gov-btn-primary" onClick={handleLogout} style={{ background: '#dc2626' }}>
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="settings-grid-layout">

                {/* Section 1: Account Security */}
                <div className="settings-section-card">
                    <div className="section-title-row">
                        <h3>Account Security</h3>
                    </div>

                    <div className="settings-row">
                        <div className="setting-icon-box blue"><Lock size={20} /></div>
                        <div className="setting-info">
                            <h4>Change Password</h4>
                            <p>Update your account password to ensure your account remains secure.</p>
                        </div>
                        <button className="gov-btn-primary-small" onClick={() => alert("Password change flow initiated")}>
                            Change Password
                        </button>
                    </div>

                    <div className="settings-row">
                        <div className="setting-icon-box blue"><Shield size={20} /></div>
                        <div className="setting-info">
                            <h4>Password Breach Protection</h4>
                            <p>Activate breach detection to be alerted in case of any security breaches involving your password.</p>
                            <button className="link-btn-small" onClick={simulateBreach}>[1] View Breach Logs (Simulate)</button>
                        </div>
                        <label className="toggle-switch">
                            <input type="checkbox" checked={breachProtection} onChange={() => setBreachProtection(!breachProtection)} />
                            <span className="slider round"></span>
                        </label>
                    </div>

                    {isBreachDetected && (
                        <div className="inline-alert-box critical">
                            <AlertTriangle size={20} />
                            <div className="alert-content">
                                <strong>Your password was compromised on Apr 12, 2024.</strong>
                                <p>Immediate action is required. Change your password now!</p>
                                <button className="gov-btn-danger-small" onClick={handlePasswordChange}>Change Password</button>
                                <button className="link-btn-text">Mark Alert as Read</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Section 2: Authentication & Access */}
                <div className="settings-section-card">
                    <div className="section-title-row">
                        <h3>Authentication & Access</h3>
                    </div>

                    <div className="settings-row">
                        <div className="setting-icon-box blue"><Shield size={20} /></div>
                        <div className="setting-info">
                            <h4>Two-Factor Authentication (2FA)</h4>
                            <p>Add a second layer of security by enabling 2FA for your account login.</p>
                        </div>
                        <label className="toggle-switch">
                            <input type="checkbox" checked={twoFactorEnabled} onChange={() => setTwoFactorEnabled(!twoFactorEnabled)} />
                            <span className="slider round"></span>
                        </label>
                    </div>

                    <div className="settings-row">
                        <div className="setting-icon-box blue"><Monitor size={20} /></div>
                        <div className="setting-info">
                            <h4>Session Management</h4>
                            <p>Current Active Sessions: 2. Review and manage all active sessions of your account.</p>
                        </div>
                        <button className="gov-btn-outline-small" onClick={() => navigate('/login-activity')}>
                            View Active Sessions <ChevronRight size={14} />
                        </button>
                    </div>
                </div>

                {/* Section 3: Notifications */}
                <div className="settings-section-card">
                    <div className="section-title-row">
                        <h3>Notifications</h3>
                    </div>

                    <div className="settings-row">
                        <div className="setting-icon-box blue"><Mail size={20} /></div>
                        <div className="setting-info">
                            <h4>Email Alerts</h4>
                            <p>Receive important alerts and notifications via email.</p>
                        </div>
                        <label className="toggle-switch">
                            <input type="checkbox" checked={emailAlerts} onChange={() => setEmailAlerts(!emailAlerts)} />
                            <span className="slider round"></span>
                        </label>
                    </div>

                    <div className="settings-row">
                        <div className="setting-icon-box blue"><Bell size={20} /></div>
                        <div className="setting-info">
                            <h4>System Alerts</h4>
                            <p>Receive critical system-related alerts within this portal.</p>
                        </div>
                        <label className="toggle-switch">
                            <input type="checkbox" checked={systemAlerts} onChange={() => setSystemAlerts(!systemAlerts)} />
                            <span className="slider round"></span>
                        </label>
                    </div>

                    {isBreachDetected && (
                        <div className="inline-alert-box warning">
                            <AlertTriangle size={18} />
                            <div className="alert-content">
                                <strong>Immediate Action Required</strong>
                                <p>Your password was compromised. Please update your password immediately.</p>
                                <span className="timestamp">Apr 12, 2024 - 02:35 PM</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Section 4: Admin Profile & Account (Previously Dropdown) */}
                <div className="settings-section-card">
                    <div className="section-title-row">
                        <h3>Admin Profile & Account</h3>
                    </div>
                    <div className="profile-action-grid compact-grid">
                        <div className="profile-action-card clickable" onClick={() => navigate('/profile')}>
                            <div className="action-icon-wrapper blue"><UserIcon size={20} /></div>
                            <div className="action-content">
                                <h4>View Profile</h4>
                                <p>Manage details</p>
                            </div>
                            <ChevronRight size={16} className="action-arrow" />
                        </div>

                        <div className="profile-action-card clickable" onClick={() => navigate('/login-activity')}>
                            <div className="action-icon-wrapper cyan"><FileText size={20} /></div>
                            <div className="action-content">
                                <h4>Login Activity</h4>
                                <p>Audit logs</p>
                            </div>
                            <ChevronRight size={16} className="action-arrow" />
                        </div>

                        <div className="profile-action-card active disabled">
                            <div className="action-icon-wrapper grey"><LeSettings size={20} /></div>
                            <div className="action-content">
                                <h4>Settings</h4>
                                <p>Config</p>
                            </div>
                            <div className="active-indicator">Current</div>
                        </div>

                        <div className="profile-action-card clickable danger-hover" onClick={() => setShowLogoutConfirm(true)}>
                            <div className="action-icon-wrapper red"><LogOut size={20} /></div>
                            <div className="action-content">
                                <h4>Logout</h4>
                                <p>Sign out</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
