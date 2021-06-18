import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/actions/modalActions";
import EmptyList from "../Navigation/EmptyList";
import PoCodeModal from "./PoCodeModal";

const PoCode = ({ pivot }) => {
    const dispatch = useDispatch();
    const negotiation = useSelector(state => state.negotiation.negotiation);
    const purchaseOrders = useSelector(state => state.purchaseOrder.orders);
    const products = useSelector(state => state.product.products);
    const user = useSelector(state => state.auth.user);
    const isMine = user.id == negotiation.usuario.id;

    const handleCreate = () => {
        dispatch(
            openModal({
                title: "Agregar Orden de Compra",
                body: <PoCodeModal pivot={pivot} />
            })
        );
    };

    return (
        <React.Fragment>
            {purchaseOrders.length > 0 && products.length > 0 && (
                <React.Fragment>
                    <div className="mr-auto text-center py-4">
                        <div className="d-flex justify-content-center align-items-center flex-wrap">
                            <span className="h2 my-0">Código PO : </span>
                            {negotiation.compra_po ? (
                                <span className="h2 mx-4 font-weight-bold">
                                    {negotiation.compra_po}
                                </span>
                            ) : (
                                <EmptyList
                                    message="No se ha agregado un codigo PO"
                                    className="h4 no-result d-flex justify-content-center align-items-center my-0 mx-3"
                                />
                            )}
                        </div>
                        {isMine && (
                            <button
                                className="btn btn-lg btn-info btn-round"
                                onClick={handleCreate}
                            >
                                <span className="material-icons">
                                    {negotiation.compra_po ? "edit" : "add"}
                                </span>
                                {negotiation.compra_po ? "Editar" : "Agregar"}
                            </button>
                        )}
                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default PoCode;
