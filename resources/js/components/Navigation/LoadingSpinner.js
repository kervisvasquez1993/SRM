import React, { useEffect, useState } from "react";

const LoadingSpinner = () => {
    return (
        <div className="spinner-border spinner-border-sm">
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default LoadingSpinner;
