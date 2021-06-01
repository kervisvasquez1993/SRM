import React, { useEffect, useState } from "react";

const LoadingScreen = () => {
    return (
        <div className="d-flex justify-content-center align-items-center h-100">
            <div className="spinner-border" role="status" style={{"width": "5rem", "height": "5rem"}}>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default LoadingScreen;
