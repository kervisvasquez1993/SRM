import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { openModal } from "../../store/actions/modalActions";
import {
    deletePurchaseOrder,
    getPurchaseOrderFromNegotiation
} from "../../store/actions/purchaseOrderActions";
import EmptyList from "../Navigation/EmptyList";
import PurchaseOrderModal, { emptyPurchase } from "./PurchaseOrderModal";

const PurchaseOrder = () => {
    const purchaseOder = useSelector(state => state.purchaseOrder.order);
    const user = useSelector(state => state.auth.user);
    const products = useSelector(state => state.product.products);
    const dispatch = useDispatch();
    const { id: pivotId } = useParams();

    useEffect(() => {
        dispatch(getPurchaseOrderFromNegotiation(pivotId));
    }, []);

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

    const handleEdit = () => {
        dispatch(
            openModal({
                title: "Editar Orden de Compra",
                body: (
                    <PurchaseOrderModal
                        purchase={{ ...purchaseOder }}
                        isEditor={true}
                    />
                )
            })
        );
    };

    const handleDelete = () => {
        dispatch(deletePurchaseOrder(purchaseOder));
    };

    return (
        <React.Fragment>
            {products && products.length > 0 && (
                <React.Fragment>
                    <div className="mr-auto text-center py-4">
                        <h1 className="h2">Orden de Compra</h1>
                    </div>

                    {!purchaseOder && <EmptyList />}

                    <div className="mr-auto text-center">
                        {purchaseOder ? (
                            <div className="text-right">
                                <button
                                    className="btn btn btn-success btn-round"
                                    onClick={handleEdit}
                                >
                                    <span className="material-icons">edit</span>
                                    Editar
                                </button>
                                <button
                                    className="btn btn btn-danger btn-round"
                                    onClick={handleDelete}
                                >
                                    <span className="material-icons">
                                        clear
                                    </span>
                                    Eliminar
                                </button>
                            </div>
                        ) : (
                            <button
                                className="btn btn-lg btn-success btn-round mb-5"
                                onClick={handleCreate}
                            >
                                <span className="material-icons">add</span>
                                Agregar
                            </button>
                        )}
                    </div>

                    {purchaseOder && (
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
                                        <tr>
                                            <th scope="row">
                                                {purchaseOder.orden_compra}
                                            </th>
                                            <td>{purchaseOder.item}</td>
                                            <td>
                                                {purchaseOder.registro_salud}
                                            </td>
                                            <td>{purchaseOder.cantidad_pcs}</td>
                                            <td>{purchaseOder.descripcion}</td>
                                            <td>{purchaseOder.total}</td>
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

export default PurchaseOrder;
