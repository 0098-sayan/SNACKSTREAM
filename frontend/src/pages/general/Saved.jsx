import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReelFeed from '../../components/ReelFeed'

const Saved = () => {
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchSavedVideos = async () => {
            try {
                setLoading(true)
                const response = await axios.get("http://localhost:3000/api/food/save", { 
                    withCredentials: true 
                })
                
                const savedFoods = response.data.savedFoods.map((item) => ({
                    _id: item.food._id,
                    video: item.food.video,
                    description: item.food.description,
                    likeCount: item.food.likeCount,
                    savesCount: item.food.savesCount,
                    commentsCount: item.food.commentsCount,
                    foodPartner: item.food.foodPartner,
                }))
                
                setVideos(savedFoods)
                setError(null)
            } catch (err) {
                console.error("Error fetching saved videos:", err)
                setError("Failed to load saved videos. Please try again.")
            } finally {
                setLoading(false)
            }
        }

        fetchSavedVideos()
    }, [])

    const removeSaved = async (item) => {
        try {
            await axios.post("http://localhost:3000/api/food/save", { 
                foodId: item._id 
            }, { 
                withCredentials: true 
            })
            
            // Update local state to reflect the change
            setVideos((prev) => prev.map((v) => 
                v._id === item._id 
                    ? { ...v, savesCount: Math.max(0, (v.savesCount ?? 1) - 1) } 
                    : v
            ))
        } catch (err) {
            console.error("Error removing saved video:", err)
        }
    }

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                    <p className="text-white text-lg font-medium">Loading saved videos...</p>
                </div>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center px-4">
                <div className="text-center space-y-4">
                    <div className="text-red-400 text-6xl mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h2 className="text-white text-xl font-semibold">Failed to Load Saved Videos</h2>
                    <p className="text-gray-300 text-base max-w-md">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                        Retry
                    </button>
                </div>
            </div>
        )
    }

    // Empty state with custom styling
    if (videos.length === 0) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center px-4">
                <div className="text-center space-y-6">
                    <div className="text-gray-400 mb-6">
                        <svg className="w-20 h-20 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
                        </svg>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-white text-2xl font-bold">No Saved Videos</h2>
                        <p className="text-gray-400 text-base max-w-sm mx-auto">
                            Save your favorite food videos by tapping the bookmark icon while watching.
                        </p>
                    </div>
                    <button 
                        onClick={() => window.history.back()}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                    >
                        Explore Videos
                    </button>
                </div>
            </div>
        )
    }

    // Main render with ReelFeed
    return (
        <div className="min-h-screen bg-black">
            <ReelFeed
                items={videos}
                onSave={removeSaved}
                emptyMessage="No saved videos yet."
            />
        </div>
    )
}

export default Saved
