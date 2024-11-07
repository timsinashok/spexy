// // src/components/Search/SearchPage.js
// import React, { useState } from 'react';

// function SearchPage() {
//     const [searchTerm, setSearchTerm] = useState('');

//     const handleSearch = () => {
//         console.log('Searching for:', searchTerm);
//     };

//     return (
//         <div>
//             <h2>Search for Store</h2>
//             <input
//                 type="text"
//                 placeholder="Search for store"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <button onClick={handleSearch}>Search</button>
//             <button>I'm Feeling Lucky</button>
//         </div>
//     );
// }

// export default SearchPage;

// src/components/Search/SearchPage.js
import React, { useState } from 'react';

function SearchPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        console.log('Searching for:', searchTerm);
        // Implement actual search functionality here
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Search for Store</h2>
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    placeholder="Search for store"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={styles.input}
                />
                <button style={styles.button} onClick={handleSearch}>Search</button>
                <button style={{ ...styles.button, ...styles.luckyButton }}>I'm Feeling Lucky</button>
            </div>
        </div>
    );
}

export default SearchPage;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #ddd', 
        padding: '20px',
        width: '300px',
        height: '250px',
        margin: '100px auto', 
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        backgroundColor: '#f9f9f9',
    },
    title: {
        marginBottom: '20px',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333',
    },
    inputContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    input: {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '100%',
        boxSizing: 'border-box',
    },
    button: {
        padding: '10px',
        backgroundColor: 'black',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    luckyButton: {
        backgroundColor: '#007bff', // Different color for the "I'm Feeling Lucky" button
    },
};

