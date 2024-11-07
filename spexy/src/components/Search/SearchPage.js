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

// // src/components/Search/SearchPage.js
// import React, { useState } from 'react';

// function SearchPage() {
//     const [searchTerm, setSearchTerm] = useState('');

//     const handleSearch = () => {
//         console.log('Searching for:', searchTerm);
//         // Implement actual search functionality here
//     };

//     return (
//         <div style={styles.container}>
//             <h2 style={styles.title}>Search for Store</h2>
//             <div style={styles.inputContainer}>
//                 <input
//                     type="text"
//                     placeholder="Search for store"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     style={styles.input}
//                 />
//                 <button style={styles.button} onClick={handleSearch}>Search</button>
//                 <button style={{ ...styles.button, ...styles.luckyButton }}>I'm Feeling Lucky</button>
//             </div>
//         </div>
//     );
// }

// export default SearchPage;

// const styles = {
//     container: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         border: '1px solid #ddd', 
//         padding: '20px',
//         width: '300px',
//         height: '250px',
//         margin: '100px auto', 
//         borderRadius: '8px',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//         backgroundColor: '#f9f9f9',
//     },
//     title: {
//         marginBottom: '20px',
//         fontSize: '24px',
//         fontWeight: 'bold',
//         color: '#333',
//     },
//     inputContainer: {
//         width: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '10px',
//     },
//     input: {
//         padding: '10px',
//         border: '1px solid #ccc',
//         borderRadius: '4px',
//         width: '100%',
//         boxSizing: 'border-box',
//     },
//     button: {
//         padding: '10px',
//         backgroundColor: 'black',
//         color: 'white',
//         border: 'none',
//         borderRadius: '4px',
//         cursor: 'pointer',
//         transition: 'background-color 0.3s ease',
//     },
//     luckyButton: {
//         backgroundColor: '#007bff', // Different color for the "I'm Feeling Lucky" button
//     },
// };



// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// function SearchPage() {
//     const [searchTerm, setSearchTerm] = useState('');

//     const handleSearch = () => {
//         console.log('Searching for:', searchTerm);
//         // Implement actual search functionality here
//     };

//     return (
//         <div style={styles.container}>
//             <div style={styles.card}>
//                 <h1 style={styles.header}>Spexy</h1>
//                 <input
//                     type="text"
//                     placeholder="Store Name Here"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     style={styles.input}
//                 />
//                 <div style={styles.buttonContainer}>
//                     <Link to="/store" style={styles.adminLink}>
//                     <button style={{ ...styles.button, ...styles.luckyButton }}>
//                     Sample Store
//                     </button>
//                     </Link>
//                     <button style={styles.button} onClick={handleSearch}>Search</button>
//                 </div>
//                 <Link to="/login" style={styles.adminLink}>Administrator Login</Link>
//             </div>
//         </div>
//     );
// }

// export default SearchPage;

// const styles = {
//     container: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '100vh',
//         backgroundColor: '#e0e8f9', // Light blue background for the page
//     },
//     card: {
//         backgroundColor: '#d3d3d3', // Light gray background for the card
//         padding: '40px',
//         borderRadius: '16px',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//         width: '400px',
//         textAlign: 'center',
//     },
//     header: {
//         fontSize: '48px',
//         fontWeight: 'bold',
//         marginBottom: '30px',
//         color: '#2c3e50',
//         fontFamily: 'Georgia, serif', // Font style for the "Spexy" header
//     },
//     input: {
//         padding: '15px',
//         border: 'none',
//         borderRadius: '8px',
//         width: '100%',
//         boxSizing: 'border-box',
//         fontSize: '18px',
//         backgroundColor: '#bfc4c9', // Light gray color for input
//         outline: 'none',
//         marginBottom: '20px',
//     },
//     buttonContainer: {
//         display: 'flex',
//         justifyContent: 'space-between',
//         gap: '10px',
//     },
//     button: {
//         padding: '10px 20px',
//         backgroundColor: '#2c3e50',
//         color: '#fff',
//         border: 'none',
//         borderRadius: '8px',
//         cursor: 'pointer',
//         fontFamily: 'Arial, sans-serif',
//         fontSize: '16px',
//     },
//     luckyButton: {
//         backgroundColor: '#2c3e50', // Same color for consistency
//     },
//     adminLink: {
//         marginTop: '20px',
//         display: 'block',
//         color: '#4b0082', // Indigo color for the link
//         fontSize: '14px',
//         textDecoration: 'none',
//     },
// };



import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SearchPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        console.log('Searching for:', searchTerm);
        // Implement actual search functionality here
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.header}>Spexy</h1>
                <input
                    type="text"
                    placeholder="Store Name Here"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={styles.input}
                />
                <div style={styles.buttonContainer}>
                    <Link to="/store" style={{ textDecoration: 'none' }}>
                        <button style={styles.button}>I'm Feeling Lucky</button>
                    </Link>
                    <button style={styles.button} onClick={handleSearch}>Search</button>
                </div>
                <Link to="/login" style={styles.adminLink}>Administrator Login</Link>
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
        height: '100vh',
        backgroundColor: '#e0e8f9', // Light blue background for the page
    },
    card: {
        backgroundColor: '#d3d3d3', // Light gray background for the card
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '400px',
        textAlign: 'center',
    },
    header: {
        fontSize: '48px',
        fontWeight: 'bold',
        marginBottom: '30px',
        color: '#2c3e50',
        fontFamily: 'Georgia, serif', // Font style for the "Spexy" header
    },
    input: {
        padding: '15px',
        border: 'none',
        borderRadius: '8px',
        width: '100%',
        boxSizing: 'border-box',
        fontSize: '18px',
        backgroundColor: '#bfc4c9', // Light gray color for input
        outline: 'none',
        marginBottom: '20px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '10px',
        width: '100%', // Ensure the container takes the full width of the card
    },
    button: {
        flex: 1, // Make each button take equal space
        padding: '10px',
        backgroundColor: '#2c3e50',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        textAlign: 'center',
    },
    adminLink: {
        marginTop: '20px',
        display: 'block',
        color: '#4b0082', // Indigo color for the link
        fontSize: '14px',
        textDecoration: 'none',
    },
};
