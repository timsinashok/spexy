// // src/components/Main/CameraDisplay.js
// import React, { useState, useRef, useEffect } from 'react';
// import { InferenceEngine } from "inferencejs";

// function CameraDisplay({ setApiResponse, apiKey }) { // Accept apiKey as a prop
//     const [isCameraOn, setIsCameraOn] = useState(true); // Start with the camera on
//     const [capturedImage, setCapturedImage] = useState(null);
//     const videoRef = useRef(null);
//     const canvasRef = useRef(null);

//     useEffect(() => {
//         if (isCameraOn) {
//             startCamera();
//         }
//         return () => {
//             stopCamera();
//         };
//     }, [isCameraOn]);

//     // Start the camera
//     const startCamera = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//             videoRef.current.srcObject = stream;
//         } catch (err) {
//             console.error("Error accessing the camera: ", err);
//         }
//     };

//     // Stop the camera
//     const stopCamera = () => {
//         if (videoRef.current && videoRef.current.srcObject) {
//             const stream = videoRef.current.srcObject;
//             const tracks = stream.getTracks();

//             tracks.forEach(track => track.stop());
//             videoRef.current.srcObject = null;
//         }
//     };

//     // Capture only the content within the red square
//     const captureSquare = () => {
//         const canvas = canvasRef.current;
//         const context = canvas.getContext('2d');
        
//         const videoWidth = videoRef.current.videoWidth;
//         const videoHeight = videoRef.current.videoHeight;
//         canvas.width = videoWidth;
//         canvas.height = videoHeight;

//         const squareSize = Math.min(videoWidth, videoHeight) * 0.6;
//         const startX = (videoWidth - squareSize) / 2;
//         const startY = (videoHeight - squareSize) / 2;

//         context.drawImage(
//             videoRef.current,
//             startX, startY, squareSize, squareSize,
//             0, 0, squareSize, squareSize
//         );

//         const croppedImageData = canvas.toDataURL('image/png');
//         setCapturedImage(croppedImageData);
//         setIsCameraOn(false);
//     };

//     // Reset the captured image and restart the camera
//     const retakePicture = () => {
//         setCapturedImage(null);
//         setIsCameraOn(true);
//     };

// // Submit the cropped image to the API
// const handleSubmit = async () => {
//     console.log("Now sending request to API using inferencejs");
    
//     const inferEngine = new InferenceEngine();
    
//     // Set up your model name and version
//     const modelName = "face-shape-detection";
//     const version = "1";
//     const publishableKey = "rf_TMXVrLL8s9P4Y0LtTx5pb8xUiFH2"; // Use the provided API key

//     // Start the worker with the publishable key
//     try {
//         const workerId = await inferEngine.startWorker(modelName, version, publishableKey);

//         if (capturedImage) {
//             try {
//                 // Convert the base64 image to a Blob
//                 const blob = await (await fetch(capturedImage)).blob();
                
//                 // Create an ImageBitmap from the Blob
//                 const imageBitmap = await createImageBitmap(blob);

//                 // Perform inference on the ImageBitmap
//                 const predictions = await inferEngine.infer(workerId, imageBitmap);
//                 console.log(predictions);

//                 if (predictions && predictions.length > 0) {
//                     setApiResponse(predictions[0].class);
//                 } else {
//                     setApiResponse("No face shape detected");
//                 }
//             } catch (error) {
//                 console.error("Error during inference:", error);
//                 setApiResponse("Error: Unable to detect face shape");
//             }
//         }
//     } catch (error) {
//         console.error("Error initializing inference worker:", error);
//         setApiResponse("Error initializing inference worker");
//     }
// };


//     return (
//         <div style={{ width: '50%', textAlign: 'center', backgroundColor: '#ddd', padding: '20px', position: 'relative' }}>
//             <h2>Camera Display</h2>

//             {capturedImage ? (
//                 <img src={capturedImage} alt="Captured" style={{ width: '100%'}} />
//             ) : (
//                 <div style={{ position: 'relative'}}>
//                     <video ref={videoRef} autoPlay style={{ width: '100%' }}></video>
//                     <div
//                         style={{
//                             position: 'absolute',
//                             top: '50%',
//                             left: '50%',
//                             width: '50%',
//                             height: '50%',
//                             transform: 'translate(-50%, -50%)',
//                             border: '2px solid red',
//                             boxSizing: 'border-box',
//                         }}
//                     ></div>
//                 </div>
//             )}

//             <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480"></canvas>

//             <div style={{ marginTop: '10px' }}>
//                 {capturedImage ? (
//                     <button onClick={retakePicture}>Retake Picture</button>
//                 ) : (
//                     <button onClick={captureSquare}>Capture Picture</button>
//                 )}
//                 <button onClick={handleSubmit} style={{ marginLeft: '10px' }}>
//                     Submit
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default CameraDisplay;


// from here
// src/components/Main/CameraDisplay.js
import React, { useState, useRef, useEffect } from 'react';
import { InferenceEngine } from "inferencejs";

function CameraDisplay({ setApiResponse, apiKey }) {
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [capturedImage, setCapturedImage] = useState(null);
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
            tracks.forEach(track => track.stop());
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

        context.drawImage(
            videoRef.current,
            startX, startY, squareSize, squareSize,
            0, 0, squareSize, squareSize
        );

        const croppedImageData = canvas.toDataURL('image/png');
        setCapturedImage(croppedImageData);
        setIsCameraOn(false);
    };

    const retakePicture = () => {
        setCapturedImage(null);
        setIsCameraOn(true);
    };

    const handleSubmit = async () => {
        console.log("Now sending request to API using inferencejs");
        const inferEngine = new InferenceEngine();
        
        const modelName = "face-shape-detection";
        const version = "1";
        const publishableKey = apiKey; // Use the provided API key

        try {
            const workerId = await inferEngine.startWorker(modelName, version, publishableKey);

            if (capturedImage) {
                try {
                    const blob = await (await fetch(capturedImage)).blob();
                    const imageBitmap = await createImageBitmap(blob);
                    const predictions = await inferEngine.infer(workerId, imageBitmap);
                    console.log(predictions);

                    if (predictions && predictions.length > 0) {
                        setApiResponse(predictions[0].class);
                    } else {
                        setApiResponse("No face shape detected");
                    }
                } catch (error) {
                    console.error("Error during inference:", error);
                    setApiResponse("Error: Unable to detect face shape");
                }
            }
        } catch (error) {
            console.error("Error initializing inference worker:", error);
            setApiResponse("Error initializing inference worker");
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Camera Display</h2>

            {capturedImage ? (
                <img src={capturedImage} alt="Captured" style={styles.capturedImage} />
            ) : (
                <div style={{ position: 'relative' }}>
                    <video ref={videoRef} autoPlay style={styles.video}></video>
                    <div style={styles.captureSquare}></div>
                </div>
            )}

            <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480"></canvas>

            <div style={styles.buttonContainer}>
                {capturedImage ? (
                    <button style={styles.button} onClick={retakePicture}>Retake Picture</button>
                ) : (
                    <button style={styles.button} onClick={captureSquare}>Capture Picture</button>
                )}
                <button style={{ ...styles.button, marginLeft: '10px' }} onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
}

export default CameraDisplay;
const styles = {
    container: {
        width: '50%',
        textAlign: 'center',
        backgroundColor: '#ddd',
        padding: '20px',
        position: 'relative',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        margin: '20px 0 20px 20px', // Adjusted margin for top, bottom, and left
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333',
        fontFamily: 'Arial, sans-serif', // Match the font style
    },
    capturedImage: {
        width: '100%',
        borderRadius: '4px',
    },
    video: {
        width: '100%',
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
    },
    button: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        fontFamily: 'Arial, sans-serif', // Match the font style
    }
};


