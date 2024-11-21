/* global faceapi */
/* global cv */

import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

function Tryon({ capturedImage, glassesImage, onClose }) {
    const canvasRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = process.env.PUBLIC_URL + '/models'; // Ensure models are in /public/models
            await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
            await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        };

        const processImage = async (imageSrc) => {
            const img = new Image();
            img.crossOrigin = 'anonymous'; // Enable CORS
            img.src = imageSrc;
        
            return new Promise((resolve, reject) => {
                img.onload = () => {
                    try {
                        const src = cv.imread(img); // Load image into OpenCV
                        cv.cvtColor(src, src, cv.COLOR_RGB2RGBA); // Convert to RGBA
        
                        const gray = new cv.Mat();
                        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY); // Convert to grayscale
        
                        const mask = new cv.Mat();
                        cv.threshold(gray, mask, 240, 255, cv.THRESH_BINARY_INV); // Create binary mask
        
                        const result = new cv.Mat(src.rows, src.cols, cv.CV_8UC4, new cv.Scalar(0, 0, 0, 0)); // Transparent output
                        src.copyTo(result, mask); // Apply mask to isolate glasses
        
                        // Clean up
                        src.delete();
                        gray.delete();
                        mask.delete();
        
                        // Convert processed Mat to a Canvas image
                        const canvas = document.createElement('canvas');
                        canvas.width = result.cols;
                        canvas.height = result.rows;
                        cv.imshow(canvas, result); // Render result to the canvas
                        result.delete();
        
                        resolve(canvas.toDataURL()); // Return Data URL for the processed image
                    } catch (err) {
                        reject(err);
                    }
                };
        
                img.onerror = (err) => {
                    reject(`Failed to load image: ${err}`);
                };
            });
        };
        
        const detectAndOverlay = async () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const image = imageRef.current;

            canvas.width = image.width;
            canvas.height = image.height;

            // Draw the captured image onto the canvas
            ctx.drawImage(image, 0, 0, image.width, image.height);

            // Detect face landmarks
            const detections = await faceapi
                .detectAllFaces(image, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks();

            if (detections.length > 0) {
                const landmarks = detections[0].landmarks;
                const leftEye = landmarks.getLeftEye();
                const rightEye = landmarks.getRightEye();

                // Calculate eye centers
                const leftEyeCenter = {
                    x: leftEye.reduce((sum, point) => sum + point.x, 0) / leftEye.length,
                    y: leftEye.reduce((sum, point) => sum + point.y, 0) / leftEye.length,
                };
                const rightEyeCenter = {
                    x: rightEye.reduce((sum, point) => sum + point.x, 0) / rightEye.length,
                    y: rightEye.reduce((sum, point) => sum + point.y, 0) / rightEye.length,
                };

                const eyeDistance = Math.sqrt(
                    Math.pow(rightEyeCenter.x - leftEyeCenter.x, 2) +
                        Math.pow(rightEyeCenter.y - leftEyeCenter.y, 2)
                );

                // Process the glasses image
                const processedGlassesImage = await processImage(glassesImage);

                // Draw glasses
                const glasses = new Image();
                glasses.src = processedGlassesImage; // Use processed glasses image
                glasses.onload = () => {
                    const scaleFactor = 2.25;
                    // (rightEyeCenter.x - leftEyeCenter.x)*0.04
                    const glassesWidth = eyeDistance * scaleFactor;
                    const glassesHeight = glassesWidth * (glasses.height / glasses.width);
                    const centerX = (leftEyeCenter.x + rightEyeCenter.x) / 2;
                    const centerY = (leftEyeCenter.y + rightEyeCenter.y) / 2;

                    // ctx.drawImage(
                    //     glasses,
                    //     centerX - glassesWidth / 2,
                    //     centerY - glassesHeight / 2,
                    //     glassesWidth,
                    //     glassesHeight
                    // );
                    ctx.drawImage(
                        glasses,
                        centerX - glassesWidth / 2, // X-coordinate
                        centerY - glassesHeight / 2 , // Adjust Y-coordinate
                        glassesWidth, // Scaled width
                        glassesHeight // Scaled height
                    );
                };
            } else {
                alert('No face detected. Please try again.');
            }
        };

        loadModels().then(detectAndOverlay);
    }, [capturedImage, glassesImage]);

    return (
        <div style={{ position: 'relative', textAlign: 'center' }}>
            <img
                ref={imageRef}
                src={capturedImage}
                alt="Captured Face"
                style={{ display: 'none' }}
                crossOrigin="anonymous"
            />
            <canvas ref={canvasRef} style={{ border: '1px solid black' }} />
            {/* <button onClick={onClose} style={{ marginTop: '10px', padding: '10px' }}>
                Close
            </button> */}
        </div>
    );
}

export default Tryon;
