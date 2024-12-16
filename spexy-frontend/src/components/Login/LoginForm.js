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
    const [error, setError] = useState('');
    const navigate = useNavigate();
    // const navigate = useNavigate();

    // const handleLogin = () => {
    //     console.log('Logging in:', username, password);
    //     // Implement login logic here
    //     // navigate('/dashboard'); // Redirect after login
    // };

    const handleLogin = () => {
        if (!username || !password) {
            setError('Please enter both username and password.');
            return;
        }
    
        // Assuming `users` is a hardcoded array or fetched from an API
        const user = users.find(
            (user) => user.username === username && user.password === password
        );
    
        if (user) {
            setError('');
            // Set authentication flag in localStorage
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/admin'); // Redirect to Admin page
        } else {
            setError('Invalid username or password');
        }
    };


    return (
        <div style={styles.container}>
            <div style={styles.card}>
        <Link to="/">
        <img src="logo.png" alt="Spexy Logo" style={styles.navLeft} />
        </Link>

        {error && <div style={styles.errorMessage}>{error}</div>}  


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
    errorMessage: {
    color: '#ff0000',
    backgroundColor: '#ffebee',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '15px',
    fontSize: '14px',
    border: '1px solid #ffcdd2',
},
};
