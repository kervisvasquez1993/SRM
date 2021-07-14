import React from "react";
import { BiLink } from "react-icons/bi";
import { Link } from "react-router-dom";
import EmptyList from "../../Navigation/EmptyList";
import CheckIcon from "../../Widgets/CheckIcon";

const ClaimStageTab = ({ claim }) => {
    return (
        <React.Fragment>
            <h3 className="text-center">Reclamos y Devoluciones</h3>

            <React.Fragment>
                <ul className="list-group">
                    <li className="list-group-item d-flex align-items-center">
                        <strong>Recepción de Mercancia</strong>
                        <CheckIcon checked={claim.recepcion_mercancia} />
                    </li>
                </ul>

                <ul className="list-group">
                    <li className="list-group-item d-flex align-items-center">
                        <strong>Inspección</strong>
                        <CheckIcon checked={claim.inspeccion_carga} />
                    </li>
                </ul>
                
                <ul className="list-group">
                    <li className="list-group-item d-flex align-items-center">
                        <strong>Reclamos y Devoluciones</strong>
                        <CheckIcon checked={claim.reclamos_devoluciones} />
                    </li>
                </ul>

                <div className="text-center my-3">
                    <Link
                        to={`/claims/?id=${claim.id}`}
                        className="btn btn-info btn-round"
                    >
                        Ver Detalles
                        <BiLink className="icon-normal ml-2" />
                    </Link>
                </div>
            </React.Fragment>
        </React.Fragment>
    );
};

export default ClaimStageTab;
