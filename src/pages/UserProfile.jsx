import React from 'react';
import { User, Mail, Briefcase, MapPin, Calendar, CheckCircle, Clock } from 'lucide-react';
import './UserProfile.css';

export const UserProfile = () => {
    // Mock user data - in real app, fetch from API/Context
    const user = {
        name: 'Dr. Rajesh Kumar',
        email: 'rajesh.kumar@nss.gov.in',
        designation: 'Senior Data Analyst, Grade I',
        department: 'National Statistical Office (NSO)',
        location: 'New Delhi, India',
        status: 'Active',
        lastLogin: 'Feb 02, 2026 • 09:45 AM',
        joinDate: 'Aug 15, 2023',
        employeeId: 'GOV-NSS-2023-8842'
    };

    return (
        <div className="gov-profile-page force-light-theme">
            <div className="profile-container">
                <header className="profile-page-header">
                    <h1>User Profile</h1>
                    <p>Official Account Details & Status</p>
                </header>

                <div className="profile-card">
                    <div className="profile-sidebar">
                        <div className="avatar-wrapper">
                            <span className="avatar-initials">{user.name.split(' ').map(n => n?.[0]).filter(Boolean).join('').slice(0, 2)}</span>
                            <div className="status-indicator-online" title="Online"></div>
                        </div>
                        <h2 className="user-fullname">{user.name}</h2>
                        <span className="user-designation">{user.designation}</span>
                        <div className="badge-wrapper">
                            <span className="gov-badge-active">
                                <CheckCircle size={12} /> {user.status}
                            </span>
                        </div>
                    </div>

                    <div className="profile-details">
                        <div className="detail-section">
                            <h3 className="section-title">Official Information</h3>
                            <div className="detail-grid">
                                <div className="detail-item">
                                    <label>Full Name</label>
                                    <div className="detail-value">
                                        <User size={16} className="detail-icon" />
                                        {user.name}
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <label>Official Email ID</label>
                                    <div className="detail-value">
                                        <Mail size={16} className="detail-icon" />
                                        {user.email}
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <label>Department / Organization</label>
                                    <div className="detail-value">
                                        <Briefcase size={16} className="detail-icon" />
                                        {user.department}
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <label>Employee ID</label>
                                    <div className="detail-value mono">
                                        {user.employeeId}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="divider"></div>

                        <div className="detail-section">
                            <h3 className="section-title">Account Activity</h3>
                            <div className="detail-grid">
                                <div className="detail-item">
                                    <label>Last Login</label>
                                    <div className="detail-value">
                                        <Clock size={16} className="detail-icon" />
                                        {user.lastLogin}
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <label>Date Joined</label>
                                    <div className="detail-value">
                                        <Calendar size={16} className="detail-icon" />
                                        {user.joinDate}
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <label>Work Location</label>
                                    <div className="detail-value">
                                        <MapPin size={16} className="detail-icon" />
                                        {user.location}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
