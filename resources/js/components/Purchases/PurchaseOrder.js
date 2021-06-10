import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/actions/modalActions";
import { deletePurchaseOrder } from "../../store/actions/purchaseOrderActions";
import PurchaseOrderModal from "./PurchaseOrderModal";

const PurchaseOrder = ({ purchaseOrder }) => {
    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch(
            openModal({
                title: "Editar Orden de Compra",
                body: (
                    <PurchaseOrderModal
                        purchase={{ ...purchaseOrder }}
                        isEditor={true}
                    />
                )
            })
        );
    };

    const handleDelete = () => {
        dispatch(deletePurchaseOrder(purchaseOrder));
    };

    return (
        <tr>
            <td>{purchaseOrder.orden_compra}</td>
            <td>{purchaseOrder.item}</td>
            <td>{purchaseOrder.registro_salud}</td>
            <td>{purchaseOrder.cantidad_pcs}</td>
            <td>{purchaseOrder.descripcion}</td>
            <td>{purchaseOrder.total}</td>
            <td className="d-flex">
                <button
                    className="btn btn-success"
                    type="button"
                    onClick={handleEdit}
                >
                    <span className="material-icons">edit</span>
                    Editar
                </button>
                <button
                    className="btn btn-danger"
                    type="button"
                    onClick={handleDelete}
                >
                    <span className="material-icons">clear</span>
                    Eliminar
                </button>
            </td>
        </tr>
    );
};

export default PurchaseOrder;
