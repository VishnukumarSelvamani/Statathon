import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f8f9fa',
                    color: '#333',
                    fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                    <div style={{
                        padding: '40px',
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        maxWidth: '500px',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            backgroundColor: '#fee2e2',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 20px'
                        }}>
                            <AlertTriangle size={32} color="#dc2626" />
                        </div>
                        <h2 style={{ margin: '0 0 10px', color: '#111827' }}>Something went wrong</h2>
                        <p style={{ margin: '0 0 20px', color: '#6b7280', lineHeight: '1.5' }}>
                            The application encountered an unexpected error. We've logged this issue and our team has been notified.
                        </p>

                        {this.state.error && (
                            <div style={{
                                padding: '10px',
                                backgroundColor: '#f3f4f6',
                                borderRadius: '6px',
                                marginBottom: '20px',
                                textAlign: 'left',
                                fontSize: '0.85rem',
                                color: '#ef4444',
                                overflowX: 'auto'
                            }}>
                                <code>{this.state.error.toString()}</code>
                            </div>
                        )}

                        <button
                            onClick={() => window.location.reload()}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 20px',
                                backgroundColor: '#2563eb',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '1rem',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s'
                            }}
                        >
                            <RefreshCw size={18} />
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
