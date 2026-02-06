import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    User,
    ChevronDown,
    Settings,
    LogOut,
    UserCircle,
    X,
    Moon,
    Shield,
    Sun,
    Clock
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { NotificationDropdown } from './NotificationDropdown';
import './Topbar.css';

export const Topbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isDarkMode, toggleTheme } = useTheme();

    // State for Dropdown and Modals
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);


    // Mock User Data
    const userData = {
        name: 'Admin User',
        role: 'System Administrator',
        email: 'admin@shadowsafe.nss.gov.in',
        lastLogin: '2024-01-30 09:45 AM'
    };

    const getPageTitle = (path) => {
        switch (path) {
            case '/dashboard': return 'Dashboard';
            case '/anonymization': return 'ShadowSafe NSS | Privacy Risk & Differential Privacy Analyzer';
            case '/risk-analyzer': return 'ShadowSafe NSS | Privacy Risk & Differential Privacy Analyzer';
            case '/dataset-access': return 'Dataset Access (Researcher Download)';
            case '/proof': return 'Audit Proof Page';
            case '/hacker-ai': return 'Hacker AI Simulator';
            default: return 'ShadowSafe NSS';
        }
    };

    const handleLogout = () => {
        // Clear any auth tokens if implemented
        navigate('/login');
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <>
            <header className="topbar topbar-gov-blue">
                <div className="topbar-left">
                    <h1 className="page-title text-white">{getPageTitle(location.pathname)}</h1>
                </div>
                <div className="topbar-right">
                    {/* Search bar removed as per requirements */}

                    <div className="topbar-actions">
                        <NotificationDropdown />

                        {/* Admin Profile Section */}
                        <div className="admin-profile-container" ref={dropdownRef} onClick={toggleDropdown}>
                            <div className="admin-items-wrapper gov-blue-hover">
                                <div className="profile-icon">
                                    <User size={20} />
                                </div>
                                <span className="admin-name text-white">Admin</span>
                                <ChevronDown size={14} className={`dropdown-arrow text-white ${isDropdownOpen ? 'open' : ''}`} />
                            </div>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="admin-dropdown-menu">
                                    <div className="dropdown-item" onClick={(e) => { e.stopPropagation(); setShowProfileModal(true); setIsDropdownOpen(false); }}>
                                        <UserCircle size={16} />
                                        <span>View Profile</span>
                                    </div>
                                    <div className="dropdown-item" onClick={(e) => { e.stopPropagation(); navigate('/login-activity'); setIsDropdownOpen(false); }}>
                                        <Clock size={16} />
                                        <span>Login Activity</span>
                                    </div>
                                    <div className="dropdown-item" onClick={(e) => { e.stopPropagation(); setShowSettingsModal(true); setIsDropdownOpen(false); }}>
                                        <Settings size={16} />
                                        <span>Settings</span>
                                    </div>
                                    <div className="dropdown-divider"></div>
                                    <div className="dropdown-item danger" onClick={(e) => { e.stopPropagation(); handleLogout(); }}>
                                        <LogOut size={16} />
                                        <span>Logout</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Profile Modal */}
            {showProfileModal && (
                <div className="modal-overlay">
                    <div className="modal-content animate-scale-in">
                        <div className="modal-header">
                            <h3>Admin Profile</h3>
                            <button className="close-btn" onClick={() => setShowProfileModal(false)}><X size={20} /></button>
                        </div>
                        <div className="modal-body">
                            <div className="profile-detail-row">
                                <div className="detail-icon"><User size={24} className="blue-text" /></div>
                                <div className="detail-info">
                                    <label>Username</label>
                                    <p>{userData.name}</p>
                                </div>
                            </div>
                            <div className="profile-detail-row">
                                <div className="detail-icon"><Shield size={24} className="orange-text" /></div>
                                <div className="detail-info">
                                    <label>Role</label>
                                    <p>{userData.role}</p>
                                </div>
                            </div>
                            <div className="profile-detail-row">
                                <div className="detail-icon"><Settings size={24} className="grey-text" /></div>
                                <div className="detail-info">
                                    <label>Email</label>
                                    <p>{userData.email}</p>
                                </div>
                            </div>
                            <div className="profile-detail-row">
                                <div className="detail-icon"><UserCircle size={24} className="green-text" /></div>
                                <div className="detail-info">
                                    <label>Last Login</label>
                                    <p>{userData.lastLogin}</p>
                                </div>
                            </div>
                            <button className="gov-btn-primary full-width mt-4" onClick={() => setShowProfileModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Settings Modal */}
            {showSettingsModal && (
                <div className="modal-overlay">
                    <div className="modal-content animate-scale-in">
                        <div className="modal-header">
                            <h3>System Settings</h3>
                            <button className="close-btn" onClick={() => setShowSettingsModal(false)}><X size={20} /></button>
                        </div>
                        <div className="modal-body">
                            <div className="setting-item">
                                <div className="setting-label">
                                    {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
                                    <span>Dark Theme</span>
                                </div>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={isDarkMode}
                                        onChange={toggleTheme}
                                    />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                            <div className="setting-item">
                                <div className="setting-label">
                                    <div className="detail-icon-small"><div className="bell-mock"><div className="bell-dot"></div></div></div>
                                    <span>Notifications</span>
                                </div>
                                <label className="switch">
                                    <input type="checkbox" defaultChecked />
                                    <span className="slider round"></span>
                                </label>
                            </div>

                            <hr className="divider-line" />

                            <h4 className="sub-heading">Change Password</h4>
                            <div className="form-group vertical">
                                <label>Current Password</label>
                                <input type="password" placeholder="********" className="input-field" disabled />
                            </div>
                            <div className="form-group vertical">
                                <label>New Password</label>
                                <input type="password" placeholder="********" className="input-field" disabled />
                            </div>

                            <button className="gov-btn-primary full-width mt-4" onClick={() => setShowSettingsModal(false)}>Save Changes</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Topbar;
