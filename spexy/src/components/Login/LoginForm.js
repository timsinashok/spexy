// // src/components/Login/LoginForm.js
// import React, { useState } from 'react';

// function LoginForm() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     const handleLogin = () => {
//         // Placeholder login function
//         console.log('Logging in:', username, password);
//     };

//     return (
//         <div>
//             <h2>Login</h2>
//             <input
//                 type="text"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//             />
//             <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//             />
//             <button onClick={handleLogin}>Login</button>
//             <div>
//                 <a href="/signup">New? Signup here</a> | <a href="/reset">Forgot password?</a>
//             </div>
//         </div>
//     );
// }

// export default LoginForm;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Logging in:', username, password);
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.header}>Spexy</h1>
                <div style={styles.inputContainer}>
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
                </div>
                <div style={styles.buttonContainer}>
                    <Link to="/reset" style={{ textDecoration: 'none' }}>
                        <button style={styles.buttonSecondary}>Forgot Password</button>
                    </Link>
                    <button style={styles.button} onClick={handleLogin}>Submit</button>
                </div>
                <div style={styles.links}>
                    <Link to="/signup" style={styles.link}>New user? Sign up</Link>
                </div>
            </div>
        </div>
    );
}

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

export default LoginForm;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa', // Light background color
    },
    card: {
        backgroundColor: '#d3d3d3', // Light gray background for card
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '350px',
        textAlign: 'center',
    },
    header: {
        fontSize: '36px',
        fontWeight: 'bold',
        marginBottom: '30px',
        color: '#2c3e50',
        fontFamily: 'Georgia, serif', // Match the font style in the design
    },
    inputContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    input: {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        width: '100%',
        boxSizing: 'border-box',
        fontSize: '16px',
        outline: 'none',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#2c3e50',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontFamily: 'Arial, sans-serif',
    },
    buttonSecondary: {
        padding: '10px 20px',
        backgroundColor: '#2c3e50',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontFamily: 'Arial, sans-serif',
    },
    links: {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        fontSize: '0.9em',
        color: '#007bff',
    },
    link: {
        textDecoration: 'none',
        color: '#007bff',
    }
};
