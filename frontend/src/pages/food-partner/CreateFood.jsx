import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateFood = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [fileError, setFileError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!videoFile) {
      setVideoURL("");
      return;
    }
    const url = URL.createObjectURL(videoFile);
    setVideoURL(url);
    return () => URL.revokeObjectURL(url);
  }, [videoFile]);

  const onFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      setVideoFile(null);
      setFileError("");
      return;
    }
    if (!file.type.startsWith("video/")) {
      setFileError("Please select a valid video file.");
      return;
    }
    setFileError("");
    setVideoFile(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer?.files?.[0];
    if (!file) {
      return;
    }
    if (!file.type.startsWith("video/")) {
      setFileError("Please drop a valid video file.");
      return;
    }
    setFileError("");
    setVideoFile(file);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const openFileDialog = () => fileInputRef.current?.click();

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("Video", videoFile);

      const response = await axios.post(
        "http://localhost:3000/api/food",
        formData,
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error("Error creating food:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled = useMemo(
    () => !name.trim() || !videoFile || isSubmitting,
    [name, videoFile, isSubmitting]
  );

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-6 sm:p-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Create Food
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Upload a short video, give it a name, and add a description.
          </p>
        </header>

        <form onSubmit={onSubmit} className="space-y-8">
          {/* Video Upload Section */}
          <div className="space-y-2">
            <label
              htmlFor="foodVideo"
              className="block text-sm font-medium text-gray-700"
            >
              Food Video
            </label>

            <input
              id="foodVideo"
              ref={fileInputRef}
              className="hidden"
              type="file"
              accept="video/*"
              onChange={onFileChange}
            />

            {/* Drop Zone */}
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              role="button"
              tabIndex={0}
              onClick={openFileDialog}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openFileDialog();
                }
              }}
              onDrop={onDrop}
              onDragOver={onDragOver}
            >
              <div className="space-y-4">
                <div className="text-gray-400">
                  <svg
                    className="w-8 h-8 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M10.8 3.2a1 1 0 0 1 .4-.08h1.6a1 1 0 0 1 1 1v1.6h1.6a1 1 0 0 1 1 1v1.6h1.6a1 1 0 0 1 1 1v7.2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6.4a1 1 0 0 1 1-1h1.6V3.2a1 1 0 0 1 1-1h1.6a1 1 0 0 1 .6.2z"
                    />
                    <path
                      fill="currentColor"
                      d="M9 12.75v-1.5c0-.62.67-1 1.2-.68l4.24 2.45c.53.3.53 1.05 0 1.35L10.2 16.82c-.53.31-1.2-.06-1.2-.68v-1.5"
                    />
                  </svg>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-700 font-medium">
                    <span className="font-semibold">Tap to upload</span> or drag
                    and drop
                  </p>
                  <p className="text-sm text-gray-500">
                    MP4, WebM, MOV • Up to ~100MB
                  </p>
                </div>
              </div>
            </div>

            {/* File Error */}
            {fileError && (
              <p className="text-red-600 text-sm mt-2" role="alert">
                {fileError}
              </p>
            )}

            {/* File Chip */}
            {videoFile && (
              <div
                className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4"
                aria-live="polite"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-blue-600">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M9 12.75v-1.5c0-.62.67-1 1.2-.68l4.24 2.45c.53.3.53 1.05 0 1.35L10.2 16.82c-.53.31-1.2-.06-1.2-.68v-1.5" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {videoFile.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(videoFile.size / 1024 / 1024).toFixed(1)} MB
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                      onClick={openFileDialog}
                    >
                      Change
                    </button>
                    <button
                      type="button"
                      className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                      onClick={() => {
                        setVideoFile(null);
                        setFileError("");
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Video Preview */}
          {videoURL && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Preview
              </label>
              <div className="bg-black rounded-lg overflow-hidden max-w-sm mx-auto">
                <video
                  className="w-full h-auto"
                  src={videoURL}
                  controls
                  playsInline
                  preload="metadata"
                />
              </div>
            </div>
          )}

          {/* Name Field */}
          <div className="space-y-2">
            <label
              htmlFor="foodName"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="foodName"
              type="text"
              placeholder="e.g., Spicy Paneer Wrap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base transition-colors"
            />
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <label
              htmlFor="foodDesc"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="foodDesc"
              rows={4}
              placeholder="Write a short description: ingredients, taste, spice level, etc."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base transition-colors resize-vertical"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isDisabled}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center space-x-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Saving Food...</span>
                </span>
              ) : (
                "Save Food"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;
