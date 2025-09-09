import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FoodPartnerRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => { 
    e.preventDefault();
    const businessName = e.target.businessName.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;

    axios.post("http://localhost:3000/api/auth/food-partner/register", {
      name: businessName,
      contactName,
      phone,
      email,
      password,
      address
    }, { withCredentials: true })
      .then(response => {
        console.log(response.data);
        navigate("/create-food");
      })
      .catch(error => {
        console.error("There was an error registering!", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-6 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md sm:max-w-lg bg-white rounded-lg shadow-md p-6 sm:p-8" 
           role="region" 
           aria-labelledby="partner-register-title">
        
        {/* Header */}
        <header className="text-center mb-6">
          <h1 id="partner-register-title" 
              className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Partner sign up
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Grow your business with our platform.
          </p>
        </header>

        {/* Navigation Switch */}
        <nav className="text-center mb-6 text-sm sm:text-base text-gray-600">
          <span className="font-semibold">Switch:</span>{' '}
          <Link to="/user/register" 
                className="text-blue-600 hover:text-blue-800 transition-colors">
            User
          </Link>
          <span className="mx-2">•</span>
          <Link to="/food-partner/register" 
                className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
            Food partner
          </Link>
        </nav>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-6">
          
          {/* Business Name */}
          <div className="space-y-1">
            <label htmlFor="businessName" 
                   className="block text-sm font-medium text-gray-700">
              Business Name
            </label>
            <input 
              id="businessName" 
              name="businessName" 
              type="text"
              placeholder="Tasty Bites" 
              autoComplete="organization"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         text-sm sm:text-base transition-colors"
            />
          </div>

          {/* Two Column Layout - Contact Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="contactName" 
                     className="block text-sm font-medium text-gray-700">
                Contact Name
              </label>
              <input 
                id="contactName" 
                name="contactName" 
                type="text"
                placeholder="Jane Doe" 
                autoComplete="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           text-sm sm:text-base transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="phone" 
                     className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input 
                id="phone" 
                name="phone" 
                type="tel"
                placeholder="+1 555 123 4567" 
                autoComplete="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           text-sm sm:text-base transition-colors"
              />
            </div>
          </div>

          {/* Email */}
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         text-sm sm:text-base transition-colors"
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label htmlFor="password" 
                   className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              placeholder="Create password" 
              autoComplete="new-password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         text-sm sm:text-base transition-colors"
            />
          </div>

          {/* Address */}
          <div className="space-y-1">
            <label htmlFor="address" 
                   className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input 
              id="address" 
              name="address" 
              type="text"
              placeholder="123 Market Street" 
              autoComplete="street-address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         text-sm sm:text-base transition-colors"
            />
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Full address helps customers find you faster.
            </p>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium 
                       py-2.5 sm:py-3 px-4 rounded-md transition-colors duration-200 
                       text-sm sm:text-base focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Partner Account
          </button>
        </form>

        {/* Sign In Link */}
        <div className="text-center mt-6 text-sm sm:text-base text-gray-600">
          Already a partner?{' '}
          <Link to="/food-partner/login" 
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
