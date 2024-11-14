// src/components/Main/RecommendationItem.js
import React from 'react';

// Component to display a single recommendation item
function RecommendationItem({ item }) {
    return (
        <div style={styles.card}>
            <img src={item.image_url} alt={item["Glass Name"]} style={styles.image} />
            <h3 style={styles.name}>{item["Glass Name"]}</h3>
            <p style={styles.price}>{item.Price}</p>
            <div style={styles.colors}>
                <span>Available Colors: </span>
                {item.Colors.map((color, index) => (
                    <span key={index} style={styles.color}>
                        {color}
                        {index < item.Colors.length - 1 ? ', ' : ''}
                    </span>
                ))}
            </div>
            <a href={item.Link} target="_blank" rel="noopener noreferrer" style={styles.link}>
                View the glass
            </a>
            <button style={styles.button}>Try</button>
        </div>
    );
}

// Local styles for the RecommendationItem component
const styles = {
    card: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '16px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '300px',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
    },
    image: {
        width: '100%',
        height: 'auto',
        borderRadius: '8px',
        marginBottom: '16px',
    },
    name: {
        fontSize: '1.2em',
        fontWeight: 'bold',
        color: '#333',
        margin: '8px 0',
    },
    price: {
        color: '#ff5722',
        fontSize: '1em',
        fontWeight: 'bold',
        margin: '8px 0',
    },
    colors: {
        fontSize: '0.9em',
        color: '#555',
        margin: '8px 0',
    },
    color: {
        display: 'inline',
    },
    link: {
        display: 'inline-block',
        marginTop: '12px',
        fontSize: '0.9em',
        color: '#1e90ff',
        textDecoration: 'none',
    },
    button: {
        marginTop: '12px',
        padding: '10px 20px',
        fontSize: '1em',
        color: '#fff',
        backgroundColor: '#4CAF50',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default RecommendationItem;