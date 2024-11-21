import React from 'react';

function Header() {
    return (
        <header style={styles.header}>
            <img src="logo.png" alt="Spexy Logo" style={styles.logo} />
            <img src="https://mma.prnewswire.com/media/2385824/Eyebuydirect_Logo.jpg?p=facebook" alt="Eye Buy Direct Logo" style={styles.title} />
            {/* <button style={styles.button}>Profile</button> */}
        </header>
    );
}

export default Header;

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        backgroundColor: '#f9f9f9',
        borderBottom: '2px solid #e0e0e0',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: '0',
        zIndex: '1000',
    },
    title: {
        height: '50px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: '600',
        backgroundColor: '#4B382A',
        color: '#fff',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    logo: {
        height: '50px',
    },
};
