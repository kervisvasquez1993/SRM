import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createIncident,
    editIncident
} from "../../store/actions/incidentActions";
import InputText from "../Form/InputText";
import InputTextArea from "../Form/InputTextarea";
import GenericFormModal from "../Table/GenericFormModal";

const IncidentModal = ({
    stateName,
    url1,
    url2,
    formData,
    isEditor,
    parentId = undefined
}) => {
    if (!parentId) {
        parent = useSelector(state => state[stateName].current);
    }

    const dispatch = useDispatch();

    const onSubmit = data => {
        if (isEditor) {
            dispatch(editIncident(url2, data));
        } else {
            dispatch(createIncident(url1, url2, parentId, data));
        }
    };

    return (
        <GenericFormModal formData={formData} onSubmit={onSubmit}>
            <InputText id="titulo" label="Titulo" />
            <InputTextArea id="descripcion" label="Descripción" />
        </GenericFormModal>
    );
};

export default IncidentModal;
