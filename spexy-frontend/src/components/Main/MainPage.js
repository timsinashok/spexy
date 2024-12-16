import React, { useState } from 'react';
import Header from './Header';
import CameraDisplay from './CameraDisplay';
import RecommendationsList from './RecommendationsList';

// Main page component
function MainPage() {
    const [apiResponse, setApiResponse] = useState("");
    const [imageUrl, setImageUrl] = useState(null); 
    const apiKey = process.env.REACT_APP_RoboflowAPI; // API key for the recommendation service
    console.log(imageUrl)
    console.log(apiResponse)

    // Styles for the main page
    const styles = {
        mainPageContainer: {
            // padding: '2px',
            background: `
            radial-gradient(circle at 30% 30%, rgba(121, 121, 121, 1), rgba(121, 121, 121, 0) 60%),
            radial-gradient(circle at 70% 70%, rgba(205, 177, 118, 1), rgba(205, 177, 118, 0) 70%)`,
            minHeight: '100vh',
            },

        contentLayout: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '100%',
        },
        halfScreen: {
            flex: '1',
            maxWidth: '90%',
            padding: '10px',
        },
        componentContainer: {
            backgroundColor: '#f1f0eb',
            padding: '0px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }
    };

    return (
        <div style={styles.mainPageContainer}>
            <Header />
            <div style={styles.contentLayout}>
                <div style={styles.halfScreen}>
                    <div style={styles.componentContainer}>
                        <CameraDisplay setApiResponse={setApiResponse} apiKey={apiKey } imageUrl={imageUrl} />
                    </div>
                </div>
                <div style={styles.halfScreen}>
                    <div style={styles.componentContainer}>
                    <RecommendationsList
                        apiResponse={apiResponse}
                        setImageUrl={setImageUrl} // Pass callback to update imageUrl
                    />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
