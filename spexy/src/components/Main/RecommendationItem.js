// src/components/Main/RecommendationItem.js
import React from 'react';

function RecommendationItem({ item }) {
    return (
        <div>
            <h3>{item.name}</h3>
            <button>Try</button>
        </div>
    );
}

export default RecommendationItem;
