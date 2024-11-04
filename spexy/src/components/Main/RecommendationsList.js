// src/components/Main/RecommendationsList.js
import React from 'react';
import RecommendationItem from './RecommendationItem';

const mockRecommendations = [
    { id: 1, name: 'Glasses Model 1' },
    { id: 2, name: 'Glasses Model 2' },
    { id: 3, name: 'Glasses Model 3' },
];

function RecommendationsList({ apiResponse }) {
    return (
        <div>
            <h2>Recommended Glasses</h2>
            {apiResponse && (
                <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                    Detected Face Shape: {apiResponse}
                </div>
            )}
            {mockRecommendations.map((item) => (
                <RecommendationItem key={item.id} item={item} />
            ))}
        </div>
    );
}

export default RecommendationsList;
