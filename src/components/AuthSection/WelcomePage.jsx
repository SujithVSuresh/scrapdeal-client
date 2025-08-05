import React from 'react';
import { Recycle, User, Building } from 'lucide-react';

const WelcomePage = ({ onUserTypeSelect, onNavigateToLogin }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Recycle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to ScrapSmart</h1>
          <p className="text-slate-300">Choose your account type to get started</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => onUserTypeSelect('seller')}
            className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-green-500/50 transition-all group text-left"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-1">I'm a Seller</h3>
                <p className="text-slate-400 text-sm">List and sell your scrap materials</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onUserTypeSelect('buyer')}
            className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all group text-left"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-1">I'm a Buyer/Dealer</h3>
                <p className="text-slate-400 text-sm">Purchase scrap materials from sellers</p>
              </div>
            </div>
          </button>
        </div>

        <div className="text-center mt-8">
          <p className="text-slate-400">
            Already have an account?{' '}
            <button 
              onClick={onNavigateToLogin}
              className="text-green-400 hover:text-green-300 font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;