import React from "react";
import { useDispatch, useSelector } from "react-redux";
import StageCompletedMessage from "./Other/StageCompletedMessage";
import CompleteLastStageMessage from "./Other/CompleteLastStageMessage";
import OnlyLogisticsAllowedMessage from "./Other/OnlyLogisticsAllowedMessage";
import NextStageButton from "./Other/NextStageButton";
import ProductsTable from "../../Products/ProductsTable";
import { finishStage } from "../../../store/actions/negotiationActions";

const BarCodeTab = () => {
    const dispatch = useDispatch();

    // @ts-ignore
    const negotiation = useSelector(state => state.negotiation.negotiation);

    // @ts-ignore
    const user = useSelector(state => state.auth.user);

    if (!negotiation.seleccionado) {
        return <CompleteLastStageMessage />;
    }

    const handleContinue = () => {
        if (confirm("¿Está seguro?")) {
            dispatch(finishStage(negotiation, "codigo_barra_finalizado"));
        }
    };

    return (
        <div className="d-flex flex-column align-items-center">
            <ProductsTable
                showCreateButton={user.rol === "logistica"}
                allowEditing={true}
                allowExcel={true}
                canAddSingleProduct={false}
                editableOnlyByOwner={false}
                buyerColumns={false}
                logisticsColumns={true}
            />

            <hr className="w-100" />

            {negotiation.codigo_barra_finalizado ? (
                <StageCompletedMessage />
            ) : (
                <React.Fragment>
                    {user.rol === "logistica" ? (
                        <React.Fragment>
                            <p>
                                Utilize el siguiente botón para pasar a la
                                siguiente etapa:
                            </p>

                            <NextStageButton onClick={handleContinue} />
                        </React.Fragment>
                    ) : (
                        <OnlyLogisticsAllowedMessage />
                    )}
                </React.Fragment>
            )}
        </div>
    );
};

export default BarCodeTab;
