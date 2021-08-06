import React from "react";
import { BiLink } from "react-icons/bi";
import { Link } from "react-router-dom";
import { blueCard, greenCard, normalCard, redCard } from "../../utils";
import ProviderStatus from "../Providers/ProviderStatus";

const SimpleProviderCard = ({ provider, taskId, selectedProvider }) => {
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
                    <ProviderStatus
                        provider={provider}
                        selectedProvider={selectedProvider}
                    />
                </div>
            </div>
        </Link>
    );
};

export default SimpleProviderCard;
