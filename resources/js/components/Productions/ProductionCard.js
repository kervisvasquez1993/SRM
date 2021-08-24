import React from "react";
import { AiOutlineBarcode } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { GiSandsOfTime } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { StringParam, useQueryParam } from "use-query-params";
import { confirmDelete } from "../../appText";
import { openModal } from "../../store/actions/modalActions";
import { updateProduction } from "../../store/actions/productionActions";
import {
    dateToString,
    getNegotiationModalName,
    getPaymentsInfoFromProduction,
    useSimpleUrlFocus,
    useUser
} from "../../utils";
import NegotiationTabs from "../Negotiation/NegotiationTabs";
import DeliveryTimeFormModal from "./DeliveryTimeFormModal";
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
        label: "Salida Puerto Origen"
    },
    {
        value: "inicio_produccion",
        label: "Transito"
    },
    {
        value: "inicio_produccion",
        label: "Nacionalización"
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

    const handleEditDeliveryTime = e => {
        e.stopPropagation();

        dispatch(
            openModal({
                title: getNegotiationModalName(production.pivot),
                body: <DeliveryTimeFormModal formData={production} />
            })
        );
    };

    const {
        inicio_produccion,
        fin_produccion,
        salida_puero_origen,
        transito,
        nacionalizacion
    } = production;

    const handleCheck = e => {
        if (confirm(confirmDelete)) {
            const data = {
                ...production,
                [e.target.id]: !Boolean(production[e.target.id])
            };

            dispatch(updateProduction(data));
        }
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

    const disablePortDeparture =
        !inicio_produccion || !fin_produccion || transito;

    const disableTransit = !salida_puero_origen || nacionalizacion;
    const disableNationalisation = !transito;

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

            <div className="card-body py-0 my-0 ml-2 d-flex flex-wrap">
                <div className="flex-grow-1 mr-5">
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

                    <div className="form-check form-check p-1">
                        <label
                            className="form-check-label"
                            onClick={handleCheckClick}
                        >
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="transito"
                                onChange={handleCheck}
                                disabled={disableTransit}
                                checked={transito}
                            />
                            Transito
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
                                id="nacionalizacion"
                                onChange={handleCheck}
                                disabled={disableNationalisation}
                                checked={nacionalizacion}
                            />
                            Nacionalización
                            <span className="form-check-sign">
                                <span className="check"></span>
                            </span>
                        </label>
                    </div>
                </div>

                <div className="d-flex flex-wrap flex-column flex-grow-1 flex-md-grow-0 mt-3">
                    <div className="d-flex align-items-center mb-3">
                        {production.fecha_fin_produccion && (
                            <React.Fragment>
                                <BiTimeFive className="icon-normal mr-2" />
                                <span className="mr-2">
                                    <strong>
                                        Fecha de entrega (aproximada) :{" "}
                                    </strong>
                                    {dateToString(
                                        new Date(
                                            production.fecha_fin_produccion
                                        )
                                    )}
                                </span>
                                <button
                                    className="btn btn-success btn-circle btn-sm"
                                    type="button"
                                    onClick={handleEditDeliveryTime}
                                >
                                    <span className="material-icons">edit</span>
                                </button>
                            </React.Fragment>
                        )}
                    </div>
                    <button className="btn btn-success btn-round w-100">
                        Administrar
                    </button>

                    <button
                        className="btn btn-info btn-round w-100"
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
