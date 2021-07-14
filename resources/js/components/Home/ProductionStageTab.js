import React from "react";
import { BiLink } from "react-icons/bi";
import { Link } from "react-router-dom";
import EmptyList from "../Navigation/EmptyList";

const CheckIcon = ({ checked }) => {
    return (
        <React.Fragment>
            {checked ? (
                <span className="material-icons ml-2">done</span>
            ) : (
                <span className="material-icons" style={{ opacity: "0.3" }}>
                    close
                </span>
            )}
        </React.Fragment>
    );
};

const ProductionStageTab = ({ production }) => {
    return (
        <React.Fragment>
            <h3 className="text-center">Producción</h3>

            {production ? (
                <React.Fragment>
                    <ul className="list-group">
                        <li className="list-group-item d-flex align-items-center">
                            <strong>Inicio de Producción</strong>
                            <CheckIcon checked={production.inicio_produccion} />
                        </li>

                        <li className="list-group-item d-flex align-items-center">
                            <strong>Pago Anticipado</strong>
                            <CheckIcon checked={false} />
                        </li>

                        <li className="list-group-item d-flex align-items-center">
                            <strong>Pago Balance</strong>
                            <CheckIcon checked={false} />
                        </li>

                        <li className="list-group-item d-flex align-items-center">
                            <strong>Fin de Producción</strong>
                            <CheckIcon checked={production.fin_produccion} />
                        </li>

                        <li className="list-group-item d-flex align-items-center">
                            <strong>Transito Nacionalización</strong>
                            <CheckIcon
                                checked={production.transito_nacionalizacion}
                            />
                        </li>

                        <li className="list-group-item d-flex align-items-center">
                            <strong>Salida Puerto Origen</strong>
                            <CheckIcon
                                checked={production.salida_puero_origen}
                            />
                        </li>
                    </ul>

                    <div className="text-center my-3">
                        <Link
                            to={`/productions/?id=${production.id}`}
                            className="btn btn-info btn-round"
                        >
                            Ver Detalles
                            <BiLink className="icon-normal ml-2" />
                        </Link>
                    </div>
                </React.Fragment>
            ) : (
                <EmptyList message="No se ha iniciado arte" />
            )}
        </React.Fragment>
    );
};

export default ProductionStageTab;
