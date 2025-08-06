import React, { useState } from 'react';
import { Eye, EyeOff, ArrowLeft, Mail, Phone, Lock, User, Building, MapPin } from 'lucide-react';

const SignupPage = ({ userType, onBack, onNavigateToLogin, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.acceptTerms) {
      setError('Please accept the terms and conditions');
      return;
    }

    // Prepare payload for AuthController
    const payload = {
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      address: formData.address,
      phone: formData.phone,
      ...(userType === 'buyer' && { businessName: formData.businessName }),
    };

    // Pass payload to onSubmit
    onSubmit(payload);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
          <button
            onClick={onBack}
            className="flex items-center text-slate-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>

          <div className="text-center mb-8">
            <div
              className={`w-12 h-12 bg-gradient-to-r ${
                userType === 'seller' ? 'from-green-400 to-emerald-600' : 'from-blue-400 to-cyan-600'
              } rounded-xl flex items-center justify-center mx-auto mb-4`}
            >
              {userType === 'seller' ? (
                <User className="w-6 h-6 text-white" />
              ) : (
                <Building className="w-6 h-6 text-white" />
              )}
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Create {userType === 'seller' ? 'Seller' : 'Buyer'} Account
            </h2>
            <p className="text-slate-300">
              Join ScrapSmart and start {userType === 'seller' ? 'selling' : 'buying'} today
            </p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-300 p-3 rounded-xl mb-6 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            {userType === 'buyer' && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Business Name</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-green-500 transition-colors"
                    placeholder="Enter your business name"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="Enter your address"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleInputChange}
                className="w-4 h-4 text-green-500 bg-slate-700 border-slate-600 rounded focus:ring-green-500 mt-1"
                required
              />
              <label className="text-sm text-slate-300">
                I agree to the{' '}
                <a href="#" className="text-green-400 hover:text-green-300">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-green-400 hover:text-green-300">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              className={`w-full bg-gradient-to-r ${
                userType === 'seller'
                  ? 'from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                  : 'from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700'
              } text-white py-3 rounded-xl font-semibold transition-all transform hover:scale-105`}
            >
              Create Account
            </button>
          </form>

          <div className="text-center mt-6">
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
    </div>
  );
};

export default SignupPage;