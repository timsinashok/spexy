
import React, { useState } from 'react';

// component to display the signup form
function SignupPage() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [recoverycode, setRecovery] = useState('');
    const [hoveredButton, setHoveredButton] = useState(null);

    const handleSignup = () => {
        console.log('Signing up!', { name, username, password, recoverycode });
        // Implement signup logic here -- save to the database if required
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.header}>Sign Up</h1>
                <InputField
                    type="text"
                    placeholder="Store Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <InputField
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <InputField
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <InputField
                    type="password"
                    placeholder="Recovery Code"
                    value={recoverycode}
                    onChange={(e) => setRecovery(e.target.value)}
                />
                <button
                    style={{
                        ...styles.button,
                        ...(hoveredButton === 'signup' && styles.buttonHover),
                    }}
                    onMouseEnter={() => setHoveredButton('signup')}
                    onMouseLeave={() => setHoveredButton(null)}
                    onClick={handleSignup}
                >
                    Sign Up
                </button>
                <div style={styles.links}>
                    <a href="/" style={styles.registerLink}>
                        Go back to Login?
                    </a>
                </div>
            </div>
        </div>
    );
}

// component for input field
function InputField({ type, placeholder, value, onChange }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            style={styles.input}
        />
    );
}

export default SignupPage;


// Local styles for the SignupPage component
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
    },
    registerLink: {
        marginTop: '20px',
        display: 'block',
        fontSize: '14px',
        textDecoration: 'underline',
    },
};
