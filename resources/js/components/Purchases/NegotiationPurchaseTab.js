import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/actions/modalActions";
import { finishStage } from "../../store/actions/negotiationActions";
import { getPurchaseOrdersFromNegotiation } from "../../store/actions/purchaseOrderActions";
import { getSum, roundMoneyAmount } from "../../utils";
import EmptyList from "../Navigation/EmptyList";
import LoadingScreen from "../Navigation/LoadingScreen";
import NextStageButton from "../Negotiation/Details/Other/NextStageButton";
import OnlyBuyersAllowedMessage from "../Negotiation/Details/Other/OnlyBuyersAllowedMessage";
import StageCompletedMessage from "../Negotiation/Details/Other/StageCompletedMessage";
import PurchaseOrdersResume from "../Widgets/PurchaseOrdersResume";
import CreatePurchaseOrderModal from "./CreatePurchaseOrderModal";
import PoCodeModal from "./PoCodeModal";
import PurchaseOrder from "./PurchaseOrder";

const campos = [
    { name: "compra_po", label: "Código PO" },
    { name: "payment_terms", label: "Términos de Pago" },
    { name: "hs_code", label: "Código HS" },
    { name: "incoterms", label: "Incoterms" },
    { name: "delivery_time", label: "Tiempo de Entrega" }
];

const NegotiationPurchaseTab = () => {
    // @ts-ignore
    const purchaseOrders = useSelector(state => state.purchaseOrder.orders);
    // @ts-ignore
    const isLoadingList = useSelector(
        // @ts-ignore
        state => state.purchaseOrder.isLoadingList
    );

    // @ts-ignore
    const user = useSelector(state => state.auth.user);
    // @ts-ignore
    const negotiation = useSelector(state => state.negotiation.negotiation);

    const dispatch = useDispatch();

    const canContinue = purchaseOrders.length > 0 && negotiation.compra_po;

    useEffect(() => {
        dispatch(getPurchaseOrdersFromNegotiation(negotiation.id));
    }, []);

    const isMine = user.id == negotiation.usuario.id;

    const handleContinue = () => {
        if (confirm("¿Está seguro?")) {
            dispatch(finishStage(negotiation, "orden_compra"));
        }
    };

    const handleCreate = () => {
        dispatch(
            openModal({
                title: "Agregar Orden de Compra",
                body: <CreatePurchaseOrderModal pivotId={negotiation.id} />
            })
        );
    };

    const handleEdit = () => {
        dispatch(
            openModal({
                title: "Agregar Orden de Compra",
                body: <PoCodeModal formData={negotiation} />
            })
        );
    };

    if (user.rol === "logistica") {
        return <OnlyBuyersAllowedMessage />;
    }

    if (isLoadingList) {
        return <LoadingScreen />;
    }

    return (
        <div className="d-flex flex-column align-items-center">
            {purchaseOrders.length == 0 && <EmptyList />}

            {isMine && (
                <button
                    className="btn btn-lg btn-success btn-round mb-4"
                    onClick={handleCreate}
                >
                    <span className="material-icons mr-1">add</span>
                    Agregar Registro
                </button>
            )}

            {purchaseOrders.length > 0 && (
                <div className="row mb-4 mb-5">
                    <div className="table-responsive">
                        <table className="table table-sm table-hover table-bordered fade-in">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Campo</th>
                                    <th scope="col">Valor</th>
                                    {isMine && <th scope="col">Acción</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {campos.map(item => {
                                    const { name, label } = item;
                                    return (
                                        <tr key={name}>
                                            <th scope="row">{label}</th>
                                            <td>
                                                {negotiation[name] || (
                                                    <div className="no-result d-flex align-items-center">
                                                        <span className="material-icons mr-2">
                                                            search_off
                                                        </span>
                                                        No hay registros para
                                                        mostrar
                                                    </div>
                                                )}
                                            </td>
                                            {isMine && (
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-success btn-circle ml-3"
                                                        type="button"
                                                        onClick={handleEdit}
                                                    >
                                                        <span className="material-icons">
                                                            edit
                                                        </span>
                                                    </button>
                                                </td>
                                            )}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {purchaseOrders.length > 0 && (
                <div className="row mb-4">
                    <div className="table-responsive">
                        <table className="table table-sm table-hover table-bordered fade-in">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Item</th>
                                    <th scope="col">Descripción</th>
                                    <th scope="col">Registro Salud</th>
                                    <th scope="col">Cantidad (CTNS)</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {purchaseOrders.map(order => {
                                    return (
                                        <PurchaseOrder
                                            purchaseOrder={order}
                                            key={order.id}
                                        />
                                    );
                                })}
                                <tr>
                                    <th scope="row" colSpan={5}>
                                        Total
                                    </th>
                                    <td>
                                        {roundMoneyAmount(
                                            getSum(purchaseOrders, "total")
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {purchaseOrders.length > 0 && (
                <React.Fragment>
                    <PurchaseOrdersResume
                        compras_total={getSum(purchaseOrders, "total")}
                    />
                </React.Fragment>
            )}

            <hr className="w-100" />

            {negotiation.orden_compra ? (
                <StageCompletedMessage />
            ) : (
                <React.Fragment>
                    {user.rol === "comprador" ? (
                        <React.Fragment>
                            <p>
                                Utilize el siguiente botón para pasar a la
                                siguiente etapa:{" "}
                                {!canContinue && (
                                    <span className="text-danger">
                                        (Se necesitan agregar ordenes de compra
                                        y un codigo PO)
                                    </span>
                                )}
                            </p>

                            <NextStageButton
                                onClick={handleContinue}
                                disabled={!canContinue}
                            />
                        </React.Fragment>
                    ) : (
                        <OnlyBuyersAllowedMessage />
                    )}
                </React.Fragment>
            )}
        </div>
    );
};

export default NegotiationPurchaseTab;
