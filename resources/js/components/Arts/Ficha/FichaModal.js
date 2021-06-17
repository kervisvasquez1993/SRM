import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createIncident,
    editIncident
} from "../../../store/actions/incidentActions";
import InputText from "../../Form/InputText";
import InputTextArea from "../../Form/InputTextarea";
import GenericFormModal from "../../Table/GenericFormModal";

const url1 = "arte";
const url2 = "ficha";

const FichaModal = ({ formData, isEditor }) => {
    const dispatch = useDispatch();
    const art = useSelector(state => state.art.current);

    const onSubmit = data => {
        if (isEditor) {
            dispatch(editIncident(url2, data));
        } else {
            dispatch(
                createIncident(url1, art.id, url2, data)
            );
        }
    };

    return (
        <GenericFormModal
            formData={formData}
            storeName="incident"
            isEditor={isEditor}
            onSubmit={onSubmit}
        >
            <InputText id="titulo" label="Titulo" />
            <InputTextArea id="descripcion" label="Descripción" />
        </GenericFormModal>
    );
};

export default FichaModal;
