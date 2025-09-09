import React from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const FoodPartnerLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    try {
      const response = await axios.post("http://localhost:3000/api/auth/food-partner/login", {
        email,
        password
      }, { withCredentials: true });
      
      console.log(response.data);
      navigate("/create-food");
    } catch (error) {
      console.error("Login error:", error);
      // You can add error handling here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-6 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 sm:p-8" 
           role="region" 
           aria-labelledby="partner-login-title">
        
        {/* Header */}
        <header className="text-center mb-8">
          <h1 id="partner-login-title" 
              className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Partner login
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Access your dashboard and manage orders.
          </p>
        </header>

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
              placeholder="business@example.com" 
              autoComplete="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base 
                         transition-colors"
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
              placeholder="Password" 
              autoComplete="current-password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base 
                         transition-colors"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium 
                       py-2.5 sm:py-3 px-4 rounded-md transition-colors duration-200 
                       text-sm sm:text-base focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 
                       disabled:cursor-not-allowed"
          >
            Sign In
          </button>
        </form>

        {/* Register Link */}
        <div className="text-center mt-6 text-sm sm:text-base text-gray-600">
          New partner?{' '}
          <Link to="/food-partner/register" 
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
