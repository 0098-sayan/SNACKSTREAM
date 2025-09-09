import React from 'react';
import { Link } from 'react-router-dom';

const ChooseRegister = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8" role="region" aria-labelledby="choose-register-title">
        <header className="text-center mb-8">
          <h1 id="choose-register-title" className="text-2xl font-bold text-gray-900 mb-2">
            Register
          </h1>
          <p className="text-gray-600 text-sm">
            Pick how you want to join the platform.
          </p>
        </header>
        
        <div className="flex flex-col gap-4">
          <Link 
            to="/user/register" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-center no-underline"
          >
            Register as normal user
          </Link>
          
          <Link 
            to="/food-partner/register" 
            className="w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 px-4 rounded-lg border border-gray-300 transition-colors duration-200 text-center no-underline"
          >
            Register as food partner
          </Link>
        </div>
        
        <div className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/user/login" className="text-blue-600 hover:text-blue-800 font-medium">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChooseRegister;
