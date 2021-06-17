import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createIncident, editIncident } from "../../store/actions/incidentActions";
import InputText from "../Form/InputText";
import InputTextArea from "../Form/InputTextarea";
import GenericFormModal from "../Table/GenericFormModal";

const IncidentModal = ({ stateName, url1, url2, formData, isEditor }) => {
    const dispatch = useDispatch();
    const art = useSelector(state => state[stateName].current);

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
            onSubmit={onSubmit}
        >
            <InputText id="titulo" label="Titulo" />
            <InputTextArea id="descripcion" label="Descripción" />
        </GenericFormModal>
    );
};

export default IncidentModal;
