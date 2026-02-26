import React, { useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const { login } = useAuth();
  
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  
  const [signupForm, setSignupForm] = useState({
    username: '',
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    const newErrors: Record<string, string> = {};
    if (!loginForm.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(loginForm.email)) newErrors.email = 'Please enter a valid email';
    if (!loginForm.password.trim()) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      const success = login(loginForm.email.split('@')[0], loginForm.password);
      if (success) {
        setLoginForm({ email: '', password: '' });
        onClose();
      } else {
        setErrors({ general: 'Invalid credentials. Please try again.' });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    const newErrors: Record<string, string> = {};
    if (!signupForm.username.trim()) newErrors.username = 'Username is required';
    if (!signupForm.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(signupForm.email)) newErrors.email = 'Please enter a valid email';
    if (!signupForm.password.trim()) newErrors.password = 'Password is required';
    else if (signupForm.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!agreeTerms) newErrors.terms = 'You must agree to the terms & conditions';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      const success = login(signupForm.username, signupForm.password);
      if (success) {
        setSignupForm({ username: '', email: '', password: '' });
        onClose();
      }
      setIsLoading(false);
    }, 1000);
  };

  const resetForms = () => {
    setLoginForm({ email: '', password: '' });
    setSignupForm({ username: '', email: '', password: '' });
    setErrors({});
    setShowPassword(false);
    setRememberMe(false);
    setAgreeTerms(false);
  };

  const handleClose = () => {
    resetForms();
    onClose();
  };

  const switchTab = (tab: 'login' | 'signup') => {
    setActiveTab(tab);
    setErrors({});
    resetForms();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* ✅ FIXED: Clearer Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1920&q=80)',
        }}
      />
      
      {/* ✅ REDUCED: Lighter gradient overlay */}
      <div 
        className="fixed inset-0 bg-gradient-to-br from-blue-900/25 via-gray-900/30 to-gray-800/35"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md my-8 animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 z-30 w-12 h-12 bg-gray-900/80 hover:bg-gray-800 backdrop-blur-xl rounded-full flex items-center justify-center text-white transition-all duration-300 hover:rotate-90 border-2 border-gray-700/50 shadow-xl"
        >
          <X className="h-6 w-6" />
        </button>

        {/* ✅ INCREASED: More transparent glass card */}
        <div className="relative bg-white/75 dark:bg-gray-900/40 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/50 dark:border-gray-700/50 overflow-hidden">
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-blue-500/5 pointer-events-none"></div>
          
          {/* Content */}
          <div className="relative p-10 sm:p-12">
            {/* Title */}
            <div className="text-center mb-10">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                {activeTab === 'login' ? 'Login' : 'Registration'}
              </h2>
            </div>

            {/* Error Message */}
            {errors.general && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl backdrop-blur-xl">
                <p className="text-red-600 dark:text-red-400 text-sm text-center">{errors.general}</p>
              </div>
            )}

            {activeTab === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <div className="relative">
                    <input
                      type="email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Email"
                      className="w-full bg-transparent border-0 border-b-2 border-gray-900/40 dark:border-white/30 focus:border-gray-900 dark:focus:border-white text-gray-900 dark:text-white placeholder-gray-700 dark:placeholder-gray-400 text-lg py-4 pr-12 focus:outline-none transition-colors"
                    />
                    <Mail className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-700 dark:text-gray-400 h-6 w-6" />
                  </div>
                  {errors.email && <p className="text-red-600 dark:text-red-400 text-sm ml-1">{errors.email}</p>}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginForm.password}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="password"
                      className="w-full bg-transparent border-0 border-b-2 border-gray-900/40 dark:border-white/30 focus:border-gray-900 dark:focus:border-white text-gray-900 dark:text-white placeholder-gray-700 dark:placeholder-gray-400 text-lg py-4 pr-24 focus:outline-none transition-colors"
                    />
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                      <Lock className="text-gray-700 dark:text-gray-400 h-6 w-6" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                      </button>
                    </div>
                  </div>
                  {errors.password && <p className="text-red-600 dark:text-red-400 text-sm ml-1">{errors.password}</p>}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-sm pt-2">
                  <label className="flex items-center text-gray-800 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="mr-2.5 w-4 h-4 rounded border-gray-400 dark:border-gray-500 bg-white/50 dark:bg-gray-800/50 text-blue-600 focus:ring-blue-500/50 focus:ring-offset-0 cursor-pointer"
                    />
                    <span className="text-base">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-gray-800 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium text-base"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gray-900/90 dark:bg-gray-800/90 hover:bg-gray-900 dark:hover:bg-gray-700 text-white font-semibold text-lg py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] mt-8 backdrop-blur-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    'Login'
                  )}
                </button>

                {/* Switch to Register */}
                <div className="text-center pt-6">
                  <span className="text-gray-800 dark:text-gray-300 text-base">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => switchTab('signup')}
                      className="text-gray-900 dark:text-white font-semibold hover:underline transition-all"
                    >
                      Register
                    </button>
                  </span>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="space-y-6">
                {/* Username Field */}
                <div className="space-y-2">
                  <div className="relative">
                    <input
                      type="text"
                      value={signupForm.username}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, username: e.target.value }))}
                      placeholder="Username"
                      className="w-full bg-transparent border-0 border-b-2 border-gray-900/40 dark:border-white/30 focus:border-gray-900 dark:focus:border-white text-gray-900 dark:text-white placeholder-gray-700 dark:placeholder-gray-400 text-lg py-4 pr-12 focus:outline-none transition-colors"
                    />
                    <User className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-700 dark:text-gray-400 h-6 w-6" />
                  </div>
                  {errors.username && <p className="text-red-600 dark:text-red-400 text-sm ml-1">{errors.username}</p>}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <div className="relative">
                    <input
                      type="email"
                      value={signupForm.email}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Email"
                      className="w-full bg-transparent border-0 border-b-2 border-gray-900/40 dark:border-white/30 focus:border-gray-900 dark:focus:border-white text-gray-900 dark:text-white placeholder-gray-700 dark:placeholder-gray-400 text-lg py-4 pr-12 focus:outline-none transition-colors"
                    />
                    <Mail className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-700 dark:text-gray-400 h-6 w-6" />
                  </div>
                  {errors.email && <p className="text-red-600 dark:text-red-400 text-sm ml-1">{errors.email}</p>}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={signupForm.password}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="password"
                      className="w-full bg-transparent border-0 border-b-2 border-gray-900/40 dark:border-white/30 focus:border-gray-900 dark:focus:border-white text-gray-900 dark:text-white placeholder-gray-700 dark:placeholder-gray-400 text-lg py-4 pr-24 focus:outline-none transition-colors"
                    />
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                      <Lock className="text-gray-700 dark:text-gray-400 h-6 w-6" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                      </button>
                    </div>
                  </div>
                  {errors.password && <p className="text-red-600 dark:text-red-400 text-sm ml-1">{errors.password}</p>}
                </div>

                {/* Terms & Conditions */}
                <div className="space-y-2 pt-2">
                  <label className="flex items-start text-gray-800 dark:text-gray-300 text-base cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mr-3 mt-1 w-4 h-4 rounded border-gray-400 dark:border-gray-500 bg-white/50 dark:bg-gray-800/50 text-blue-600 focus:ring-blue-500/50 focus:ring-offset-0 cursor-pointer"
                    />
                    <span>I agree to the terms & conditions</span>
                  </label>
                  {errors.terms && <p className="text-red-600 dark:text-red-400 text-sm ml-1">{errors.terms}</p>}
                </div>

                {/* Register Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gray-900/90 dark:bg-gray-800/90 hover:bg-gray-900 dark:hover:bg-gray-700 text-white font-semibold text-lg py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] mt-8 backdrop-blur-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Creating account...</span>
                    </div>
                  ) : (
                    'Register'
                  )}
                </button>

                {/* Switch to Login */}
                <div className="text-center pt-6">
                  <span className="text-gray-800 dark:text-gray-300 text-base">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => switchTab('login')}
                      className="text-gray-900 dark:text-white font-semibold hover:underline transition-all"
                    >
                      Login
                    </button>
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;