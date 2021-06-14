import React from "react";

const EmptyList = ({
    message = "No hay registros para mostrar.",
    className = "no-result d-flex justify-content-center align-items-center my-2 mx-3"
}) => {
    return (
        <div className={className}>
            <span className="material-icons mr-2">search_off</span>
            {message}
        </div>
    );
};

export default EmptyList;
