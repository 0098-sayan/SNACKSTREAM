import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const UserLogin = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const email = e.target.email.value;
      const password = e.target.password.value;

      const response = await axios.post("http://localhost:3000/api/auth/user/login", {
        email,
        password
      }, { withCredentials: true });

      console.log(response.data);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      if (err.response?.status === 401) {
        setError("Invalid email or password. Please try again.");
      } else if (err.response?.status === 400) {
        setError("Please fill in all required fields.");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-6 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 sm:p-8" 
           role="region" 
           aria-labelledby="user-login-title">
        
        {/* Header */}
        <header className="text-center mb-8">
          <h1 id="user-login-title" 
              className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Welcome back
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Sign in to continue your food journey.
          </p>
        </header>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-800 text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          
          {/* Email Field */}
          <div className="space-y-1">
            <label htmlFor="email" 
                   className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="you@example.com" 
              autoComplete="email"
              required
              disabled={isSubmitting}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base 
                         transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label htmlFor="password" 
                   className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              placeholder="••••••••" 
              autoComplete="current-password"
              required
              disabled={isSubmitting}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base 
                         transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 
                       disabled:cursor-not-allowed text-white font-medium py-2.5 sm:py-3 
                       px-4 rounded-md transition-colors duration-200 text-sm sm:text-base 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center space-x-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Signing In...</span>
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Register Link */}
        <div className="text-center mt-6 text-sm sm:text-base text-gray-600">
          New here?{' '}
          <Link to="/user/register" 
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
