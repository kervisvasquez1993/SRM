import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { openModal } from "../../store/actions/modalActions";
import { getPurchaseOrdersFromNegotiation } from "../../store/actions/purchaseOrderActions";
import { getSum } from "../../utils";
import EmptyList from "../Navigation/EmptyList";
import LargeCreateButton from "../UI/LargeCreateButton";
import PurchaseOrder from "./PurchaseOrder";
import PurchaseOrderModal, { emptyPurchase } from "./PurchaseOrderModal";

const PurchaseOrderList = () => {
    const purchaseOrders = useSelector(state => state.purchaseOrder.orders);
    const user = useSelector(state => state.auth.user);
    const products = useSelector(state => state.product.products);
    const negotiation = useSelector(state => state.negotiation.negotiation);

    const dispatch = useDispatch();
    const { id: pivotId } = useParams();

    useEffect(() => {
        dispatch(getPurchaseOrdersFromNegotiation(pivotId));
    }, []);

    const isMine = user.id == negotiation.usuario.id;

    const handleCreate = () => {
        dispatch(
            openModal({
                title: "Agregar Orden de Compra",
                body: (
                    <PurchaseOrderModal
                        purchase={emptyPurchase}
                        pivotId={pivotId}
                    />
                )
            })
        );
    };

    return (
        <React.Fragment>
            {products.length > 0 && (
                <React.Fragment>
                    <div className="mr-auto text-center py-4">
                        <h1 className="h2">Ordenes de Compra</h1>
                    </div>

                    {purchaseOrders.length == 0 && <EmptyList />}

                    {isMine && <LargeCreateButton onClick={handleCreate} />}

                    {purchaseOrders.length > 0 && (
                        <div className="row mb-4">
                            <div className="table-responsive">
                                <table className="table table-sm table-hover table-bordered fade-in">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">Orden de Compra</th>
                                            <th scope="col">Item</th>
                                            <th scope="col">Registro Salud</th>
                                            <th scope="col">Cantidad PCS</th>
                                            <th scope="col">Descripción</th>
                                            <th scope="col">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {purchaseOrders.map(order => {
                                            return (
                                                <PurchaseOrder
                                                    purchaseOrder={order}
                                                    negotiation={negotiation}
                                                    key={order.id}
                                                />
                                            );
                                        })}
                                        <tr>
                                            <th scope="row" colSpan="5">
                                                Total
                                            </th>
                                            <td>
                                                {getSum(
                                                    purchaseOrders,
                                                    "total"
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default PurchaseOrderList;
