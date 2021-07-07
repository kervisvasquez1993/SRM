import React from "react";
import { useDispatch } from "react-redux";
import {
    createProductClaim,
    editProductClaim
} from "../../../store/actions/claimActions";
import InputText from "../../Form/InputText";
import InputTextArea from "../../Form/InputTextarea";
import GenericFormModal from "../../Table/GenericFormModal";

const ProductClaimModal = ({ formData, isEditor = false, parentId = null }) => {
    const dispatch = useDispatch();

    const onSubmit = data => {
        if (isEditor) {
            dispatch(editProductClaim(data));
        } else {
            dispatch(createProductClaim(parentId, data));
        }
    };

    return (
        <GenericFormModal formData={formData} onSubmit={onSubmit}>
            <InputText id="titulo" label="Título" />
            <InputTextArea id="descripcion" label="Descripción" />
        </GenericFormModal>
    );
};

export default ProductClaimModal;
