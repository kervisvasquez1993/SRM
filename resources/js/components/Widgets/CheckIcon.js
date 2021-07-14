import React from "react";

const CheckIcon = ({ checked }) => {
    return (
        <React.Fragment>
            {checked ? (
                <span className="material-icons ml-2">done</span>
            ) : (
                <span className="material-icons" style={{ opacity: "0.3" }}>
                    close
                </span>
            )}
        </React.Fragment>
    );
};

export default CheckIcon;