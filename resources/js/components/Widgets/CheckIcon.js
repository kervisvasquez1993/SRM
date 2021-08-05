import React from "react";

const CheckIcon = ({ checked, className="" }) => {
    return (
        <React.Fragment>
            {checked ? (
                <span className={`material-icons ${className}`}>done</span>
            ) : (
                <span className={`material-icons ${className}`} style={{ opacity: "0.2" }}>
                    close
                </span>
            )}
        </React.Fragment>
    );
};

export default CheckIcon;