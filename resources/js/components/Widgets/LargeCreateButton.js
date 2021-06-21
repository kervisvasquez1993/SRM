import React, { useState } from "react";

const LargeCreateButton = ({ onClick, label = "Agregar" }) => {
    return (
        <div className="text-center">
            <button
                className="btn btn-lg btn-success btn-round mb-4"
                onClick={onClick}
            >
                <span className="material-icons mr-1">add</span>
                {label}
            </button>
        </div>
    );
};

export default LargeCreateButton;
