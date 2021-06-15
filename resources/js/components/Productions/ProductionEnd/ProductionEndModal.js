import React from "react";
import { useDispatch } from "react-redux";
import {
    createProductionIncident,
    editProductionIncident
} from "../../../store/actions/productionActions";
import InputText from "../../Form/InputText";
import InputTextArea from "../../Form/InputTextarea";
import GenericFormModal from "../../Table/GenericFormModal";

const ProductionEndModal = ({ production, formData, isEditor }) => {
    const dispatch = useDispatch();

    const onSubmit = data => {
        if (isEditor) {
            dispatch(editProductionIncident("fin_produccion", production, data));
        } else {
            dispatch(createProductionIncident("fin_produccion", production, data));
        }
    };

    return (
        <GenericFormModal
            formData={formData}
            storeName="production"
            isEditor={isEditor}
            onSubmit={onSubmit}
        >
            <InputText id="titulo" label="Titulo" />
            <InputTextArea id="descripcion" label="Descripción" />
        </GenericFormModal>
    );
};

export default ProductionEndModal;
