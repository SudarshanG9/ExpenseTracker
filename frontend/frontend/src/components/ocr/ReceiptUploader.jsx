import React, { useRef } from 'react';

/**
 * ReceiptUploader Component
 *
 * Provides the user with two distinct drop-zones/buttons: 
 * one to scan a physical receipt via camera, and one to upload a file.
 */
const ReceiptUploader = ({ onImageSelect }) => {
    // We use refs to programmatically trigger the hidden HTML file inputs
    // when the user clicks our stylized div containers.
    const cameraInputRef = useRef(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Create a local object URL to display the image immediately,
            // then pass it up to the parent component.
            const imageUrl = URL.createObjectURL(file);
            onImageSelect(imageUrl);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[400px]">

            {/* Option 1: Scan Front of Receipt (Opens Camera on Mobile) */}
            <div
                onClick={() => cameraInputRef.current.click()}
                className="bg-[#151a23] rounded-xl border border-gray-800 p-8 flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 hover:bg-[#1a202c] transition-all group"
            >
                <div className="bg-gray-800 p-4 rounded-full mb-4 group-hover:bg-purple-500/20">
                    <svg className="w-8 h-8 text-gray-300 group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                <h2 className="text-xl font-bold mb-2 text-white">Scan Receipt</h2>
                <p className="text-gray-400 text-sm text-center">Use your camera to capture the front of a physical receipt.</p>

                {/* The 'capture="environment"' attribute automatically opens the rear-facing camera on mobile devices */}
                <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    hidden
                    ref={cameraInputRef}
                    onChange={handleFileChange}
                />
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