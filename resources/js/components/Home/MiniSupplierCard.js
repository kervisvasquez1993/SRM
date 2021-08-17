import React from "react";
import { Link } from "react-router-dom";
import { greenCard, normalCard, redCard } from "../../utils";
import SupplierCardStatus from "../Suppliers/SupplierCardStatus";

const MiniSupplierCard = ({ provider, taskId, selectedProvider }) => {
    const isSelected = selectedProvider === provider;

    const { id, nombre, pivot } = provider;

    const { text, background } = isSelected
        ? greenCard
        : selectedProvider
        ? redCard
        : normalCard;

    const handleClick = () => {};

    return (
        <Link
            to={`/tasks/${taskId}?providerId=${id}`}
            style={{ cursor: "pointer" }}
            onClick={handleClick}
        >
            <div
                className={`card fade-in ${text} ${background} my-2 shadow-md`}
            >
                <div className="card-header">
                    <h3 className="card-title">{nombre}</h3>
                </div>

                <div className="card-body pt-0">
                    <SupplierCardStatus
                        provider={provider}
                        selectedProvider={selectedProvider}
                    />
                </div>
            </div>
        </Link>
    );
};

export default MiniSupplierCard;
