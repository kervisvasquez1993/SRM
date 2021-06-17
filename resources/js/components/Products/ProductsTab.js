import React from "react";
import { hasNoProducts } from "../../utils";
import EmptyList from "../Navigation/EmptyList";

const ProductsTab = ({ negotiation }) => {
    return (
        <React.Fragment>
            {hasNoProducts(negotiation) ? (
                <EmptyList message="No hay productos registrados" />
            ) : (
                <React.Fragment>
                    <p>
                        <strong>Total CBM : </strong>
                        {negotiation.total_cbm}
                    </p>
                    <p>
                        <strong>Total Peso Neto (kg) : </strong>
                        {negotiation.total_n_w}
                    </p>
                    <p>
                        <strong>Total Peso Bruto (kg): </strong>
                        {negotiation.total_g_w}
                    </p>
                    <p>
                        <strong>Total CTN : </strong>
                        {negotiation.total_ctn}
                    </p>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default ProductsTab;
