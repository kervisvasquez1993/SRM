import React from "react";
import { BiLink } from "react-icons/bi";
import { Link } from "react-router-dom";
import ProviderList from "./ProviderList";

const NegotiationStageTab = ({ taskId }) => {
    return (
        <React.Fragment>
            <h3 className="text-center">Empresas en Negociación</h3>

            <ProviderList taskId={taskId} filterProvidersInNegotiation />

            <div className="text-center my-3">
                <Link
                    to={`/tasks/${taskId}`}
                    className="btn btn-info btn-round"
                >
                    Ver Detalles
                    <BiLink className="icon-normal ml-2" />
                </Link>
            </div>
        </React.Fragment>
    );
};

export default NegotiationStageTab;
