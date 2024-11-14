import React, { useEffect, useState } from 'react';
import RecommendationItem from './RecommendationItem';
import axios from 'axios';

// Recommendations engine
function recommendGlassesShape(faceShape) {
    const faceToGlassesMap = {
        heart: ["oval", "square"],
        oblong: ["round", "square"],
        oval: ["square",],
        round: ["square"],
        square: ["round", "oval"]
    };
    
    return faceToGlassesMap[faceShape.toLowerCase()] || ["oval", "round", "square"];
}

function RecommendationsList({ apiResponse }) {
    const faceShapes = recommendGlassesShape(apiResponse);

    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Function to fetch glasses for each recommended shape
        const fetchAllRecommendations = async () => {
            try {
                setLoading(true);
                const storeId = "6710784d259452f710e58368"; // Replace with the actual store ID if applicable
                const allRecommendations = []; // To store all fetched recommendations

                // Loop through each face shape and fetch data
                for (const shape of faceShapes) {
                    const response = await axios.get(`http://127.0.0.1:8000/stores/${storeId}/glasses/${shape}`);
                    allRecommendations.push(...response.data); // Append response data to allRecommendations
                }

                setRecommendations(allRecommendations); // Set the combined recommendations list
                setLoading(false);
            } catch (err) {
                setError("Failed to load recommendations.");
                setLoading(false);
            }
        };

        if (apiResponse) {
            fetchAllRecommendations(); // Only fetch if apiResponse is available
        }
    }, [apiResponse]);

    return (
        <div>
            <h2>Recommended Glasses</h2>
            {apiResponse && (
                <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                    Detected Face Shape: {apiResponse}
                </div>
            )}
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && recommendations.length === 0 && (
                <p>No recommendations available for this face shape.</p>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {!loading && !error && recommendations.map((item) => (
                    <div key={item._id} style={{ flex: '1 1 45%', boxSizing: 'border-box' }}>
                        <RecommendationItem item={item} />
                    </div>
                ))}
            </div>
        </div>
    );
}
export default RecommendationsList;

