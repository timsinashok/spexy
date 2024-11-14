// src/components/Signup/SignupPage.js
import React, { useState } from 'react';

// component to display the signup form
function SignupPage() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [recoverycode, setRecovery] = useState('');

    const handleSignup = () => {
        console.log('Signing up!');
        // write the code to handle signup here -- save in database??
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Sign Up</h2>
            <div style={styles.inputContainer}>
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
                    placeholder="Recovery code"
                    value={recoverycode}
                    onChange={(e) => setRecovery(e.target.value)}
                />
                <button style={styles.button} onClick={handleSignup}>Sign Up</button>
            </div>

            <div style={styles.links}>
                <a href="/">Go back to Login?</a>      
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
        border: '1px solid #ddd', 
        padding: '20px',
        width: '300px',
        height: '400px',
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
    links: {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        fontSize: '0.9em',
        color: '#007bff',
    },
};
