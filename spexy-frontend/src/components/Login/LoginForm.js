import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const users = [
    { username: 'admin', password: 'admin123' },
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' }
];

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [hoveredButton, setHoveredButton] = useState(null);
    // const navigate = useNavigate();

    const handleLogin = () => {
        console.log('Logging in:', username, password);
        // Implement login logic here
        // navigate('/dashboard'); // Redirect after login
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
            <img src="logo.png" alt="Spexy Logo" style={styles.navLeft} />
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
                <div style={styles.buttonContainer}>
                    <Link to="/reset" style={{ textDecoration: 'none' }}>
                        <button
                            style={{
                                ...styles.button,
                                ...(hoveredButton === 'forgot' && styles.buttonHover),
                            }}
                            onMouseEnter={() => setHoveredButton('forgot')}
                            onMouseLeave={() => setHoveredButton(null)}
                        >
                            Forgot Password?
                        </button>
                    </Link>
                    <button
                        style={{
                            ...styles.button,
                            ...(hoveredButton === 'login' && styles.buttonHover),
                        }}
                        onMouseEnter={() => setHoveredButton('login')}
                        onMouseLeave={() => setHoveredButton(null)}
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </div>
                <Link to="/signup" style={styles.registerLink}>
                    New User? Sign up here
                </Link>
            </div>
        </div>
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
        width: '100vw',
        background: `
        radial-gradient(circle at 30% 30%, rgba(121, 121, 121, 1), rgba(121, 121, 121, 0) 60%),
        radial-gradient(circle at 70% 70%, rgba(205, 177, 118, 1), rgba(205, 177, 118, 0) 70%)`,
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
        fontFamily: 'Verdana',
        height: '40px',
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
        fontFamily: 'Verdana',
    },
    buttonContainer: {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
    },
    button: {
        padding: '15px 40px',
        backgroundColor: 'transparent',
        color: 'black',
        border: '2px solid black',
        borderRadius: '20px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, color 0.3s ease',
        fontFamily: 'Verdana'
    },
    buttonHover: {
        backgroundColor: '#4B382A',
        color: 'white',
    },
    registerLink: {
        marginTop: '20px',
        display: 'block',
        fontSize: '14px',
        textDecoration: 'underline',
        fontFamily: 'Verdana'
    },
};
