import React, { useState } from "react";

const LargeCreateButton = ({ onClick }) => {
    return (
        <div className="text-center">
            <button
                className="btn btn-lg btn-success btn-round mb-4"
                onClick={onClick}
            >
                <span className="material-icons">add</span>
                Agregar
            </button>
        </div>
    );
};

export default LargeCreateButton;
