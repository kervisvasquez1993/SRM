import React from "react";
import { useDispatch } from "react-redux";
import {
    createProductionIncident,
    editProductionIncident
} from "../../../store/actions/productionActions";
import InputText from "../../Form/InputText";
import InputTextArea from "../../Form/InputTextarea";
import GenericFormModal from "../../Table/GenericFormModal";

export const emptyIncident = {
    titulo: "",
    fecha: "",
    monto: "",
    url_archivo_factura: "#"
};

const ProductionStartIncidentModal = ({ production, formData, isEditor }) => {
    const dispatch = useDispatch();

    const onSubmit = data => {
        if (isEditor) {
            dispatch(editProductionIncident("inicio_produccion", production, data));
        } else {
            dispatch(createProductionIncident("inicio_produccion", production, data));
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

export default ProductionStartIncidentModal;
