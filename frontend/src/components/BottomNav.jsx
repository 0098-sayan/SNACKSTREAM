import React from 'react'
import { NavLink } from 'react-router-dom'

const BottomNav = () => {
  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 safe-area-pb" 
      role="navigation" 
      aria-label="Bottom"
    >
      <div className="flex justify-center items-center h-16 px-4">
        
        {/* Home Link */}
        <NavLink 
          to="/" 
          end 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center flex-1 py-2 px-3 transition-colors duration-200 ${
              isActive 
                ? 'text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`
          }
        >
          <span className="mb-1" aria-hidden="true">
            <svg 
              width="22" 
              height="22" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M3 10.5 12 3l9 7.5"/>
              <path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10"/>
            </svg>
          </span>
          <span className="text-xs font-medium">Home</span>
        </NavLink>

        {/* Saved Link */}
        <NavLink 
          to="/saved" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center flex-1 py-2 px-3 transition-colors duration-200 ${
              isActive 
                ? 'text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`
          }
        >
          <span className="mb-1" aria-hidden="true">
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"/>
            </svg>
          </span>
          <span className="text-xs font-medium">Saved</span>
        </NavLink>

      </div>
    </nav>
  )
}

export default BottomNav
