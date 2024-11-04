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
import React, { useState } from 'react';
import Header from './Header';
import CameraDisplay from './CameraDisplay';
import RecommendationsList from './RecommendationsList';

function MainPage() {
    const [apiResponse, setApiResponse] = useState("");
    const apiKey = "JemAXJ2X7SOptsVPKxrG"; // Replace with your actual API key

    return (
        <div>
            <Header />
            <div style={{ display: 'flex' }}>
                <CameraDisplay setApiResponse={setApiResponse} apiKey={apiKey} />
                <RecommendationsList apiResponse={apiResponse} />
            </div>
        </div>
    );
}

export default MainPage;
