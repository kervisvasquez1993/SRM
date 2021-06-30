import React from "react";

const SmallCard = ({
    children,
    label,
    icon = null,
    materialIcon = "account_balance_wallet",
    backgroundClass = "bg-success",
    iconColor = "text-white"
}) => {
    return (
        <div className="d-flex align-items-center flex-column">
            <div className={`card-icon mb-1 ${backgroundClass} ${iconColor}`}>
                {icon || <span className="material-icons">{materialIcon}</span>}
            </div>
            <div className="d-flex flex-column align-items-center text-center text-sm-left">
                <p className="card-text font-weight-bold m-0 h5 text-center">{children}</p>
                <p className="card-title text-center m-0">{label}</p>
            </div>
        </div>
    );
};

export default SmallCard;
