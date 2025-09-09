import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {
    const { id } = useParams()
    const [profile, setProfile] = useState(null)
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`http://localhost:3000/api/food-partner/${id}`, { 
                    withCredentials: true 
                })
                setProfile(response.data.foodPartner)
                setVideos(response.data.foodPartner.foodItems)
                setError(null)
            } catch (err) {
                console.error("Error fetching profile:", err)
                setError("Failed to load profile. Please try again.")
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchProfile()
        }
    }, [id])

    // Loading State
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 animate-pulse">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    {/* Header Skeleton */}
                    <div className="bg-white rounded-lg p-6 mb-6">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-6 bg-gray-300 rounded w-48"></div>
                                <div className="h-4 bg-gray-300 rounded w-32"></div>
                            </div>
                        </div>
                        <div className="flex space-x-8">
                            <div className="text-center">
                                <div className="h-4 bg-gray-300 rounded w-16 mb-1"></div>
                                <div className="h-6 bg-gray-300 rounded w-12"></div>
                            </div>
                            <div className="text-center">
                                <div className="h-4 bg-gray-300 rounded w-20 mb-1"></div>
                                <div className="h-6 bg-gray-300 rounded w-12"></div>
                            </div>
                        </div>
                    </div>
                    {/* Grid Skeleton */}
                    <div className="grid grid-cols-3 gap-1">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="aspect-square bg-gray-300 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    // Error State
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center space-y-4">
                    <div className="text-red-400 text-6xl mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h2 className="text-gray-900 text-xl font-semibold">Profile Not Found</h2>
                    <p className="text-gray-600 text-base max-w-md">{error}</p>
                    <button 
                        onClick={() => window.history.back()}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
                
                {/* Profile Header */}
                <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
                        
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                            <img 
                                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-gray-200" 
                                src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Nnx8fGVufDB8fHx8fA%3D%3D" 
                                alt={`${profile?.name} profile`}
                            />
                        </div>
                        
                        {/* Profile Info */}
                        <div className="flex-1 text-center sm:text-left">
                            <h1 
                                className="text-xl sm:text-2xl font-bold text-gray-900 mb-2" 
                                title="Business name"
                            >
                                {profile?.name}
                            </h1>
                            <p 
                                className="text-gray-600 text-sm sm:text-base flex items-center justify-center sm:justify-start" 
                                title="Address"
                            >
                                <svg className="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                {profile?.address}
                            </p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex justify-center sm:justify-start space-x-8 sm:space-x-12" role="list" aria-label="Stats">
                        <div className="text-center" role="listitem">
                            <span className="block text-xs sm:text-sm text-gray-500 uppercase tracking-wide font-medium mb-1">
                                Total Meals
                            </span>
                            <span className="text-xl sm:text-2xl font-bold text-gray-900">
                                {profile?.totalMeals || 0}
                            </span>
                        </div>
                        <div className="text-center" role="listitem">
                            <span className="block text-xs sm:text-sm text-gray-500 uppercase tracking-wide font-medium mb-1">
                                Customers Served
                            </span>
                            <span className="text-xl sm:text-2xl font-bold text-gray-900">
                                {profile?.customersServed || 0}
                            </span>
                        </div>
                    </div>
                </section>

                {/* Videos Grid */}
                <section aria-label="Videos">
                    {videos.length === 0 ? (
                        <div className="bg-white rounded-lg p-12 text-center">
                            <div className="text-gray-400 mb-4">
                                <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No Videos Yet</h3>
                            <p className="text-gray-600">This food partner hasn't uploaded any videos yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 gap-1 sm:gap-2">
                            {videos.map((video, index) => (
                                <div 
                                    key={video.id || video._id || index} 
                                    className="aspect-square bg-gray-200 rounded-md overflow-hidden group cursor-pointer hover:opacity-90 transition-opacity"
                                >
                                    <video
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                        src={video.video} 
                                        muted 
                                        preload="metadata"
                                        onMouseEnter={(e) => e.target.play()}
                                        onMouseLeave={(e) => e.target.pause()}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    )
}

export default Profile
