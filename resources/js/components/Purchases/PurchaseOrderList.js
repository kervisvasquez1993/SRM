import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { openModal } from "../../store/actions/modalActions";
import { getPurchaseOrdersFromNegotiation } from "../../store/actions/purchaseOrderActions";
import { getSum, roundMoneyAmount, useSimpleScrollToId } from "../../utils";
import EmptyList from "../Navigation/EmptyList";
import LoadingScreen from "../Navigation/LoadingScreen";
// @ts-ignore
import LargeCreateButton from "../Widgets/LargeCreateButton";
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

const PurchaseOrderList = () => {
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
    const products = useSelector(state => state.product.products);
    // @ts-ignore
    const negotiation = useSelector(state => state.negotiation.negotiation);

    const dispatch = useDispatch();
    // @ts-ignore
    const { id: pivotId } = useParams();

    useEffect(() => {
        dispatch(getPurchaseOrdersFromNegotiation(pivotId));
    }, []);

    const isMine = user.id == negotiation.usuario.id;

    const titleRef = useSimpleScrollToId("#purchases");

    const handleCreate = () => {
        dispatch(
            openModal({
                title: "Agregar Orden de Compra",
                body: <CreatePurchaseOrderModal pivotId={pivotId} />
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

    if (isLoadingList) {
        return <LoadingScreen />;
    }

    return (
        <React.Fragment>
            {products.length > 0 && (
                <React.Fragment>
                    <div className="mr-auto text-center py-4" ref={titleRef}>
                        <h2>Orden de Compra</h2>
                    </div>

                    {purchaseOrders.length == 0 && <EmptyList />}

                    {purchaseOrders.length > 0 && (
                        <div className="row mb-4 mb-5">
                            <div className="table-responsive">
                                <table className="table table-sm table-hover table-bordered fade-in">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">Campo</th>
                                            <th scope="col">Valor</th>
                                            <th scope="col">Acción</th>
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
                                                                No hay registros
                                                                para mostrar
                                                            </div>
                                                        )}
                                                    </td>
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
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {isMine && (
                        <div className="text-center">
                            <button
                                className="btn btn-lg btn-success btn-round mb-4"
                                onClick={handleCreate}
                            >
                                <span className="material-icons mr-1">add</span>
                                Agregar Registro
                            </button>
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
                                                    getSum(
                                                        purchaseOrders,
                                                        "total"
                                                    )
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
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default PurchaseOrderList;
