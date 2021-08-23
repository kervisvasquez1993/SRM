import React from "react";
import { MdClose, MdDone } from "react-icons/md";

const CheckIcon = ({ checked, className = "" }) => {
    return (
        <React.Fragment>
            {checked ? (
                <MdDone className={`icon-normal ${className}`} />
            ) : (
                <MdClose
                    className={`icon-normal ${className}`}
                    style={{ opacity: "0.2" }}
                />
            )}
        </React.Fragment>
    );
};

export default CheckIcon;
