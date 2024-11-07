// // src/components/Main/MainPage.js
// import React from 'react';
// import Header from './Header';
// import CameraDisplay from './CameraDisplay';
// import RecommendationsList from './RecommendationsList';

// function MainPage() {
//     return (
//         <div>
//             <Header />
//             <div style={{ display: 'flex' }}>
//                 <CameraDisplay />
//                 <RecommendationsList />
//             </div>
//         </div>
//     );
// }

// export default MainPage;


// src/components/Main/MainPage.js
// import React, { useState } from 'react';
// import Header from './Header';
// import CameraDisplay from './CameraDisplay';
// import RecommendationsList from './RecommendationsList';

// function MainPage() {
//     const [apiResponse, setApiResponse] = useState("");
//     const apiKey = "JemAXJ2X7SOptsVPKxrG"; // Replace with your actual API key

//     return (
//         <div>
//             <Header />
//             <div style={{ display: 'flex' }}>
//                 <CameraDisplay setApiResponse={setApiResponse} apiKey={apiKey} />
//                 <RecommendationsList apiResponse={apiResponse} />
//             </div>
//         </div>
//     );
// }

// export default MainPage;
import React, { useState } from 'react';
import Header from './Header';
import CameraDisplay from './CameraDisplay';
import RecommendationsList from './RecommendationsList';

function MainPage() {
    const [apiResponse, setApiResponse] = useState("");
    const apiKey = "JemAXJ2X7SOptsVPKxrG"; // Replace with your actual API key

    const styles = {
        mainPageContainer: {
            padding: '20px',
        },
        contentLayout: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '100%',
        },
        halfScreen: {
            flex: '1',
            maxWidth: '50%',
            padding: '10px',
            boxSizing: 'border-box',
        },
        componentContainer: {
            backgroundColor: '#f9f9f9',
            padding: '15px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            height: '100%', // Ensures the container takes full height
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
                        <CameraDisplay setApiResponse={setApiResponse} apiKey={apiKey} />
                    </div>
                </div>
                <div style={styles.halfScreen}>
                    <div style={styles.componentContainer}>
                        <RecommendationsList apiResponse={apiResponse} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
