import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// Reusable feed for vertical reels
// Props:
// - items: Array of video items { _id, video, description, likeCount, savesCount, commentsCount, comments, foodPartner }
// - onLike: (item) => void | Promise<void>
// - onSave: (item) => void | Promise<void>
// - emptyMessage: string

const ReelFeed = ({ items = [], onLike, onSave, emptyMessage = 'No videos yet.' }) => {
  const videoRefs = useRef(new Map())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target
          if (!(video instanceof HTMLVideoElement)) return
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            video.play().catch(() => { /* ignore autoplay errors */ })
          } else {
            video.pause()
          }
        })
      },
      { threshold: [0, 0.25, 0.6, 0.9, 1] }
    )
    
    videoRefs.current.forEach((vid) => observer.observe(vid))
    return () => observer.disconnect()
  }, [items])

  const setVideoRef = (id) => (el) => {
    if (!el) { 
      videoRefs.current.delete(id)
      return 
    }
    videoRefs.current.set(id, el)
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <div className="h-screen snap-y snap-mandatory overflow-y-scroll" role="list">
        
        {/* Empty State */}
        {items.length === 0 && (
          <div className="h-screen flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="text-gray-400 text-6xl mb-4">
                <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
              </div>
              <p className="text-white text-lg font-medium">{emptyMessage}</p>
            </div>
          </div>
        )}

        {/* Video Feed */}
        {items.map((item) => (
          <section 
            key={item._id} 
            className="h-screen w-full relative snap-start snap-always" 
            role="listitem"
          >
            {/* Video Element */}
            <video
              ref={setVideoRef(item._id)}
              className="h-full w-full object-cover"
              src={item.video}
              muted
              playsInline
              loop
              preload="metadata"
            />

            {/* Overlay */}
            <div className="absolute inset-0 flex">
              {/* Gradient Background */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" 
                aria-hidden="true" 
              />

              {/* Content Area (Left Side) */}
              <div className="flex-1 flex items-end p-4 sm:p-6">
                <div className="space-y-3 max-w-xs sm:max-w-sm">
                  {/* Description */}
                  <p 
                    className="text-white text-sm sm:text-base font-medium leading-5 line-clamp-3" 
                    title={item.description}
                  >
                    {item.description}
                  </p>
                  
                  {/* Visit Store Button */}
                  {item.foodPartner && (
                    <Link 
                      className="inline-block bg-white hover:bg-gray-100 text-black font-medium py-2 px-4 rounded-lg text-sm transition-colors duration-200" 
                      to={"/food-partner/" + item.foodPartner} 
                      aria-label="Visit store"
                    >
                      Visit store
                    </Link>
                  )}
                </div>
              </div>

              {/* Actions Area (Right Side) */}
              <div className="flex flex-col justify-end items-center p-4 sm:p-6 space-y-6">
                
                {/* Like Button */}
                <div className="flex flex-col items-center space-y-1">
                  <button
                    onClick={onLike ? () => onLike(item) : undefined}
                    className="w-12 h-12 flex items-center justify-center bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors duration-200"
                    aria-label="Like"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                    </svg>
                  </button>
                  <span className="text-white text-xs font-medium">
                    {item.likeCount ?? item.likesCount ?? item.likes ?? 0}
                  </span>
                </div>

                {/* Save/Bookmark Button */}
                <div className="flex flex-col items-center space-y-1">
                  <button
                    className="w-12 h-12 flex items-center justify-center bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors duration-200"
                    onClick={onSave ? () => onSave(item) : undefined}
                    aria-label="Bookmark"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
                    </svg>
                  </button>
                  <span className="text-white text-xs font-medium">
                    {item.savesCount ?? item.bookmarks ?? item.saves ?? 0}
                  </span>
                </div>

                {/* Comments Button */}
                <div className="flex flex-col items-center space-y-1">
                  <button 
                    className="w-12 h-12 flex items-center justify-center bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors duration-200" 
                    aria-label="Comments"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                    </svg>
                  </button>
                  <span className="text-white text-xs font-medium">
                    {item.commentsCount ?? (Array.isArray(item.comments) ? item.comments.length : 0)}
                  </span>
                </div>

              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default ReelFeed
