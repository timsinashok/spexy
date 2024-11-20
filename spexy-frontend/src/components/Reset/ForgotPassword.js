
import React, { useState } from 'react';

function ForgotPasswordPage() {
    const [username, setUsername] = useState('');
    const [recoveryCode, setRecoveryCode] = useState('');
    const [hoveredButton, setHoveredButton] = useState(null);

    const handleForgotPassword = () => {
        console.log('Recovering password');
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.header}>Forgot Password</h1>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Recovery Code"
                    value={recoveryCode}
                    onChange={(e) => setRecoveryCode(e.target.value)}
                    style={styles.input}
                />
                <div style={styles.buttonContainer}>
                    <button
                        style={{
                            ...styles.button,
                            ...(hoveredButton === 'submit' && styles.buttonHover),
                        }}
                        onMouseEnter={() => setHoveredButton('submit')}
                        onMouseLeave={() => setHoveredButton(null)}
                        onClick={handleForgotPassword}
                    >
                        Submit
                    </button>
                </div>
                <a href="/" style={styles.links}>
                    Go back to Login
                </a>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;

// Local styles for the ForgotPassword component
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#d3d3d3',
    },
    card: {
        backgroundColor: '#f1f0eb',
        padding: '60px',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        width: '80%',
        maxWidth: '600px',
        textAlign: 'center',
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
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'center',
    },
    button: {
        padding: '15px 40px',
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
    links: {
        marginTop: '20px',
        display: 'block',
        fontSize: '14px',
        fontFamily: '"Playfair Display", serif',
        textDecoration: 'underline'
    },
};

