import React from "react";
import { BiLink } from "react-icons/bi";
import { Link } from "react-router-dom";
import { blueCard, greenCard, normalCard, redCard } from "../../utils";

const SimpleProviderCard = ({
    provider,
    taskId,
    selectedProvider,
    showOnlySummary = false
}) => {
    const isSelected = selectedProvider === provider;

    const { id, nombre, pivot } = provider;

    const enNegociacion = pivot.iniciar_negociacion;

    const { text, background } = isSelected
        ? greenCard
        : selectedProvider
        ? redCard
        : enNegociacion
        ? blueCard
        : normalCard;

    const handleClick = () => {};

    return (
        <Link
            to={`/tasks/${taskId}?providerId=${id}`}
            style={{ cursor: "pointer" }}
            onClick={handleClick}
        >
            <div className={`card fade-in ${text} ${background} my-2 shadow-md`}>
                <div className="card-header">
                    <div className="d-flex justify-content-between w-100 flex-wrap">
                        <h3 className="card-title">{nombre}</h3>
                        <button className="btn btn-primary btn-round btn-sm">
                            Ver
                            <BiLink className="icon-normal ml-2" />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SimpleProviderCard;
