import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { finishProductsConfirmationStage } from "../../../store/actions/negotiationActions";
import ProductsTable from "../../Products/ProductsTable";
import StageCompletedMessage from "./Other/StageCompletedMessage";
import OnlyBuyersAllowedMessage from "./Other/OnlyBuyersAllowedMessage";
import CompleteLastStageMessage from "./Other/CompleteLastStageMessage";
import NextStageButton from "./Other/NextStageButton";

const ProductsConfirmationTab = () => {
    const dispatch = useDispatch();

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
        return <OnlyBuyersAllowedMessage />;
    }

    if (!negotiation.productos_cargados) {
        return <CompleteLastStageMessage />;
    }

    return (
        <div className="d-flex flex-column align-items-center">
            <ProductsTable
                showCreateButton={true}
                allowEditing={true}
                allowDeletion={true}
                allowExcel={!negotiation.productos_confirmados}
                canAddSingleProduct={true}
            />

            <hr className="w-100" />

            {negotiation.productos_confirmados ? (
                <StageCompletedMessage />
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

                            <NextStageButton
                                disabled={!canContinue}
                                onClick={handleContinue}
                            />
                        </React.Fragment>
                    ) : (
                        <OnlyBuyersAllowedMessage />
                    )}
                </React.Fragment>
            )}
        </div>
    );
};

export default ProductsConfirmationTab;
