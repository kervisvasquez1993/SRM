import React from "react";

const PageLogo = () => {
    return (
        <React.Fragment>
            <div className="d-flex flex-column align-items-center logo-container p-3">
                <img
                    className="dynamics-logo"
                    alt="Logo de dynamics"
                    src="/images/logo.svg"
                />
            </div>
        </React.Fragment>
    );
};

export default PageLogo;
