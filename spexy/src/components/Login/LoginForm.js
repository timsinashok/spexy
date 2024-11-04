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


// src/components/Login/LoginForm.js
import React, { useState } from 'react';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Logging in:', username, password);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>LOGIN</h2>
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
                <button style={styles.button} onClick={handleLogin}>Login</button>
            </div>
            <div style={styles.links}>
                <a href="/signup" style={styles.link}>New user? Sign up</a>
                <a href="/reset" style={styles.link}>Forgot password?</a>
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
        border: '1px solid #ddd', 
        padding: '20px',
        width: '300px',
        height: '350px',
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
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    links: {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        fontSize: '0.9em',
        color: '#007bff',
    },
    link: {
        textDecoration: 'none',
        color: '#007bff',
    }
};
