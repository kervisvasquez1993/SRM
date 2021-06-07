import React from "react";

const EmptyList = () => {
    return (
        <div className="no-result d-flex justify-content-center align-items-center my-2">
            <span className="material-icons mr-2">search_off</span>
            No hay registros para mostrar.
        </div>
    );
};

export default EmptyList;
