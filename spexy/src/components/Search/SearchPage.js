// src/components/Search/SearchPage.js
import React, { useState } from 'react';

function SearchPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        console.log('Searching for:', searchTerm);
    };

    return (
        <div>
            <h2>Search for Store</h2>
            <input
                type="text"
                placeholder="Search for store"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <button>I'm Feeling Lucky</button>
        </div>
    );
}

export default SearchPage;
