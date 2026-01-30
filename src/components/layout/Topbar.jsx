import { useLocation } from 'react-router-dom';
import {
    Search,
    Bell,
    User,
    Shield,
    LayoutDashboard,
    FileText,
    PlusSquare,
    ChevronDown,
    Menu
} from 'lucide-react';
import './Topbar.css';

export const Topbar = () => {
    const location = useLocation();
    const isAnalyzerPage = location.pathname === '/anonymization' || location.pathname === '/risk-analyzer';

    const getPageTitle = (path) => {
        if (isAnalyzerPage) return 'ShadowSafe NSS | Privacy Risk & Differential Privacy Analyzer';
        switch (path) {
            case '/dashboard': return 'Dashboard';
            case '/dataset-access': return 'Dataset Access (Researcher Download)';
            case '/proof': return 'Audit Proof Page';
            case '/hacker-ai': return 'Hacker AI Simulator';
            default: return 'ShadowSafe NSS';
        }
    };

    if (isAnalyzerPage) {
        return (
            <header className="topbar blue-variant">
                <div className="topbar-left">
                    <Shield size={24} className="shield-icon-blue" />
                    <h1 className="analyzer-title">{getPageTitle(location.pathname)}</h1>
                </div>
                <div className="topbar-right">
                    <nav className="analyzer-nav">
                        <div className="nav-item-blue">
                            <LayoutDashboard size={20} />
                            <span>Dashboard</span>
                        </div>
                        <div className="nav-item-blue">
                            <PlusSquare size={20} />
                            <span>Reports</span>
                        </div>
                    </nav>
                    <div className="admin-profile">
                        <div className="admin-avatar">
                            <User size={18} />
                        </div>
                        <span>Admin</span>
                        <ChevronDown size={14} />
                    </div>
                    <button className="icon-btn-white">
                        <Menu size={20} />
                    </button>
                </div>
            </header>
        );
    }

    return (
        <header className="topbar">
            <div className="topbar-left">
                <h1 className="page-title">{getPageTitle(location.pathname)}</h1>
            </div>
            <div className="topbar-right">
                <div className="search-bar">
                    <Search size={18} className="search-icon" />
                    <input type="text" placeholder="Search files..." />
                </div>
                <div className="topbar-actions">
                    <button className="icon-btn">
                        <Bell size={20} />
                    </button>
                    <div className="user-profile">
                        <div className="profile-icon">
                            <User size={20} />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
