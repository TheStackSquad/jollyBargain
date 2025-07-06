// frontend/src/components/adminpage/AdminLoginForm.js
import React, { useState, useEffect } from 'react';

// AdminLoginForm component for full username/email and password authentication
const AdminLoginForm = ({ onAuthenticate, error: propError }) => {
  const [emailOrUsername, setEmailOrUsername] = useState(''); // State for email or username
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [localError, setLocalError] = useState(null); // Local error state for immediate feedback

  // Trigger mount animation
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Sync propError with localError if propError changes
  useEffect(() => {
    setLocalError(propError);
  }, [propError]);

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null); // Clear previous local errors
    setIsLoading(true);

    try {
      // Call the onAuthenticate prop with both credentials
      await onAuthenticate(emailOrUsername, password);
      // Clear fields on success
      setEmailOrUsername('');
      setPassword('');
      // If onAuthenticate succeeds, isLoading will be set to false by the parent
      // or by this component if onAuthenticate doesn't manage it.
      // For now, assume parent handles success state (e.g., hiding prompt).
    } catch (err) {
      // Catch errors from the onAuthenticate function (i.e., from authService.js)
      setLocalError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false); // Always reset loading state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Main card container */}
      <div
        className={`relative bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-md w-full text-center border border-white/20 transform transition-all duration-1000 ease-out ${
          isMounted ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
        }`}
      >
        {/* Header section */}
        <div className={`transform transition-all duration-700 delay-300 ${
          isMounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Admin Login</h2>
          <p className="text-gray-300 mb-6">Enter your credentials to access the admin panel</p>
        </div>

        {/* Form section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className={`transform transition-all duration-700 delay-500 ${
            isMounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <div className="relative">
              <input
                type="text" // Changed to text for username/email
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                placeholder="Enter email or username" // Updated placeholder
                className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-white placeholder-gray-300 ${
                  localError ? 'border-red-500 animate-shake' : 'border-white/30 hover:border-white/50'
                }`}
                required
                disabled={isLoading}
                autoComplete="username" // Good for accessibility and browser autofill
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password" // Updated placeholder
                className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-white placeholder-gray-300 ${
                  localError ? 'border-red-500 animate-shake' : 'border-white/30 hover:border-white/50'
                }`}
                required
                disabled={isLoading}
                autoComplete="current-password" // Good for accessibility and browser autofill
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            {localError && (
              <div className="mt-2 p-3 bg-red-500/20 border border-red-500/50 rounded-lg animate-fadeIn">
                <p className="text-red-300 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  {localError}
                </p>
              </div>
            )}
          </div>

          <div className={`transform transition-all duration-700 delay-700 ${
            isMounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Authenticating...
                </div>
              ) : (
                'Login to Admin Panel' // Updated button text
              )}
            </button>
          </div>
        </form>

        {/* Warning section */}
        <div className={`mt-8 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg transform transition-all duration-700 delay-900 ${
          isMounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <p className="text-yellow-300 text-xs flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            Note: Admin accounts are provisioned by a Super Admin. No public registration.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AdminLoginForm;
