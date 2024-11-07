// // src/components/Admin/AdminPage.js
// import React from 'react';

// const mockGlasses = [
//     { id: 1, name: 'Glasses 1' },
//     { id: 2, name: 'Glasses 2' },
// ];

// function AdminPage() {
//     return (
//         <div>
//             <h2>Admin Page</h2>
//             <button>Scrape</button>
//             <button>Add</button>
//             <button>Update</button>
//             <button>Remove</button>
//             <ul>
//                 {mockGlasses.map((glass) => (
//                     <li key={glass.id}>{glass.name}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default AdminPage;


// src/components/Admin/AdminPage.js
import React from 'react';

const mockGlasses = [
    { id: 1, name: 'Glasses 1' },
    { id: 2, name: 'Glasses 2' },
];

function AdminPage() {
    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Admin Page</h2>
            <div style={styles.buttonContainer}>
                <button style={styles.button}>Scrape</button>
                <button style={styles.button}>Add</button>
                <button style={styles.button}>Update</button>
                <button style={styles.button}>Remove</button>
            </div>
            <ul style={styles.list}>
                {mockGlasses.map((glass) => (
                    <li key={glass.id} style={styles.listItem}>{glass.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default AdminPage;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #ddd',
        padding: '20px',
        width: '400px',
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
    buttonContainer: {
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
    },
    button: {
        padding: '10px 15px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    
    list: {
        listStyleType: 'none',
        padding: '0',
        width: '100%',
        textAlign: 'left',
    },
    listItem: {
        padding: '10px',
        borderBottom: '1px solid #ddd',
        fontSize: '16px',
        color: '#333',
    },
};

