import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import ProductsTable from "./ProductsTable";
import { finishProductsConfirmationStage } from "../../store/actions/negotiationActions";
import OnlyBuyerAllowedMessage from "../Negotiation/Other/OnlyBuyerMessage";

const ProductsConfirmationTab = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const { id } = useParams();

    // @ts-ignore
    const products = useSelector(state => state.product.products);
    // @ts-ignore
    const negotiation = useSelector(state => state.negotiation.negotiation);
    const canContinue = products.length > 0;

    // @ts-ignore
    const user = useSelector(state => state.auth.user);
    const isMine = user.id == negotiation.usuario.id;

    const handleContinue = () => {
        if (confirm("¿Está seguro?")) {
            dispatch(finishProductsConfirmationStage(negotiation));
        }
    };

    if (user.rol === "logistica") {
        return (
            <p className="text-center text-danger">
                Solo a los compradores les corresponde tener acceso a esta etapa
            </p>
        );
    }

    if (!negotiation.productos_cargados) {
        return (
            <p className="text-center text-danger">
                Complete la etapa anterior para entrar a esta
            </p>
        );
    }

    return (
        <div className="d-flex flex-column align-items-center">
            <ProductsTable
                showCreateButton={true}
                allowEditing={true}
                allowExcel={!negotiation.productos_confirmados}
                canAddSingleProduct={true}
            />

            <hr className="w-100" />

            {negotiation.productos_confirmados ? (
                <p>
                    <FaCheck className="mr-2 icon-normal" /> Etapa completada
                </p>
            ) : (
                <React.Fragment>
                    {isMine ? (
                        <React.Fragment>
                            <p>
                                Utilize el siguiente botón para pasar a la
                                siguiente etapa:{" "}
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
                    ) : (
                        <OnlyBuyerAllowedMessage />
                    )}
                </React.Fragment>
            )}
        </div>
    );
};

export default ProductsConfirmationTab;
