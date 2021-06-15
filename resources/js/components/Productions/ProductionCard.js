import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/actions/modalActions";
import { updateProduction } from "../../store/actions/productionActions";
import { getSum } from "../../utils";
import ProductionInfoModal from "./ProductionInfoModal";
import ProductionManagementModal from "./ProductionManagementModal";

const ProductionCard = ({ production }) => {
    const dispatch = useDispatch();

    const handleOpenInfo = e => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(
            openModal({
                title: proveedor.nombre,
                body: <ProductionInfoModal production={production} />
            })
        );
    };

    const handleOpenManagement = () => {
        dispatch(
            openModal({
                title: proveedor.nombre,
                body: <ProductionManagementModal production={production} />
            })
        );
    };

    const {
        pivot: { tarea, proveedor, compras_total: totalAmount },
        id,
        inicio_produccion,
        fin_produccion,
        transito_nacionalizacion,
        salida_puero_origen,
        pagos: payments
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

    const payedAmount = getSum(payments, "monto");
    const paidPercentage = (payedAmount / totalAmount) * 100;
    const prepaymentPercentage =
        payedAmount > 0 ? (payments[0].monto / totalAmount) * 100 : 0;

    const isPrepaymentDone = payments.length > 0;
    const isCompletelyPaid = paidPercentage >= 100;

    const disableProductionStarted = fin_produccion;
    const disableProductionFinished = !inicio_produccion || salida_puero_origen;
    const disablePortDeparture =
        !inicio_produccion ||
        !fin_produccion ||
        !transito_nacionalizacion ||
        !isPrepaymentDone ||
        !isCompletelyPaid;
    const disableTransit = salida_puero_origen;

    return (
        <div
            className={`card my-2 fade-in py-2`}
            onClick={handleOpenManagement}
            style={{ cursor: "pointer" }}
        >
            <div className="card-header ">
                <div className="row">
                    <div className="col-sm h4 d-flex mb-3">
                        <span className="material-icons mr-2">business</span>
                        Proveedor : <strong>{proveedor.nombre}</strong>
                    </div>
                    <div className="col-sm h4 d-flex">
                        <span className="material-icons mr-2">task</span>
                        Tarea : <strong>{tarea.nombre}</strong>
                    </div>
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
