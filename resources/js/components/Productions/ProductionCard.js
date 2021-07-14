import React from "react";
import { AiOutlineBarcode } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { StringParam, useQueryParam } from "use-query-params";
import { openModal } from "../../store/actions/modalActions";
import { updateProduction } from "../../store/actions/productionActions";
import {
    getNegotiationModalName,
    getPaymentsInfoFromProduction,
    useSimpleUrlFocus,
    useUser
} from "../../utils";
import NegotiationTabs from "../Negotiation/NegotiationTabs";
import ProductionManagementModal from "./ProductionManagementModal";

export const categories = [
    {
        value: "inicio_produccion",
        label: "Inicio de Producción"
    },
    {
        value: "inicio_produccion",
        label: "Pago Anticipado"
    },
    {
        value: "inicio_produccion",
        label: "Pago Balance"
    },
    {
        value: "inicio_produccion",
        label: "Fin de Producción"
    },
    {
        value: "inicio_produccion",
        label: "Transito Nacionalización"
    },
    {
        value: "inicio_produccion",
        label: "Salida Puerto Origen"
    }
];

const ProductionCard = ({ production }) => {
    const dispatch = useDispatch();
    const user = useUser();
    const [tab] = useQueryParam("tab", StringParam);

    const [ref, focusClassName] = useSimpleUrlFocus(production.id, "id", () => {
        if (tab) {
            dispatch(
                openModal({
                    title: getNegotiationModalName(production.pivot),
                    body: (
                        <ProductionManagementModal
                            productionId={production.id}
                        />
                    ),
                    defaultTab: tab
                })
            );
        }
    });

    const handleOpenInfo = e => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(
            openModal({
                title: getNegotiationModalName(production.pivot),
                body: <NegotiationTabs negotiation={production.pivot} />
            })
        );
    };

    const handleOpenManagement = () => {
        dispatch(
            openModal({
                title: getNegotiationModalName(production.pivot),
                body: <ProductionManagementModal productionId={production.id} />
            })
        );
    };

    const {
        inicio_produccion,
        fin_produccion,
        transito_nacionalizacion,
        salida_puero_origen
    } = production;

    const handleCheck = e => {
        const data = {
            ...production,
            [e.target.id]: !Boolean(production[e.target.id])
        };

        dispatch(updateProduction(data));
    };

    const handleCheckClick = e => {
        e.stopPropagation();
    };

    const {
        paidPercentage,
        prepaymentPercentage,
        isPrepaymentDone,
        isCompletelyPaid
    } = getPaymentsInfoFromProduction(production);

    const disableProductionStarted =
        fin_produccion ||
        !(user.rol === "coordinador" || user.rol === "comprador");

    const disableProductionFinished =
        !inicio_produccion ||
        salida_puero_origen ||
        !(user.rol === "coordinador" || user.rol === "comprador");

    const disableTransit = salida_puero_origen || user.rol != "logistica";
    const disablePortDeparture =
        !inicio_produccion ||
        !fin_produccion ||
        !transito_nacionalizacion ||
        !isPrepaymentDone ||
        !isCompletelyPaid ||
        salida_puero_origen ||
        user.rol != "logistica";

    return (
        <div
            className={`card my-2 fade-in py-2 ${focusClassName}`}
            onClick={handleOpenManagement}
            style={{ cursor: "pointer" }}
            ref={ref}
        >
            <div className="card-header ml-2">
                <div className="col-sm h4 d-flex mb-3">
                    <AiOutlineBarcode className="icon-normal mr-2" />
                    <p className="mb-0">
                        Codigo : <strong>{production.pivot.compra_po}</strong>
                    </p>
                </div>
            </div>

            <div className="card-body py-0 my-0 ml-2">
                <div className="form-check form-check p-1">
                    <label
                        className="form-check-label"
                        onClick={handleCheckClick}
                    >
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="inicio_produccion"
                            onChange={handleCheck}
                            disabled={disableProductionStarted}
                            checked={inicio_produccion}
                        />
                        Inicio de Producción
                        <span className="form-check-sign">
                            <span className="check"></span>
                        </span>
                    </label>
                </div>

                <div className="form-check form-check p-1">
                    <label
                        className="form-check-label"
                        onClick={handleCheckClick}
                    >
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={isPrepaymentDone}
                            onChange={handleCheck}
                            disabled
                        />
                        Pago Anticipado
                        {prepaymentPercentage > 0
                            ? ` (${prepaymentPercentage}%)`
                            : ""}
                        <span className="form-check-sign">
                            <span className="check"></span>
                        </span>
                    </label>
                </div>

                <div className="form-check form-check p-1">
                    <label
                        className="form-check-label"
                        onClick={handleCheckClick}
                    >
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={isCompletelyPaid}
                            onChange={handleCheck}
                            disabled
                        />
                        Pago Balance
                        {paidPercentage > 0 ? ` (${paidPercentage}%)` : ""}
                        <span className="form-check-sign">
                            <span className="check"></span>
                        </span>
                    </label>
                </div>

                <div className="form-check form-check p-1">
                    <label
                        className="form-check-label"
                        onClick={handleCheckClick}
                    >
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="fin_produccion"
                            onChange={handleCheck}
                            disabled={disableProductionFinished}
                            checked={fin_produccion}
                        />
                        Fin de Producción
                        <span className="form-check-sign">
                            <span className="check"></span>
                        </span>
                    </label>
                </div>

                <div className="form-check form-check p-1">
                    <label
                        className="form-check-label"
                        onClick={handleCheckClick}
                    >
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="transito_nacionalizacion"
                            onChange={handleCheck}
                            disabled={disableTransit}
                            checked={transito_nacionalizacion}
                        />
                        Transito Nacionalización
                        <span className="form-check-sign">
                            <span className="check"></span>
                        </span>
                    </label>
                </div>

                <div className="form-check form-check p-1">
                    <label
                        className="form-check-label"
                        onClick={handleCheckClick}
                    >
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="salida_puero_origen"
                            onChange={handleCheck}
                            disabled={disablePortDeparture}
                            checked={salida_puero_origen}
                        />
                        Salida Puerto Origen
                        <span className="form-check-sign">
                            <span className="check"></span>
                        </span>
                    </label>
                </div>
            </div>

            <div className="card-footer">
                <div className="d-flex justify-content-end align-items-center w-100 flex-wrap">
                    <button className="btn btn-success btn-round">
                        Administrar
                    </button>
                    <button
                        className="btn btn-info btn-round"
                        onClick={handleOpenInfo}
                    >
                        Ver Información
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductionCard;
