// import React, { useState, useRef, useEffect } from 'react';
// import { InferenceEngine } from "inferencejs";
// import axios from 'axios';

// // Component to display the camera feed and capture images
// function CameraDisplay({ setApiResponse, apiKey }) {
//     const [isCameraOn, setIsCameraOn] = useState(true);
//     const [capturedImage, setCapturedImage] = useState(null);
//     const [croppedImage, setCroppedImage] = useState(null);
//     const [hoveredButton, setHoveredButton] = useState(null); // Track hovered button
//     const videoRef = useRef(null);
//     const canvasRef = useRef(null);

//     // Turn on the camera when the component mounts
//     useEffect(() => {
//         if (isCameraOn) {
//             startCamera();
//         }
//         return () => {
//             stopCamera();
//         };
//     }, [isCameraOn]);

//     // Function to start the camera
//     const startCamera = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//             videoRef.current.srcObject = stream;
//         } catch (err) {
//             console.error("Error accessing the camera: ", err);
//         }
//     };

//     // Function to stop the camera
//     const stopCamera = () => {
//         if (videoRef.current && videoRef.current.srcObject) {
//             const stream = videoRef.current.srcObject;
//             const tracks = stream.getTracks();
//             tracks.forEach(track => track.stop());
//             videoRef.current.srcObject = null;
//         }
//     };

//     // Function to capture the square area in the center of the video feed
//     const captureSquare = () => {
//         const canvas = canvasRef.current;
//         const context = canvas.getContext('2d');
        
//         const videoWidth = videoRef.current.videoWidth;
//         const videoHeight = videoRef.current.videoHeight;
//         canvas.width = videoWidth;
//         canvas.height = videoHeight;

//         // Draw the square area in the center of the video feed
//         const squareSize = Math.min(videoWidth, videoHeight) * 0.6;
//         const startX = (videoWidth - squareSize) / 2;
//         const startY = (videoHeight - squareSize) / 2;

//         let last_image = videoRef.current;
//         context.drawImage(
//             videoRef.current,
//             startX, startY, squareSize, squareSize,
//             0, 0, squareSize, squareSize
//         );


//         const croppedImageData = canvas.toDataURL('image/png');
//         const croppedImage = canvas.toDataURL('image/png');
        
//         setCapturedImage(last_image);

//         setCroppedImage(croppedImageData);
//         setIsCameraOn(false);
//     };

//     // Function to retake the picture
//     const retakePicture = () => {
//         setCapturedImage(null);
//         setIsCameraOn(true);
//     };

//     // Function to handle the submit button click
//     const handleSubmit = async () => {
//         if (!croppedImage) {
//             console.log("No image captured.");
//             return;
//         }
//         console.log("Now sending request to API using inferencejs");

//         let id = process.env.REACT_APP_RoboflowAPI;

//         //console.log("Roboflow ID: ", id);
        
//         axios({
//             method: "POST",
//             url: "https://detect.roboflow.com/face-shape-detection/1",
//             params: {
//                 api_key: id
//             },
//             data: capturedImage,
//             headers: {
//                 "Content-Type": "application/x-www-form-urlencoded"
//             }
//         })
//         .then(function(response) {
//             console.log(response.data);
//             if (response.data.predictions){
//                 console.log("Face shape detected: ", response.data.predictions[0].class);
//                 setApiResponse(response.data.predictions[0].class);
//             }
//             else{
//                 console.log("No face shape detected.");
//             }
//         })
//         .catch(function(error) {
//             console.log(error.message);
//         });
//     };
 
// return (
//     <div style={styles.container}>
//         <h2 style={styles.title}>Camera Display</h2>

//         {capturedImage ? (
//             <div style={styles.imageWrapper}>
//                 <img src={capturedImage} alt="Captured" style={styles.capturedImage} />
//             </div>
//         ) : (
//             <div style={{ position: 'relative' }}>
//                 <video ref={videoRef} autoPlay style={styles.video}></video>
//                 <div style={styles.captureSquare}></div> {/* Red square */}
//             </div>
//         )}

//         <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480"></canvas>

//         <div style={styles.buttonContainer}>
//             {capturedImage ? (
//                 <button
//                     style={hoveredButton === 'retake' ? { ...styles.button, ...styles.buttonHover } : styles.button}
//                     onMouseEnter={() => setHoveredButton('retake')}
//                     onMouseLeave={() => setHoveredButton(null)}
//                     onClick={retakePicture}
//                 >
//                     Retake Picture
//                 </button>
//             ) : (
//                 <button
//                     style={hoveredButton === 'capture' ? { ...styles.button, ...styles.buttonHover } : styles.button}
//                     onMouseEnter={() => setHoveredButton('capture')}
//                     onMouseLeave={() => setHoveredButton(null)}
//                     onClick={captureSquare}
//                 >
//                     Capture 📷
//                 </button>
//             )}
//             <button
//                 style={hoveredButton === 'submit' ? { ...styles.button, ...styles.buttonHover } : styles.button}
//                 onMouseEnter={() => setHoveredButton('submit')}
//                 onMouseLeave={() => setHoveredButton(null)}
//                 onClick={handleSubmit}
//             >
//                 Submit
//             </button>
//         </div>
//     </div>
// );
// }

// export default CameraDisplay;

// // Local styles for the CameraDisplay component
// const styles = {
// container: {
//     width: '100%',
//     height: '100%',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: '20px',
//     borderRadius: '8px',
//     backgroundColor: '#f1f0eb',
// },
// title: {
//     fontSize: '32px',               
//     fontWeight: '700',              
//     color: '#4B382A',                
//     fontFamily: '"Playfair Display", serif', 
//     textAlign: 'center',            
//     marginBottom: '20px',            
//     letterSpacing: '1px',            
//     lineHeight: '1.3',               
// },

// imageWrapper: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//     height: '100%',

// },
// capturedImage: {
//     maxWidth: '100%',
//     maxHeight: '100%',
//     position:'center',
//     borderRadius: '4px',
//     // objectFit: 'cover',
// },
// video: {
//     width: '100%',
//     height: 'auto',
//     borderRadius: '4px',
// },
// captureSquare: {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     width: '50%',
//     height: '50%',
//     transform: 'translate(-50%, -50%)',
//     border: '2px solid red',
//     boxSizing: 'border-box',
// },
// buttonContainer: {
//     marginTop: '10px',
//     display: 'flex',
//     justifyContent: 'center',
//     gap: '10px',
// },
// button: {
//     padding: '10px',
//     backgroundColor: 'transparent',
//     color: 'black',
//     border: '2px solid black',
//     borderRadius: '20px',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s ease, color 0.3s ease', // Smooth transition for color changes
//     fontFamily: '"Playfair Display", serif',
// },
// buttonHover: {
//     backgroundColor: '#4B382A',
//     color: 'white',
// },
// };


import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function CameraDisplay({ setApiResponse, apiKey }) {
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [capturedImage, setCapturedImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [hoveredButton, setHoveredButton] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (isCameraOn) {
            startCamera();
        }
        return () => {
            stopCamera();
        };
    }, [isCameraOn]);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
        } catch (err) {
            console.error("Error accessing the camera: ", err);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop());
            videoRef.current.srcObject = null;
        }
    };

    const captureSquare = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const videoWidth = videoRef.current.videoWidth;
        const videoHeight = videoRef.current.videoHeight;
        canvas.width = videoWidth;
        canvas.height = videoHeight;

        const squareSize = Math.min(videoWidth, videoHeight) * 0.6;
        const startX = (videoWidth - squareSize) / 2;
        const startY = (videoHeight - squareSize) / 2;

        // Draw the full video feed to get the captured image
        context.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);
        const capturedImageData = canvas.toDataURL('image/png');
        setCapturedImage(capturedImageData);

        // Draw the square area to get the cropped image
        context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        context.drawImage(
            videoRef.current,
            startX, startY, squareSize, squareSize,
            0, 0, squareSize, squareSize
        );
        const croppedImageData = canvas.toDataURL('image/png');
        setCroppedImage(croppedImageData);

        setIsCameraOn(false);
    };

    const retakePicture = () => {
        setCapturedImage(null);
        setCroppedImage(null);
        setIsCameraOn(true);
    };

    const handleSubmit = async () => {
        if (!croppedImage) {
            console.log("No image captured.");
            return;
        }

        try {
            const id = process.env.REACT_APP_RoboflowAPI;
            const response = await axios.post(
                "https://detect.roboflow.com/face-shape-detection/1",
                croppedImage, // Submit the cropped image
                {
                    params: { api_key: id },
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                }
            );
            if (response.data.predictions && response.data.predictions.length > 0) {
                console.log("Face shape detected: ", response.data.predictions[0].class);
                setApiResponse(response.data.predictions[0].class);
            } else {
                console.log("No face shape detected.");
            }
        } catch (error) {
            console.error("Error submitting image:", error.message);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Camera Display</h2>

            {capturedImage ? (
                <div style={styles.imageWrapper}>
                    <img src={capturedImage} alt="Captured" style={styles.capturedImage} />
                </div>
            ) : (
                <div style={{ position: 'relative' }}>
                    <video ref={videoRef} autoPlay style={styles.video}></video>
                    <div style={styles.captureSquare}></div>
                </div>
            )}

            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

            <div style={styles.buttonContainer}>
                {capturedImage ? (
                    <button
                        style={hoveredButton === 'retake' ? { ...styles.button, ...styles.buttonHover } : styles.button}
                        onMouseEnter={() => setHoveredButton('retake')}
                        onMouseLeave={() => setHoveredButton(null)}
                        onClick={retakePicture}
                    >
                        Retake Picture
                    </button>
                ) : (
                    <button
                        style={hoveredButton === 'capture' ? { ...styles.button, ...styles.buttonHover } : styles.button}
                        onMouseEnter={() => setHoveredButton('capture')}
                        onMouseLeave={() => setHoveredButton(null)}
                        onClick={captureSquare}
                    >
                        Capture 📷
                    </button>
                )}
                <button
                    style={hoveredButton === 'submit' ? { ...styles.button, ...styles.buttonHover } : styles.button}
                    onMouseEnter={() => setHoveredButton('submit')}
                    onMouseLeave={() => setHoveredButton(null)}
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default CameraDisplay;

const styles = {
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#f1f0eb',
    },
    title: {
        fontSize: '32px',
        fontWeight: '700',
        color: '#4B382A',
        fontFamily: '"Playfair Display", serif',
        textAlign: 'center',
        marginBottom: '20px',
        letterSpacing: '1px',
        lineHeight: '1.3',
    },
    imageWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    capturedImage: {
        maxWidth: '100%',
        maxHeight: '100%',
        borderRadius: '4px',
    },
    video: {
        width: '100%',
        height: 'auto',
        borderRadius: '4px',
    },
    captureSquare: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '50%',
        height: '50%',
        transform: 'translate(-50%, -50%)',
        border: '2px solid red',
        boxSizing: 'border-box',
    },
    buttonContainer: {
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
    },
    button: {
        padding: '10px',
        backgroundColor: 'transparent',
        color: 'black',
        border: '2px solid black',
        borderRadius: '20px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, color 0.3s ease',
        fontFamily: '"Playfair Display", serif',
    },
    buttonHover: {
        backgroundColor: '#4B382A',
        color: 'white',
    },
};
