import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GlassesList() {
    const [glasses, setGlasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize the navigate function

    // Fetch glasses for the store "Eye Buy Direct"
    useEffect(() => {
        const fetchGlasses = async () => {
            try {
                const response = await axios.get("https://spexy-backend-159238452229.us-central1.run.app/stores/Eye%20Buy%20Direct/glasses");
                setGlasses(response.data); // Set fetched glasses data
                setLoading(false); // Stop loading state
            } catch (error) {
                console.error("Error fetching glasses:", error);
                setError("Failed to fetch glasses. Please try again.");
                setLoading(false);
            }
        };

        fetchGlasses();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated'); // Clear authentication flag
        navigate('/login', { replace: true }); // Redirect to login page
    };


    const handleDelete = async (glassId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this glass?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://127.0.0.1:8000/delete_glass/${glassId}`);
            alert("Glass deleted successfully!");
            // Refresh the list by removing the deleted item
            setGlasses((prevGlasses) => {
                const updatedGlasses = { ...prevGlasses };
                for (const shape in updatedGlasses) {
                    updatedGlasses[shape] = updatedGlasses[shape].filter((glass) => glass["_id"] !== glassId);
                }
                return updatedGlasses;
            });
        } catch (error) {
            console.error("Error deleting glass:", error);
            alert("Failed to delete glass. Please try again.");
        }
    };

    if (loading) {
        return <div>Loading glasses...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Flatten the data into a single array for grid display
    const glassesFlat = Object.values(glasses).flat();

    return (
        <div style={styles.container}>
            {/* Navbar */}
            <div style={styles.navbar}>
            <a href="/" style={{ textDecoration: 'none' }}>
                <img src="logo.png" alt="Spexy Logo" style={styles.navLeft} />
            </a>

            <a href="/admin" style={{ textDecoration: 'none' }}>
                <img src="https://mma.prnewswire.com/media/2385824/Eyebuydirect_Logo.jpg?p=facebook" alt="Eye Buy Direct Logo" style={styles.navRight} />
            </a>
            </div>

            {/* Main Content */}
            <h2 style={styles.title}> Your Inventory </h2>
            <div style={styles.gridContainer}>
                {glassesFlat.map((glass) => (
                    <div key={glass["_id"]} style={styles.card}>
                        <img
                            src={glass['image_url']}
                            alt={glass['Glass Name']}
                            style={styles.image}
                        />
                        <h3 style={styles.glassName}>{glass["Glass Name"]}</h3>
                        <p style={styles.price}>${glass.Price}</p>
                        <p style={styles.colors}>
                            Available Colors:{" "}
                            {Array.isArray(glass["Colors"])
                                ? glass["Colors"].join(", ")
                                : "N/A"}
                        </p>
                        <a href={glass.Link} target="_blank" rel="noopener noreferrer" style={styles.link}>
                            View the glass
                        </a>
                    </div>
                ))}
            </div>
            <button onClick={handleLogout}>Logout</button>
        </div>
        
    );
}

export default GlassesList;

const styles = {
    container: {
        padding: "20px",
        fontFamily: "Arial, sans-serif",
    },
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        padding: "10px 20px",
        borderRadius: "5px",
        marginBottom: "20px",
    },
    navLeft: {
        height: "50px",
    },
    navRight: {
        height: "50px",
    },
    title: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "20px",
        textAlign: "center",
    },
    gridContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)", // 4 columns
        gap: "20px",
    },
    card: {
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        textAlign: "center",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        position: "relative", // For delete button positioning
    },
    image: {
        width: "100%",
        height: "auto",
        marginBottom: "10px",
        borderRadius: "5px",
    },
    glassName: {
        fontSize: "18px",
        fontWeight: "bold",
        margin: "10px 0",
    },
    price: {
        fontSize: "16px",
        color: "#e74c3c",
        fontWeight: "bold",
    },
    colors: {
        fontSize: "14px",
        color: "#555",
    },
    link: {
        display: "block",
        margin: "10px 0",
        color: "#3498db",
        textDecoration: "none",
        fontWeight: "bold",
    },
    deleteButton: {
        position: "absolute",
        bottom: "10px", // Place at the bottom
        right: "10px", // Align to the right
        background: "#555", // Grayish background
        color: "#fff", // White cross
        border: "none",
        borderRadius: "50%", // Circle shape
        fontSize: "16px", // Larger cross
        fontWeight: "bold", // Bold text
        width: "30px", // Slightly larger circle
        height: "30px", // Slightly larger circle
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.3)", // Slightly stronger shadow
    },
    button: {
        padding: "10px 15px",
        backgroundColor: "#555", // Grayish background
        color: "#fff", // White text
        fontWeight: "bold", // Bold text
        fontSize: "16px", // Larger font
        border: "none",
        borderRadius: "5px", // Rounded button
        cursor: "pointer",
    },
};
