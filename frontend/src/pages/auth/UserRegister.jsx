import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserRegister = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const firstName = e.target.firstName.value;
            const lastName = e.target.lastName.value;
            const email = e.target.email.value;
            const password = e.target.password.value;

            // Basic validation
            if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
                setError('Please fill in all required fields.');
                return;
            }

            const response = await axios.post("http://localhost:3000/api/auth/user/register", {
                fullName: firstName.trim() + " " + lastName.trim(),
                email: email.trim(),
                password
            }, {
                withCredentials: true
            });

            console.log(response.data);
            navigate("/");
        } catch (err) {
            console.error("Registration error:", err);
            if (err.response?.status === 409) {
                setError("An account with this email already exists.");
            } else if (err.response?.status === 400) {
                setError("Please check your information and try again.");
            } else {
                setError("Something went wrong. Please try again later.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-6 px-4 sm:py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md sm:max-w-lg bg-white rounded-lg shadow-md p-6 sm:p-8" 
                 role="region" 
                 aria-labelledby="user-register-title">
                
                {/* Header */}
                <header className="text-center mb-6">
                    <h1 id="user-register-title" 
                        className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        Create your account
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base">
                        Join to explore and enjoy delicious meals.
                    </p>
                </header>

                {/* Navigation Switch */}
                <nav className="text-center mb-6 text-sm sm:text-base text-gray-600">
                    <span className="font-semibold">Switch:</span>{' '}
                    <Link to="/user/register" 
                          className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                        User
                    </Link>
                    <span className="mx-2">•</span>
                    <Link to="/food-partner/register" 
                          className="text-blue-600 hover:text-blue-800 transition-colors">
                        Food partner
                    </Link>
                </nav>

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
                <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-6">
                    
                    {/* Two Column Layout - First & Last Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label htmlFor="firstName" 
                                   className="block text-sm font-medium text-gray-700">
                                First Name
                            </label>
                            <input 
                                id="firstName" 
                                name="firstName" 
                                type="text"
                                placeholder="Jane" 
                                autoComplete="given-name"
                                required
                                disabled={isSubmitting}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                                           placeholder-gray-400 focus:outline-none focus:ring-2 
                                           focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base 
                                           transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="lastName" 
                                   className="block text-sm font-medium text-gray-700">
                                Last Name
                            </label>
                            <input 
                                id="lastName" 
                                name="lastName" 
                                type="text"
                                placeholder="Doe" 
                                autoComplete="family-name"
                                required
                                disabled={isSubmitting}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                                           placeholder-gray-400 focus:outline-none focus:ring-2 
                                           focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base 
                                           transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                        </div>
                    </div>

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
                            autoComplete="new-password"
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
                                <span>Creating Account...</span>
                            </span>
                        ) : (
                            'Sign Up'
                        )}
                    </button>
                </form>

                {/* Sign In Link */}
                <div className="text-center mt-6 text-sm sm:text-base text-gray-600">
                    Already have an account?{' '}
                    <Link to="/user/login" 
                          className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserRegister;
