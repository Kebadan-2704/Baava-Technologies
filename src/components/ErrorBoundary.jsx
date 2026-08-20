import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-6" style={{ background: '#faf9f7', color: '#22272f' }}>
          <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <h1 className="text-2xl font-bold mb-4 text-red-600">Something went wrong.</h1>
            <p className="text-gray-600 mb-6">An unexpected error occurred in the application. Our team has been notified.</p>
            <button 
              onClick={() => window.location.reload()}
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Refresh Page
            </button>
            {process.env.NODE_ENV === 'development' && (
              <pre className="mt-6 p-4 bg-gray-100 rounded text-xs overflow-auto text-left text-red-800">
                {this.state.error && this.state.error.toString()}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
