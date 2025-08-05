import React from 'react';

const ConfirmationPage = ({ onNavigateToLogin, onNavigateToHome }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
          <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Account Created Successfully!</h2>
          <p className="text-slate-300 mb-8">
            Welcome to ScrapSmart! We've sent a verification email to your inbox. Please check your email and click the verification link to activate your account.
          </p>
          <div className="space-y-4">
            <button
              onClick={onNavigateToLogin}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105"
            >
              Continue to Login
            </button>
            <button
              onClick={onNavigateToHome}
              className="w-full text-slate-400 hover:text-white transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;