import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ReelFeed from '../../components/ReelFeed'

const Home = () => {
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setLoading(true)
                const response = await axios.get("http://localhost:3000/api/food", { 
                    withCredentials: true 
                })
                console.log(response.data);
                setVideos(response.data.foodItems)
                setError(null)
            } catch (err) {
                console.error("Error fetching videos:", err)
                setError("Failed to load videos. Please try again later.")
            } finally {
                setLoading(false)
            }
        }

        fetchVideos()
    }, [])

    async function likeVideo(item) {
        try {
            const response = await axios.post("http://localhost:3000/api/food/like", 
                { foodId: item._id }, 
                { withCredentials: true }
            )
            
            if (response.data.like) {
                console.log("Video liked");
                setVideos((prev) => prev.map((v) => 
                    v._id === item._id 
                        ? { ...v, likeCount: v.likeCount + 1 } 
                        : v
                ))
            } else {
                console.log("Video unliked");
                setVideos((prev) => prev.map((v) => 
                    v._id === item._id 
                        ? { ...v, likeCount: v.likeCount - 1 } 
                        : v
                ))
            }
        } catch (err) {
            console.error("Error liking video:", err)
        }
    }

    async function saveVideo(item) {
        try {
            const response = await axios.post("http://localhost:3000/api/food/save", 
                { foodId: item._id }, 
                { withCredentials: true }
            )
            
            if (response.data.save) {
                setVideos((prev) => prev.map((v) => 
                    v._id === item._id 
                        ? { ...v, savesCount: v.savesCount + 1 } 
                        : v
                ))
            } else {
                setVideos((prev) => prev.map((v) => 
                    v._id === item._id 
                        ? { ...v, savesCount: v.savesCount - 1 } 
                        : v
                ))
            }
        } catch (err) {
            console.error("Error saving video:", err)
        }
    }

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                    <p className="text-white text-lg font-medium">Loading videos...</p>
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
                    <h2 className="text-white text-xl font-semibold">Oops! Something went wrong</h2>
                    <p className="text-gray-300 text-base max-w-md">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    // Main render
    return (
        <div className="min-h-screen bg-black">
            <ReelFeed
                items={videos}
                onLike={likeVideo}
                onSave={saveVideo}
                emptyMessage="No videos available."
            />
        </div>
    )
}

export default Home
