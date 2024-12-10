import React, { useEffect, useState } from 'react';
import RecommendationItem from './RecommendationItem';
import axios from 'axios';

// Recommendations engine
function recommendGlassesShape(faceShape) {
    const faceToGlassesMap = {
        heart: ["oval", "square"],
        oblong: ["round", "square"],
        oval: ["square"],
        round: ["square"],
        square: ["round", "oval"]
    };
    
    return faceToGlassesMap[faceShape.toLowerCase()] || ["oval", "round", "square"];
}

function RecommendationsList({ apiResponse, setImageUrl }) {
    const faceShapes = recommendGlassesShape(apiResponse);

    const [recommendations, setRecommendations] = useState([]);
    const [filteredRecommendations, setFilteredRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Price filter states
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(500); // Default maximum price

    // const backendUrl = 'http://127.0.0.1:9090'; // or use process.env.BACKEND_URL if you're reading from environment variables
    // const backendUrl = process.env.BACKEND_URL;
    const backendUrl = 'https://spexy-backend-159238452229.us-central1.run.app'

useEffect(() => {
    // Function to fetch glasses for each recommended shape
    const fetchAllRecommendations = async () => {
        try {
            setLoading(true);
            const storeId = "673978b6a133fa112e837e70"; // Replace with the actual store ID if applicable

            // Fetch all recommendations concurrently using Promise.all
            const requests = faceShapes.map(shape =>
                axios.get(
                    `${backendUrl}/stores/${storeId}/glasses/${shape}` // Use the backendUrl variable
                )
            );
                
                // Wait for all requests to complete
                const responses = await Promise.all(requests);

                // Combine all responses into one array
                const allRecommendations = responses.flatMap(response => response.data);

                setRecommendations(allRecommendations); // Set the combined recommendations list
                setFilteredRecommendations(allRecommendations); // Initial filtered list
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

    // Filter recommendations by price range whenever price range or recommendations change
    useEffect(() => {
        const filtered = recommendations.filter(item => 
            item.Price >= minPrice && item.Price <= maxPrice
        );
        setFilteredRecommendations(filtered);
    }, [minPrice, maxPrice, recommendations]);

    // Styling for scrollable recommendations container
    const styles = {
        container: {
            padding: '30px',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            maxWidth: '800px',
            margin: '20px auto',
            fontFamily: 'Verdana',
        },
        header: {
            fontSize: '2em',
            color: '#4B382A',
            marginBottom: '15px',
            textAlign: 'center',
        },
        faceShape: {
            marginBottom: '10px',
            fontWeight: 'bold',
            color: '#4B382A',
            textAlign: 'center',
        },
        recommendationsContainer: {
            maxHeight: '430px',  // Set a fixed height for scrollable area
            overflowY: 'auto',   // Enable vertical scrolling
            padding: '10px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            borderTop: '1px solid #ddd',
            paddingTop: '15px',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Glasses for YOU</h2>
            {/* {apiResponse && (
                <div style={styles.faceShape}>Detected Face Shape: {apiResponse}</div>
            )} */}
    
            {/* Price Filter Controls */}
            <div style={{ marginBottom: '20px', marginLeft: '60px',marginLeft: '60px',fontFamily: 'Verdana',}}>
                <label>
                    Min Price:
                    <input 
                        type="number" 
                        value={minPrice} 
                        onChange={(e) => setMinPrice(Number(e.target.value))} 
                        style={{ margin: '0 10px' }}
                    />
                </label>
                <label>
                    Max Price:
                    <input 
                        type="number" 
                        value={maxPrice} 
                        onChange={(e) => setMaxPrice(Number(e.target.value))} 
                        style={{ margin: '0 10px' }}
                    />
                </label>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && recommendations.length === 0 && (
                <p>No recommendations available for this face shape.</p>
            )}
            <div style={styles.recommendationsContainer}>
                {!loading && !error && filteredRecommendations.map((item) => (
                    <div key={item._id} style={{ flex: '1 1 45%', boxSizing: 'border-box' }}>
                        <RecommendationItem item={item} setImageUrl={setImageUrl} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecommendationsList;
