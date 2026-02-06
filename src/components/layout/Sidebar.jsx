import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    ShieldCheck,
    UserCheck,
    Database,
    FileCheck,
    Bug,
    LogOut
} from 'lucide-react';
import { ShadowSafeLogo } from '../ui/ShadowSafeLogo';
import './Sidebar.css';

export const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo-section">
                    <ShadowSafeLogo className="logo-icon-shield" style={{ width: '28px', height: '28px', color: 'white' }} />
                    <span className="logo-text">ShadowSafe NSS</span>
                </div>
            </div>

            <nav className="sidebar-nav">
                <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/anonymization" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <ShieldCheck size={20} />
                    <span>Anonymization</span>
                </NavLink>

                <NavLink to="/risk-analyzer" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <UserCheck size={20} />
                    <span>Risk Analyzer</span>
                </NavLink>

                <NavLink to="/dataset-access" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Database size={20} />
                    <span>Dataset Access</span>
                </NavLink>

                <NavLink to="/proof" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <FileCheck size={20} />
                    <span>Proof Page</span>
                </NavLink>

                <NavLink to="/hacker-ai" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Bug size={20} />
                    <span>Hacker AI</span>
                </NavLink>
            </nav>

            <div className="sidebar-footer">
                <button onClick={handleLogout} className="nav-item logout-btn">
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
