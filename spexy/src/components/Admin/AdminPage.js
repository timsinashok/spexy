// src/components/Admin/AdminPage.js
import React from 'react';

const mockGlasses = [
    { id: 1, name: 'Glasses 1' },
    { id: 2, name: 'Glasses 2' },
];

function AdminPage() {
    return (
        <div>
            <h2>Admin Page</h2>
            <button>Scrape</button>
            <button>Add</button>
            <button>Update</button>
            <button>Remove</button>
            <ul>
                {mockGlasses.map((glass) => (
                    <li key={glass.id}>{glass.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default AdminPage;
