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
    dateToShortString,
    dateToString,
    getNegotiationModalName,
    getPaymentInfoFromProduction,
    useSimpleUrlFocus,
    useUser
} from "../../utils";
import NegotiationTabs from "../Negotiation/NegotiationTabs";
import DeliveryTimeFormModal from "./DeliveryTimeFormModal";
import ProductionDateFormModal from "./ProductionDateFormModal";
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

const StateCheckbox = ({
    id,
    label,
    checkHandler,
    disabled,
    checked,
    date = undefined,
    date_id = undefined,
    production = undefined
}) => {
    const dispatch = useDispatch();
    const stopPropagation = e => {
        e.stopPropagation();
    };

    const handleEditDate = e => {
        e.stopPropagation();

        dispatch(
            openModal({
                title: label,
                body: (
                    <ProductionDateFormModal
                        label={label}
                        id={date_id}
                        production={production}
                    />
                )
            })
        );
    };

    return (
        <>
            <div className="form-check form-check p-1 mr-2">
                <label className="form-check-label" onClick={stopPropagation}>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id={id}
                        onChange={checkHandler}
                        disabled={disabled}
                        checked={checked}
                    />
                    {label}
                    <span className="form-check-sign">
                        <span className="check"></span>
                    </span>
                </label>
            </div>

            {(date && checked && (
                <div className="d-flex align-items-center">
                    <span className="mr-2">
                        {dateToShortString(new Date(date))}
                    </span>
                    <button
                        className="btn btn-success btn-circle btn-sm"
                        type="button"
                        onClick={handleEditDate}
                    >
                        <span className="material-icons">edit</span>
                    </button>
                </div>
            )) || <div></div>}
        </>
    );
};

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
                body: (
                    <ProductionDateFormModal
                        production={production}
                        id="fecha_entrega_aproximada"
                        label="Fecha de entrega (aproximada)"
                    />
                )
            })
        );
    };

    const {
        inicio_produccion,
        fin_produccion,
        salida_puerto_origen,
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
        remainingPercentage,
        prepaymentPercentage,
        isPrepaymentDone,
        isCompletelyPaid
    } = getPaymentInfoFromProduction(production);

    const disableProductionStarted =
        fin_produccion ||
        !(user.rol === "coordinador" || user.rol === "comprador");

    const disableProductionFinished =
        !inicio_produccion ||
        salida_puerto_origen ||
        !(user.rol === "coordinador" || user.rol === "comprador");

    const disablePortDeparture =
        !inicio_produccion || !fin_produccion || transito;

    const disableTransit = !salida_puerto_origen || nacionalizacion;
    const disableNationalisation = !transito;

    return (
        <div
            className={`card my-2 fade-in py-2 ${focusClassName}`}
            onClick={handleOpenManagement}
            style={{ cursor: "pointer" }}
            ref={ref}
        >
            <div className="card-header ml-2">
                <div className="col-sm h4 d-flex mb-2">
                    <AiOutlineBarcode className="icon-normal mr-2" />
                    <p className="mb-0">
                        Codigo : <strong>{production.pivot.compra_po}</strong>
                    </p>
                </div>
            </div>

            <div className="card-body pt-0 d-flex flex-column">
                {/* <div className="flex-grow-1 mr-5"> */}
                <div className="production-checkboxes">
                    <StateCheckbox
                        id="inicio_produccion"
                        checked={inicio_produccion}
                        disabled={disableProductionStarted}
                        checkHandler={handleCheck}
                        date_id="inicio_produccion_fecha"
                        date={production.inicio_produccion_fecha}
                        label="Inicio de Producción"
                        production={production}
                    />

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
                            {` (${prepaymentPercentage}%)`}
                            <span className="form-check-sign">
                                <span className="check"></span>
                            </span>
                        </label>
                    </div>

                    <div></div>

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
                            {` (${remainingPercentage}%)`}
                            <span className="form-check-sign">
                                <span className="check"></span>
                            </span>
                        </label>
                    </div>

                    <div></div>

                    <StateCheckbox
                        id="fin_produccion"
                        checked={fin_produccion}
                        disabled={disableProductionFinished}
                        checkHandler={handleCheck}
                        date_id="fin_produccion_fecha"
                        date={production.fin_produccion_fecha}
                        label="Fin de Producción"
                        production={production}
                    />

                    <StateCheckbox
                        id="salida_puerto_origen"
                        checked={salida_puerto_origen}
                        disabled={disablePortDeparture}
                        checkHandler={handleCheck}
                        date_id="salida_puerto_origen_fecha"
                        date={production.salida_puerto_origen_fecha}
                        label="Salida Puerto Origen"
                        production={production}
                    />

                    <StateCheckbox
                        id="transito"
                        checked={transito}
                        disabled={disableTransit}
                        checkHandler={handleCheck}
                        date_id="transito_fecha"
                        date={production.transito_fecha}
                        label="Tránsito"
                        production={production}
                    />

                    <StateCheckbox
                        id="nacionalizacion"
                        checked={nacionalizacion}
                        disabled={disableNationalisation}
                        checkHandler={handleCheck}
                        date_id="nacionalizacion_fecha"
                        date={production.nacionalizacion_fecha}
                        label="Nacionalización"
                        production={production}
                    />
                </div>

                <div className="d-flex flex-wrap justify-content-end flex-column mt-3 flex-grow-1">
                    <div className="d-flex align-items-center justify-content-center mb-3">
                        {production.fecha_entrega_aproximada && (
                            <React.Fragment>
                                <BiTimeFive className="icon-normal mr-2" />
                                <span className="mr-2">
                                    <strong>
                                        Fecha de entrega (aproximada)
                                    </strong>
                                    <div>
                                        {dateToString(
                                            new Date(
                                                production.fecha_entrega_aproximada
                                            )
                                        )}
                                    </div>
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

                    <button className="btn btn-success btn-round">
                        Administrar
                    </button>

                    <button
                        className="btn btn-outline-info btn-round"
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
