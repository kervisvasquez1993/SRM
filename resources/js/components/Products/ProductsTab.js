import React from "react";
import { BiLink } from "react-icons/bi";
import { Link } from "react-router-dom";
import EmptyList from "../Navigation/EmptyList";
import ProductsResume from "../Widgets/ProductsResume";

const ProductsTab = ({ negotiation }) => {
    return (
        <div className="my-3">
            {negotiation.cantidad_productos ? (
                <ProductsResume negotiation={[negotiation]} />
            ) : (
                <EmptyList message="No hay productos registrados" />
            )}
            <div className="text-center">
                <Link
                    to={`/negotiation/${negotiation.id}`}
                    className="btn btn-info btn-round"
                >
                    Ver Detalles
                    <BiLink className="icon-normal ml-2" />
                </Link>
            </div>
        </div>
    );
};

export default ProductsTab;
