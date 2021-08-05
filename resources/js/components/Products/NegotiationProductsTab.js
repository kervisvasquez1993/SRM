import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/actions/modalActions";
import {
    deleteProduct,
    getProductsFromNegotiation
} from "../../store/actions/productActions";
import ProductFormModal from "./ProductFormModal";
import EmptyList from "../Navigation/EmptyList";
import { getSum, roundMoneyAmount, useSimpleScrollToId } from "../../utils";
import { useParams } from "react-router-dom";
import LargeCreateButton from "../Widgets/LargeCreateButton";
import CreateProductModal from "./CreateProductModal";
import ProductsResume from "../Widgets/ProductsResume";
import LoadingScreen from "../Navigation/LoadingScreen";
import { MdFileUpload } from "react-icons/md";
import { FaCheck, FaCheckDouble } from "react-icons/fa";
import ProductsTable from "./ProductsTable";
import { finishProductsStage } from "../../store/actions/negotiationActions";

const NegotiationProductsTab = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const { id } = useParams();

    // const titleRef = useSimpleScrollToId("#products");

    // const allowEditing = false;

    // @ts-ignore
    const products = useSelector(state => state.product.products);
    // @ts-ignore
    const negotiation = useSelector(state => state.negotiation.negotiation);
    const canContinue = products.length > 0;

    // @ts-ignore
    const user = useSelector(state => state.auth.user);

    const handleContinue = () => {
        if (confirm("¿Está seguro?")) {
            dispatch(finishProductsStage(negotiation));
        }
    };

    if (user.rol === "logistica") {
        return (
                 <p className="text-center text-danger">
                    Solo a los compradores les corresponde tener acceso a esta etapa
                </p>
        )
    }

    return (
        <div className="d-flex flex-column align-items-center">
            <ProductsTable />

            <hr className="w-100" />

            {negotiation.productos_cargados ? (
                <p>
                    <FaCheck className="mr-2 icon-normal" /> Etapa completada
                </p>
            ) : (
                <React.Fragment>
                    <p>
                        Utilize el siguiente botón para pasar a la siguiente
                        etapa:{" "}
                        {!canContinue && (
                            <span className="text-danger">
                                (Necesita cargar productos primero)
                            </span>
                        )}
                    </p>

                    <button
                        className="btn btn-info btn-lg"
                        disabled={!canContinue}
                        onClick={handleContinue}
                    >
                        <FaCheck className="mr-2 icon-normal" />
                        Completar
                    </button>
                </React.Fragment>
            )}
        </div>
    );
};

export default NegotiationProductsTab;
