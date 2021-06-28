import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/actions/modalActions";
import { deletePurchaseOrder } from "../../store/actions/purchaseOrderActions";
import PurchaseOrderModal from "./PurchaseOrderModal";

const PurchaseOrder = ({ purchaseOrder }) => {
    const dispatch = useDispatch();
    const negotiation = useSelector(state => state.negotiation.negotiation);
    const user = useSelector(state => state.auth.user);

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

    const isMine = user.id == negotiation.usuario.id;

    const handleDelete = () => {
        dispatch(deletePurchaseOrder(purchaseOrder));
    };

    return (
        <tr>
            <td>{purchaseOrder.item}</td>
            <td>
                <div
                    className="rich-text"
                    dangerouslySetInnerHTML={{
                        __html: purchaseOrder.descripcion
                    }}
                ></div>
            </td>
            <td>{purchaseOrder.registro_salud}</td>
            <td>{purchaseOrder.cantidad_ctns}</td>
            <td>{purchaseOrder.price}</td>
            <td className="text-right">
                <div className="d-inline-flex align-items-center">
                    {purchaseOrder.total}
                    {isMine && (
                        <React.Fragment>
                            <button
                                className="btn btn-success btn-circle ml-3"
                                type="button"
                                onClick={handleEdit}
                            >
                                <span className="material-icons">edit</span>
                            </button>
                            <button
                                className="btn btn-danger btn-circle"
                                type="button"
                                onClick={handleDelete}
                            >
                                <span className="material-icons">clear</span>
                            </button>
                        </React.Fragment>
                    )}
                </div>
            </td>
        </tr>
    );
};

export default PurchaseOrder;
