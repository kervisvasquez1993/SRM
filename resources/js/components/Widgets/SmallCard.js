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
        <div className="d-flex mb-3 col-sm-6">
            <div className={`card-icon ${backgroundClass} ${iconColor} mr-2`}>
                {icon || <span className="material-icons">{materialIcon}</span>}
            </div>
            <div className="mb">
                <p className="card-text font-weight-bold m-0 h5">{children}</p>
                <p className="card-title">{label}</p>
            </div>
        </div>
    );
};

export default SmallCard;
