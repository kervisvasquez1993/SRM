import React from "react";

const FooterMessage = ({ children, background = "bg-danger" }) => {
    return (
        <div className={`modal-footer border-0 ${background}`}>
            <p className="d-flex text-white align-items-center h6">
                {children}
            </p>
        </div>
    );
};

export default FooterMessage;
