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
            <img src="logo.png" alt="Spexy Logo" />
            <img src={`glasses-unscreen.gif`} alt="Spexy gif" style={{ width: '60%', maxHeight: '100px', objectFit: 'cover' }}/>
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
                    
                    <Link to="/store" style={{ textDecoration: 'none' }}>
                    <button
                        style={{
                            ...styles.button,
                            ...(hoveredButton === 'eyebuydirect' && styles.buttonHover),
                        }}
                        onMouseEnter={() => setHoveredButton('eyebuydirect')}
                        onMouseLeave={() => setHoveredButton(null)}
                    >
                        Eyebuydirect
                    </button>
                </Link>
                    // <button
                    //     style={{
                    //         ...styles.button,
                    //         ...(hoveredButton === 'search' && styles.buttonHover),
                    //     }}
                    //     onMouseEnter={() => setHoveredButton('search')}
                    //     onMouseLeave={() => setHoveredButton(null)}
                    //     onClick={handleSearch}
                    // >
                    //     Search
                    // </button>
                    {/* {isSearchValid && <Link to="/store"></Link>} */}
                </div>
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
        background: `
        radial-gradient(circle at 30% 30%, rgba(121, 121, 121, 1), rgba(121, 121, 121, 0) 60%),
        radial-gradient(circle at 70% 70%, rgba(205, 177, 118, 1), rgba(205, 177, 118, 0) 70%)`,  
    },
    card: {
        backgroundColor: '#f1f0eb', 
        padding: '60px', 
        borderRadius: '16px',            // Increase padding for a larger card
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        width: '80%',                  // Set to 80% of viewport width
        maxWidth: '600px',             // Limit max width for larger screens
        textAlign: 'center',
    },
    // header: {
    //     fontSize: '60px',
    //     fontWeight: 'bold',
    //     marginBottom: '30px',
    //     color: '#4B382A',
    //     fontFamily: '"Playfair Display", serif', 
    // },
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
        fontFamily: 'Verdana',
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
        fontFamily: 'Verdana',
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
        fontFamily: 'Verdana',
    },
};
