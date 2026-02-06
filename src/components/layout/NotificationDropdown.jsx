import React, { useState, useEffect, useRef } from 'react';
import { Bell, Check, X } from 'lucide-react';
import './Topbar.css'; // Reusing Topbar.css for now, might separate later if bulky

export const NotificationDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [notifications, setNotifications] = useState([
        { id: 1, title: 'Dataset Audit', text: 'The audit for dataset CID-2024 has been completed successfully.', read: false, time: '2m ago' },
        { id: 2, title: 'Privacy Scan', text: 'Anonymization scan is currently 45% complete for Health_Stats.csv.', read: false, time: '15m ago' },
        { id: 3, title: 'Access Request', text: 'Researcher Dr. Amit has requested access to the NSSO-78 set.', read: true, time: '1h ago' },
        { id: 4, title: 'Security Alert', text: 'Unusual login attempt detected from IP 192.168.1.45.', read: true, time: '4h ago' }
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const clearNotifications = () => {
        setNotifications([]);
    };

    return (
        <div className="notification-wrapper" ref={dropdownRef}>
            <button className="icon-btn-white" onClick={() => setIsOpen(!isOpen)}>
                <div className="notification-icon-container">
                    <Bell size={20} />
                    {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
                </div>
            </button>

            {isOpen && (
                <div className="notification-dropdown">
                    <div className="dropdown-header">
                        <h4>Notifications</h4>
                        <div className="header-actions">
                            <span onClick={markAllRead}>Mark all read</span>
                            <span onClick={clearNotifications}>Clear</span>
                        </div>
                    </div>
                    <div className="notification-list">
                        {notifications.length === 0 ? (
                            <div className="empty-state">No notifications</div>
                        ) : (
                            notifications.map(n => (
                                <div key={n.id} className={`notification-item ${!n.read ? 'unread' : ''}`}>
                                    <div className="notif-content-wrapper">
                                        <div className="notif-header-row">
                                            <span className="notif-title">{n.title}</span>
                                            {!n.read && <div className="unread-dot"></div>}
                                        </div>
                                        <p className="notif-message">{n.text}</p>
                                        <div className="notif-meta">
                                            <span className="time">{n.time}</span>
                                            <span className="status-tag">{n.read ? 'Acknowledged' : 'New'}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
