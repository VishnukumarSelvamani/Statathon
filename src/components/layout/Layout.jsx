import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import './Layout.css';

export const Layout = () => {
    const location = useLocation();

    // Sidebar persistent on all pages EXCEPT Login as per rule
    const isLoginPage = location.pathname === '/login';
    // Landing page typically doesn't have sidebar in this layout, checking if it's the root
    const isLandingPage = location.pathname === '/';

    const hideSidebar = isLoginPage || isLandingPage;

    return (
        <div className={`dashboard-layout ${hideSidebar ? 'full-width' : ''}`}>
            {!hideSidebar && <Sidebar />}

            <div className="dashboard-view-content">
                {!isLandingPage && !isLoginPage && <Topbar />}
                <main className={`dashboard-scroll-area ${isLandingPage || isLoginPage ? 'no-padding' : ''}`}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
