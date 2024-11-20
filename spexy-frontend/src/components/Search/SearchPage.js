// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// // Component for the search page
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
//                     <Link to="/store" style={{ textDecoration: 'none' }}>
//                         <button style={styles.button}>I'm Feeling Lucky</button>
//                     </Link>
//                     <button style={styles.button} onClick={handleSearch}>Search</button>
//                 </div>
//                 <Link to="/login" style={styles.adminLink}>Administrator Login</Link>
//             </div>
//         </div>
//     );
// }

// export default SearchPage;

// // Local styles for the SearchPage component
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
//         width: '100%', // Ensure the container takes the full width of the card
//     },
//     button: {
//         flex: 1, // Make each button take equal space
//         padding: '10px',
//         backgroundColor: '#2c3e50',
//         color: '#fff',
//         border: 'none',
//         borderRadius: '8px',
//         cursor: 'pointer',
//         fontFamily: 'Arial, sans-serif',
//         fontSize: '16px',
//         textAlign: 'center',
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
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

// Component for the search page
function SearchPage() {
    const [searchTerm, setSearchTerm] = useState('');
    // const [isSearchValid, setIsSearchValid] = useState(false);
    const [hoveredButton, setHoveredButton] = useState(null);
    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            console.log('searching for the store');
            const response = await axios.get(`http://127.0.0.1:8000/stores/${searchTerm}/glasses/`);
            if (response.data) {
                // console.log('Store found in the database');
                // setIsSearchValid(true);
                navigate('/store');
            } else {
                // console.log('Store not found');
                alert('Store not found in the database');
                // setIsSearchValid(false);
            }
        } catch (error) {
            // console.log('Store not found in the database');
            alert('An error occurred while searching for the store');
            // setIsSearchValid(false);
        }
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
                        <button
                            style={{
                                ...styles.button,
                                ...(hoveredButton === 'lucky' && styles.buttonHover),
                            }}
                            onMouseEnter={() => setHoveredButton('lucky')}
                            onMouseLeave={() => setHoveredButton(null)}
                        >
                            I'm feeling Lucky
                        </button>
                    </Link>
                    <button
                        style={{
                            ...styles.button,
                            ...(hoveredButton === 'search' && styles.buttonHover),
                        }}
                        onMouseEnter={() => setHoveredButton('search')}
                        onMouseLeave={() => setHoveredButton(null)}
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                    {/* {isSearchValid && <Link to="/store"></Link>} */}
                </div>
                <Link to="/login" style={styles.adminLink}>Administrator Login</Link>
            </div>
        </div>
    );
}

export default SearchPage;

// Local styles for the SearchPage component
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',               
        backgroundColor: '#d3d3d3',//'white',

        
    },
    card: {
        backgroundColor: '#f1f0eb', 
        padding: '60px', 
        borderRadius: '16px',            // Increase padding for a larger card
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        width: '80%',                  // Set to 80% of viewport width
        maxWidth: '600px',             // Limit max width for larger screens
        textAlign: 'center',
        // border: '20px solid white'
    },
    header: {
        fontSize: '60px',
        fontWeight: 'bold',
        marginBottom: '30px',
        color: '#4B382A',
        fontFamily: '"Playfair Display", serif', 
    },
    input: {
        padding: '15px',
        border: 'none',
        borderRadius: '18px',
        width: '100%',
        boxSizing: 'border-box',
        fontSize: '18px',
        backgroundColor: '#bfc4c9',
        outline: 'none',
        marginBottom: '20px',
    },
    buttonContainer: {
        marginTop: '20px',             // Add margin for more space around buttons
        display: 'flex',
        justifyContent: 'center',
        gap: '40px',
    },
    button: {
        padding: '15px 70px',          // Larger padding for a bigger button
        backgroundColor: 'transparent',
        color: 'black',
        border: '2px solid black',
        borderRadius: '20px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, color 0.3s ease',
        fontFamily: '"Playfair Display", serif',
    },
    buttonHover: {
        backgroundColor: '#4B382A',
        color: 'white',
    },
    adminLink: {
        marginTop: '20px',
        display: 'block',
        fontSize: '14px',
        textDecoration: 'underline',
        fontFamily: '"Playfair Display", serif',
    },
};
