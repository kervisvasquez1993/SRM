import React from "react";
import { useDispatch } from "react-redux";
import {
    createProductionIncident,
    editProductionIncident
} from "../../../store/actions/productionActions";
import InputText from "../../Form/InputText";
import InputTextArea from "../../Form/InputTextarea";
import GenericFormModal from "../../Table/GenericFormModal";

const TransitModal = ({ production, formData, isEditor }) => {
    const dispatch = useDispatch();

    const onSubmit = data => {
        if (isEditor) {
            dispatch(editProductionIncident("incidencias_transito", production, data));
        } else {
            dispatch(createProductionIncident("incidencias_transito", production, data));
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

export default TransitModal;
