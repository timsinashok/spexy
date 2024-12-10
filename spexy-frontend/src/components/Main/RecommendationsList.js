import React, { useState } from "react";
import axios from "axios";

function Modal({ item, onClose }) {
    if (!item) return null;

    const modalStyles = {
        overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
        },
        modal: {
            background: "#fff",
            // borderRadius: "10px",
            padding: "20px",
            maxWidth: "600px",
            width: "90%",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
            textAlign: "center",
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            position: "relative",
            fontFamily: 'Verdana',
        },
        title: {
            flex: 1,
            textAlign: "center",
            margin: 0,
        },
        closeButton: {
            background: "#4B382A",
            color: "#fff",
            border: "10px",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            position: "absolute",
            right: 0,
        },
    };

    return (
        <div style={modalStyles.overlay}>
            <div style={modalStyles.modal}>
                <div style={modalStyles.header}>
                    <h2 style={modalStyles.title}>{item["Glass Name"]}</h2>
                    <button style={modalStyles.closeButton} onClick={onClose}>
                        ✕
                    </button>
                </div>
                <img src={item.image_url} alt={item["Glass Name"]} style={{ width: "100%", height: "auto", marginBottom: "10px" }} />
                <button
                    onClick={() => window.open(item.Link, "_blank")}
                    style={{
                        background: "#4B382A",
                        color: "#fff",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "15px",
                        cursor: "pointer",
                        marginTop: "15px",
                        fontSize: "16px",
                        fontFamily: 'Verdana',
                    }}
                >
                    View More Details 🔗
                </button>
            </div>
        </div>
    );
}

function RecommendationItem({ item, setImageUrl }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fetchedImage, setFetchedImage] = useState(null);

    // const backendUrl = 'http://127.0.0.1:9090'; 
    const backendUrl = process.env.BACKEND_URL;

    const handleTryClick = async (link) => {
        try {
            const response = await axios.get(
                `${backendUrl}/get_image/?glass_link=${encodeURIComponent(link)}`
            );
            if (response.status === 200) {
                setImageUrl(response.data.image_url); // Update imageUrl in MainPage
                console.log(response.data.image_url)
            } else {
                console.error("Failed to fetch image:", response.status);
            }
        } catch (error) {
            console.error("Error fetching image:", error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            {isModalOpen && (
                <Modal
                    item={{ ...item, image_url: fetchedImage || item.image_url }}
                    onClose={handleCloseModal}
                />
            )}

            <div
                style={{
                    ...styles.card,
                    ...(isHovered ? styles.hoverEffect : {}),
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setIsModalOpen(true)} // Open Modal on click
            >
                <img src={fetchedImage || item.image_url} alt={item["Glass Name"]} style={styles.image} />
                <h3 style={styles.name}>{item["Glass Name"]}</h3>
                <p style={styles.price}>${item.Price}</p>
                <div style={styles.colors}>
                    <span>Available Colors: </span>
                    {item.Colors.map((color, index) => (
                        <span key={index} style={styles.color}>
                            {color}
                            {index < item.Colors.length - 1 ? ", " : ""}
                        </span>
                    ))}
                </div>
                <a href={item.Link} target="_blank" rel="noopener noreferrer" style={styles.link}>
                    View Glass 🔗
                </a>
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent modal click
                        handleTryClick(item.Link);
                    }}
                    style={{
                        ...styles.button,
                        ...(isButtonHovered ? styles.buttonHover : {}),
                    }}
                    onMouseEnter={() => setIsButtonHovered(true)}
                    onMouseLeave={() => setIsButtonHovered(false)}
                >
                    Try
                </button>
            </div>
        </div>
    );
}

// Local styles for the RecommendationItem component
const styles = {
    card: {
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "16px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "300px",
        textAlign: "center",
        backgroundColor: "#f9f9f9",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        fontFamily: 'Verdana',
        cursor: "pointer",
    },
    hoverEffect: {
        transform: "scale(1.05)",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    },
    image: {
        width: "100%",
        height: "auto",
        borderRadius: "8px",
        marginBottom: "16px",
    },
    name: {
        fontSize: "1.2em",
        fontWeight: "bold",
        color: "#4B382A",
        margin: "8px 0",
    },
    price: {
        color: "#ff5722",
        fontSize: "1em",
        fontWeight: "bold",
        margin: "8px 0",
    },
    colors: {
        fontSize: "0.9em",
        color: "#555",
        margin: "8px 0",
    },
    color: {
        display: "inline",
    },
    link: {
        display: "inline-block",
        marginTop: "12px",
        fontSize: "0.9em",
        color: "#1e90ff",
        textDecoration: "none",
        marginRight: "12px",
    },
    button: {
        marginTop: "12px",
        padding: "5px 20px",
        fontSize: "1em",
        color: "#4B382A",
        backgroundColor: "transparent",
        borderRadius: "20px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    },
    buttonHover: {
        backgroundColor: "#4B382A",
        color: "white",
    },
};

export default RecommendationItem;
