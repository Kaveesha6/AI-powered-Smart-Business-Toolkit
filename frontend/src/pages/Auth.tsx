import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, X, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    rememberMe: false,
    agreeTerms: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    return checks;
  };

  const passwordChecks = getPasswordStrength(formData.password);
  const allPasswordChecksPassed = Object.values(passwordChecks).every(Boolean);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const validateField = (field: string) => {
    const newErrors: Record<string, string> = { ...errors };

    switch (field) {
      case 'username':
        if (!isLogin) {
          if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
          } else if (formData.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
          } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.username)) {
            newErrors.username = 'Username can only contain letters, numbers, - and _';
          } else {
            delete newErrors.username;
          }
        }
        break;

      case 'email':
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;

      case 'password':
        if (!formData.password) {
          newErrors.password = 'Password is required';
        } else if (!isLogin && !allPasswordChecksPassed) {
          newErrors.password = 'Password does not meet all requirements';
        } else if (formData.password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        } else {
          delete newErrors.password;
        }
        break;

      case 'agreeTerms':
        if (!isLogin && !formData.agreeTerms) {
          newErrors.agreeTerms = 'You must agree to the terms & conditions';
        } else {
          delete newErrors.agreeTerms;
        }
        break;
    }

    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!isLogin && !formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (!isLogin && formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!isLogin && !allPasswordChecksPassed) {
      newErrors.password = 'Password does not meet all requirements';
    }

    if (!isLogin && !formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms & conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      username: true,
      email: true,
      password: true,
      agreeTerms: true
    });

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      if (isLogin) {
        const success = await login(formData.email, formData.password);
        if (success) {
          navigate('/');
        } else {
          setErrors({ general: 'Invalid email or password' });
        }
      } else {
        const result = await register(formData.username, formData.email, formData.password);
        if (result.success) {
          navigate('/');
        } else {
          setErrors({ general: result.error || 'Registration failed' });
        }
      }
    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setTouched({});
    setFormData({
      username: '',
      email: '',
      password: '',
      rememberMe: false,
      agreeTerms: false
    });
  };

  const isFormValid = () => {
    if (isLogin) {
      return formData.email && formData.password && Object.keys(errors).length === 0;
    } else {
      return formData.username && formData.email && formData.password && 
             formData.agreeTerms && allPasswordChecksPassed && Object.keys(errors).length === 0;
    }
  };

  return (
    <div className="min-h-screen relative pt-16">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1920&q=80)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/25 via-gray-900/30 to-gray-800/35" />

      <div className="relative z-20 flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <div className="relative w-full max-w-md">
          {/* Close Button */}
          <Link 
            to="/"
            className="absolute -top-3 -right-3 z-30 w-12 h-12 bg-gray-900/80 hover:bg-gray-800 backdrop-blur-xl rounded-full flex items-center justify-center text-white transition-all duration-300 hover:rotate-90 border-2 border-gray-700/50 shadow-xl"
          >
            <X className="h-6 w-6" />
          </Link>

          {/* Form Card */}
          <div className="relative bg-white/75 dark:bg-gray-900/40 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/50 dark:border-gray-700/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-blue-500/5 pointer-events-none"></div>
            
            <div className="relative p-10 sm:p-12">
              <div className="text-center mb-10">
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                  {isLogin ? 'Login' : 'Registration'}
                </h2>
              </div>

              {/* General Error */}
              {errors.general && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl backdrop-blur-xl">
                  <p className="text-red-600 dark:text-red-400 text-sm text-center">{errors.general}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Username Field */}
                {!isLogin && (
                  <div className="space-y-2">
                    <div className="relative">
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('username')}
                        placeholder="Username"
                        className={`w-full bg-transparent border-0 border-b-2 ${
                          touched.username && errors.username 
                            ? 'border-red-500' 
                            : touched.username && formData.username && !errors.username
                            ? 'border-green-500'
                            : 'border-gray-900/40 dark:border-white/30 focus:border-gray-900 dark:focus:border-white'
                        } text-gray-900 dark:text-white placeholder-gray-700 dark:placeholder-gray-400 text-lg py-4 pr-12 focus:outline-none transition-colors`}
                        disabled={isLoading}
                      />
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                        {touched.username && formData.username && !errors.username ? (
                          <Check className="text-green-500 h-6 w-6" />
                        ) : (
                          <User className="text-gray-700 dark:text-gray-400 h-6 w-6" />
                        )}
                      </div>
                    </div>
                    {touched.username && errors.username && (
                      <p className="text-red-600 dark:text-red-400 text-sm ml-1 flex items-center gap-1">
                        <X className="h-3 w-3" /> {errors.username}
                      </p>
                    )}
                  </div>
                )}

                {/* Email Field */}
                <div className="space-y-2">
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('email')}
                      placeholder="Email"
                      className={`w-full bg-transparent border-0 border-b-2 ${
                        touched.email && errors.email 
                          ? 'border-red-500' 
                          : touched.email && formData.email && !errors.email
                          ? 'border-green-500'
                          : 'border-gray-900/40 dark:border-white/30 focus:border-gray-900 dark:focus:border-white'
                      } text-gray-900 dark:text-white placeholder-gray-700 dark:placeholder-gray-400 text-lg py-4 pr-12 focus:outline-none transition-colors`}
                      disabled={isLoading}
                    />
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                      {touched.email && formData.email && !errors.email ? (
                        <Check className="text-green-500 h-6 w-6" />
                      ) : (
                        <Mail className="text-gray-700 dark:text-gray-400 h-6 w-6" />
                      )}
                    </div>
                  </div>
                  {touched.email && errors.email && (
                    <p className="text-red-600 dark:text-red-400 text-sm ml-1 flex items-center gap-1">
                      <X className="h-3 w-3" /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('password')}
                      placeholder="Password"
                      className={`w-full bg-transparent border-0 border-b-2 ${
                        touched.password && errors.password 
                          ? 'border-red-500' 
                          : touched.password && formData.password && !errors.password && (isLogin || allPasswordChecksPassed)
                          ? 'border-green-500'
                          : 'border-gray-900/40 dark:border-white/30 focus:border-gray-900 dark:focus:border-white'
                      } text-gray-900 dark:text-white placeholder-gray-700 dark:placeholder-gray-400 text-lg py-4 pr-24 focus:outline-none transition-colors`}
                      disabled={isLoading}
                    />
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                      <Lock className="text-gray-700 dark:text-gray-400 h-6 w-6" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                      </button>
                    </div>
                  </div>
                  
                  {/* Password Requirements (Registration Only) */}
                  {!isLogin && formData.password && (
                    <div className="mt-3 p-3 bg-gray-100/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm space-y-1.5">
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Password must contain:</p>
                      <div className="space-y-1">
                        <div className={`flex items-center gap-2 text-xs ${passwordChecks.length ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
                          {passwordChecks.length ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                          <span>At least 8 characters</span>
                        </div>
                        <div className={`flex items-center gap-2 text-xs ${passwordChecks.uppercase ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
                          {passwordChecks.uppercase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                          <span>One uppercase letter (A-Z)</span>
                        </div>
                        <div className={`flex items-center gap-2 text-xs ${passwordChecks.lowercase ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
                          {passwordChecks.lowercase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                          <span>One lowercase letter (a-z)</span>
                        </div>
                        <div className={`flex items-center gap-2 text-xs ${passwordChecks.number ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
                          {passwordChecks.number ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                          <span>One number (0-9)</span>
                        </div>
                        <div className={`flex items-center gap-2 text-xs ${passwordChecks.special ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
                          {passwordChecks.special ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                          <span>One special character (!@#$%...)</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {touched.password && errors.password && (
                    <p className="text-red-600 dark:text-red-400 text-sm ml-1 flex items-center gap-1">
                      <X className="h-3 w-3" /> {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember Me (Login Only) */}
                {isLogin && (
                  <div className="flex items-center justify-between text-sm pt-2">
                    <label className="flex items-center text-gray-800 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                        className="mr-2.5 w-4 h-4 rounded border-gray-400 dark:border-gray-500 bg-white/50 dark:bg-gray-800/50 text-blue-600 focus:ring-blue-500/50 focus:ring-offset-0 cursor-pointer"
                        disabled={isLoading}
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
                )}

                {/* Terms Checkbox (Registration Only) */}
                {!isLogin && (
                  <div className="space-y-2 pt-2">
                    <label className="flex items-start text-gray-800 dark:text-gray-300 text-base cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('agreeTerms')}
                        className="mr-3 mt-1 w-4 h-4 rounded border-gray-400 dark:border-gray-500 bg-white/50 dark:bg-gray-800/50 text-blue-600 focus:ring-blue-500/50 focus:ring-offset-0 cursor-pointer"
                        disabled={isLoading}
                      />
                      <span>I agree to the terms & conditions</span>
                    </label>
                    {touched.agreeTerms && errors.agreeTerms && (
                      <p className="text-red-600 dark:text-red-400 text-sm ml-1 flex items-center gap-1">
                        <X className="h-3 w-3" /> {errors.agreeTerms}
                      </p>
                    )}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !isFormValid()}
                  className="w-full bg-gray-900/90 dark:bg-gray-800/90 hover:bg-gray-900 dark:hover:bg-gray-700 text-white font-semibold text-lg py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] mt-8 backdrop-blur-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>{isLogin ? 'Signing in...' : 'Creating account...'}</span>
                    </div>
                  ) : (
                    isLogin ? 'Login' : 'Register'
                  )}
                </button>

                {/* Toggle Text */}
                <div className="text-center pt-6">
                  <p className="text-gray-800 dark:text-gray-300 text-base">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                      type="button"
                      onClick={toggleMode}
                      disabled={isLoading}
                      className="text-gray-900 dark:text-white font-semibold hover:underline transition-all ml-1 disabled:opacity-50"
                    >
                      {isLogin ? 'Register' : 'Login'}
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;