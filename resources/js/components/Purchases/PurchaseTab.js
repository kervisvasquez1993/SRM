import React from "react";
import EmptyList from "../Navigation/EmptyList";

const PurchaseTab = ({ negotiation }) => {
    const { compras_total: totalPurchase, compra_po: poCode } = negotiation;

    return (
        <React.Fragment>
            {totalPurchase > 0 ? (
                <React.Fragment>
                    <p>
                        <strong>Total de Compra : </strong>
                        {totalPurchase}
                    </p>
                    <p className="d-flex">
                        <strong>Código PO : </strong>
                        {poCode || (
                            <span className="d-inline-flex ml-3">
                                <span className="material-icons mr-2">
                                    search_off
                                </span>
                                No se ha agregado
                            </span>
                        )}
                    </p>
                </React.Fragment>
            ) : (
                <EmptyList message="No se ha añadido una orden de compra" />
            )}
        </React.Fragment>
    );
};

export default PurchaseTab;
