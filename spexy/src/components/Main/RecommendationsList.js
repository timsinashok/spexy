import React, { useEffect, useState } from 'react';
import RecommendationItem from './RecommendationItem';
import axios from 'axios';

function RecommendationsList({ apiResponse }) {

    //apiResponse = "oval";

    console.log("apiResponse", apiResponse);
    
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //// This block of the code connects with api to fetch the recommendations which will be used for later assignments/////
    
    useEffect(() => {
        ///Function to fetch glasses based on the detected face shape
     
            const fetchRecommendations = async () => {
            try {
                setLoading(true);
                const storeId = "6710784d259452f710e58368";  // Replace with the actual store ID if applicable
                const response = await axios.get(`http://127.0.0.1:8000/stores/${storeId}/glasses/${apiResponse}`);
                console.log(response.data);
                setRecommendations(response.data);  // Set the fetched recommendations
                setLoading(false);
            } catch (err) {
                setError("Failed to load recommendations.");
                setLoading(false);
            }
        };

        if (apiResponse) {
            fetchRecommendations();  // Only fetch if apiResponse is available
        }
    }, [apiResponse]);
   
    // This block of the code is used to fetch the recommendations from the sample data which is used for the assignment
    // useEffect(() => {
    //     const fetchRecommendations = async () => {
    //         try {
    //             setLoading(true);
    //             const response = await fetch('sample_data.json');
    //             const data = await response.json();
    //             setRecommendations(data);  // Set the fetched recommendations
    //             setLoading(false);
    //         } catch (err) {
    //             setError("Failed to load recommendationsa.");
    //             setLoading(false);
    //         }
    //     };
    //     fetchRecommendations();  
    // }, [apiResponse]);

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

