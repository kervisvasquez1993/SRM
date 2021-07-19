import React from "react";

const LoadingScreen = ({ children = null }) => {
    return (
        <div
            className="d-flex justify-content-center align-items-center h-100"
            style={{ minHeight: "200px" }}
        >
            {children}
            <div
                className="spinner-border"
                role="status"
                style={{ width: "5rem", height: "5rem" }}
            ></div>
        </div>
    );
};

export default LoadingScreen;
