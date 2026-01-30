import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, AlertCircle, Info, X } from 'lucide-react';
import './NotificationDropdown.css';

export const NotificationDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'warning',
            title: 'High Risk File Detected',
            message: 'PLFS_Annual_2024.csv contains potential privacy risks',
            time: '5 min ago',
            read: false
        },
        {
            id: 2,
            type: 'success',
            title: 'Audit Completed',
            message: 'ASI_2023_Final.csv has been successfully audited',
            time: '1 hour ago',
            read: false
        },
        {
            id: 3,
            type: 'info',
            title: 'System Update',
            message: 'New privacy protection features are now available',
            time: '2 hours ago',
            read: true
        },
        {
            id: 4,
            type: 'warning',
            title: 'Pending Review',
            message: '3 files are pending your review',
            time: '3 hours ago',
            read: true
        },
        {
            id: 5,
            type: 'success',
            title: 'Export Complete',
            message: 'Your anonymized dataset is ready for download',
            time: '1 day ago',
            read: true
        }
    ]);

    const dropdownRef = useRef(null);

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

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const clearNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const getIcon = (type) => {
        switch (type) {
            case 'warning':
                return <AlertCircle size={18} />;
            case 'success':
                return <Check size={18} />;
            case 'info':
                return <Info size={18} />;
            default:
                return <Bell size={18} />;
        }
    };

    return (
        <div className="notification-dropdown" ref={dropdownRef}>
            <button
                className={`icon-btn notification-btn ${unreadCount > 0 ? 'has-unread' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <Bell size={20} />
                {unreadCount > 0 && (
                    <span className="notification-badge">{unreadCount}</span>
                )}
            </button>

            {isOpen && (
                <div className="notification-panel">
                    <div className="notification-header">
                        <h3>Notifications</h3>
                        {unreadCount > 0 && (
                            <button
                                className="mark-all-read"
                                onClick={markAllAsRead}
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>

                    <div className="notification-list">
                        {notifications.length === 0 ? (
                            <div className="no-notifications">
                                <Bell size={32} />
                                <p>No notifications</p>
                            </div>
                        ) : (
                            notifications.map(notification => (
                                <div
                                    key={notification.id}
                                    className={`notification-item ${!notification.read ? 'unread' : ''} ${notification.type}`}
                                    onClick={() => markAsRead(notification.id)}
                                >
                                    <div className="notification-icon">
                                        {getIcon(notification.type)}
                                    </div>
                                    <div className="notification-content">
                                        <div className="notification-title">
                                            {notification.title}
                                            {!notification.read && <span className="unread-dot"></span>}
                                        </div>
                                        <div className="notification-message">
                                            {notification.message}
                                        </div>
                                        <div className="notification-time">
                                            {notification.time}
                                        </div>
                                    </div>
                                    <button
                                        className="notification-close"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            clearNotification(notification.id);
                                        }}
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {notifications.length > 0 && (
                        <div className="notification-footer">
                            <button className="view-all-btn">View All Notifications</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
