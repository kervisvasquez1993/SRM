import React from "react";

const LoadingScreen = ({ children = null }) => {
    return (
        <div className="d-flex justify-content-center align-items-center h-100">
            {children}
            <div
                className="spinner-border"
                role="status"
                style={{ width: "5rem", height: "5rem" }}
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default LoadingScreen;
