import React, { useState, useRef, useEffect } from 'react';
import { User, Settings, LogOut, FileText, Shield, HelpCircle } from 'lucide-react';
import './ProfileDropdown.css';

export const ProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Mock user data
    const user = {
        name: 'Dr. Rajesh Kumar',
        email: 'rajesh.kumar@nss.gov.in',
        role: 'Senior Data Analyst',
        department: 'National Statistical Office',
        avatar: null // Can be replaced with actual avatar URL
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const menuItems = [
        {
            icon: <User size={18} />,
            label: 'My Profile',
            action: () => console.log('Navigate to profile')
        },
        {
            icon: <FileText size={18} />,
            label: 'My Activity',
            action: () => console.log('Navigate to activity')
        },
        {
            icon: <Shield size={18} />,
            label: 'Security Settings',
            action: () => console.log('Navigate to security')
        },
        {
            icon: <Settings size={18} />,
            label: 'Preferences',
            action: () => console.log('Navigate to preferences')
        },
        {
            icon: <HelpCircle size={18} />,
            label: 'Help & Support',
            action: () => console.log('Navigate to help')
        }
    ];

    const handleMenuClick = (action) => {
        action();
        setIsOpen(false);
    };

    const handleLogout = () => {
        console.log('Logging out...');
        // Add logout logic here
        setIsOpen(false);
    };

    // Get initials from name
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="profile-dropdown" ref={dropdownRef}>
            <button
                className="user-profile"
                onClick={() => setIsOpen(!isOpen)}
                title={user.name}
            >
                {user.avatar ? (
                    <img src={user.avatar} alt={user.name} />
                ) : (
                    <span className="user-initials">{getInitials(user.name)}</span>
                )}
            </button>

            {isOpen && (
                <div className="profile-panel">
                    <div className="profile-header">
                        <div className="profile-avatar-large">
                            {user.avatar ? (
                                <img src={user.avatar} alt={user.name} />
                            ) : (
                                <span className="user-initials-large">{getInitials(user.name)}</span>
                            )}
                        </div>
                        <div className="profile-info">
                            <h3 className="profile-name">{user.name}</h3>
                            <p className="profile-email">{user.email}</p>
                            <p className="profile-role">{user.role}</p>
                            <p className="profile-department">{user.department}</p>
                        </div>
                    </div>

                    <div className="profile-menu">
                        {menuItems.map((item, index) => (
                            <button
                                key={index}
                                className="profile-menu-item"
                                onClick={() => handleMenuClick(item.action)}
                            >
                                <span className="menu-icon">{item.icon}</span>
                                <span className="menu-label">{item.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="profile-footer">
                        <button
                            className="logout-btn"
                            onClick={handleLogout}
                        >
                            <LogOut size={18} />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
