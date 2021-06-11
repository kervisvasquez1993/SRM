import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/actions/modalActions";
import EmptyList from "../Navigation/EmptyList";
import PoCodeModal from "./PoCodeModal";

const PoCode = ({ pivot }) => {
    const dispatch = useDispatch();
    const negotiation = useSelector(state => state.negotiation.negotiation);
    const purchaseOrders = useSelector(state => state.purchaseOrder.orders);

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
            {purchaseOrders.length > 0 && (
                <React.Fragment>
                    <div className="mr-auto text-center py-4">
                        <h2 className="h2">Código PO</h2>
                    </div>

                    {negotiation.compra_po ? (
                        <h3 className="mr-auto text-center py-2">
                            {negotiation.compra_po}
                        </h3>
                    ) : (
                        <EmptyList message="No se ha agregado un codigo PO" />
                    )}

                    <div className="text-center">
                        <button
                            className="btn btn-lg btn-success btn-round mb-5"
                            onClick={handleCreate}
                        >
                            <span className="material-icons">
                                {negotiation.compra_po ? "edit" : "add"}
                            </span>
                            {negotiation.compra_po ? "Editar" : "Agregar"}
                        </button>
                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default PoCode;
