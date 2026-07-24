import React, { useRef, useState, useEffect } from 'react';

/**
 * ReceiptUploader Component
 *
 * Provides the user with two distinct drop-zones/buttons: 
 * one to scan a physical receipt via camera, and one to upload a file.
 */
const ReceiptUploader = ({ onImageSelect }) => {
    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    // State to toggle the custom camera UI
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [stream, setStream] = useState(null);

    // Clean up camera stream when component unmounts
    useEffect(() => {
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [stream]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            onImageSelect(imageUrl);
        }
    };

    // Start the webcam feed
    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            setStream(mediaStream);
            setIsCameraActive(true);

            // Small delay to allow the video element to mount
            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            }, 50);
        } catch (error) {
            console.error("Error accessing camera:", error);
            alert("Could not access camera. Please ensure camera permissions are granted in your browser.");
        }
    };

    // Stop the webcam feed
    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        setIsCameraActive(false);
    };

    // Take a picture from the video feed using canvas
    const captureImage = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');

            // Draw current video frame onto canvas
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Convert canvas to a local Object URL
            canvas.toBlob((blob) => {
                if (blob) {
                    const imageUrl = URL.createObjectURL(blob);
                    stopCamera();
                    onImageSelect(imageUrl); // Send to parent component
                }
            }, 'image/jpeg');
        }
    };

    // Render the custom camera UI if activated
    if (isCameraActive) {
        return (
            <div className="flex flex-col items-center justify-center bg-[#151a23] rounded-xl border border-gray-800 p-4 h-[400px]">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full max-h-[280px] object-cover rounded-lg bg-black mb-4"
                />
                <canvas ref={canvasRef} className="hidden" />
                <div className="flex gap-4">
                    <button
                        onClick={captureImage}
                        className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                    >
                        Capture Photo
                    </button>
                    <button
                        onClick={stopCamera}
                        className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[400px]">

            {/* Option 1: Start Webcam in Browser */}
            <div
                onClick={startCamera}
                className="bg-[#151a23] rounded-xl border border-gray-800 p-8 flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 hover:bg-[#1a202c] transition-all group"
            >
                <div className="bg-gray-800 p-4 rounded-full mb-4 group-hover:bg-purple-500/20">
                    <svg className="w-8 h-8 text-gray-300 group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                <h2 className="text-xl font-bold mb-2 text-white">Scan Receipt</h2>
                <p className="text-gray-400 text-sm text-center">Use your device camera directly in the browser.</p>
            </div>

            {/* Option 2: Upload from Documents */}
            <div
                onClick={() => fileInputRef.current.click()}
                className="bg-[#151a23] rounded-xl border border-gray-800 p-8 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-[#1a202c] transition-all group"
            >
                <div className="bg-gray-800 p-4 rounded-full mb-4 group-hover:bg-blue-500/20">
                    <svg className="w-8 h-8 text-gray-300 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                </div>
                <h2 className="text-xl font-bold mb-2 text-white">Upload Document</h2>
                <p className="text-gray-400 text-sm text-center">Upload a saved image or PDF from your device storage.</p>

                <input
                    type="file"
                    accept="image/*,.pdf"
                    hidden
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
            </div>

        </div>
    );
};

export default ReceiptUploader;
