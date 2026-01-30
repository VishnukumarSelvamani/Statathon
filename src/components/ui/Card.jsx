import React from 'react';
import './Card.css';

export const Card = ({ title, children, className = '', actions }) => {
  return (
    <div className={`gov-card ${className}`}>
      {(title || actions) && (
        <div className="gov-card-header">
          {title && <h3 className="gov-card-title">{title}</h3>}
          {actions && <div className="gov-card-actions">{actions}</div>}
        </div>
      )}
      <div className="gov-card-body">
        {children}
      </div>
    </div>
  );
};
