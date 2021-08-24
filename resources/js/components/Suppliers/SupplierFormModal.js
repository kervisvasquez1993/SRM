import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createSupplierForTask,
    createSupplier,
    editProviderFromTask,
    updateSupplier
} from "../../store/actions/providerActions";
import InputText from "../Form/InputText";
import InputTextArea from "../Form/InputTextarea";
import GenericFormModal from "../Table/GenericFormModal";

const SupplierFormModal = ({ provider = {}, isEditor = false }) => {
    const dispatch = useDispatch();
    // @ts-ignore
    const task = useSelector(state => state.task.current);

    const handleSubmit = data => {
        if (isEditor) {
            if (task) {
                dispatch(editProviderFromTask(task.id, data));
            } else {
                dispatch(updateSupplier(data));
            }
        } else {
            if (task) {
                dispatch(createSupplierForTask(task.id, data));
            } else {
                dispatch(createSupplier(data));
            }
        }
    };

    return (
        <GenericFormModal formData={provider} onSubmit={handleSubmit}>
            <InputText id="nombre" label="Nombre" />
            <InputText id="pais" label="País" />
            <InputText id="ciudad" label="Ciudad" />
            <InputText id="distrito" label="Distrito" />
            <InputTextArea id="descripcion" label="Descripcion" />
            <InputText id="address" label="Dirección" />
            <InputText id="contacto" label="Contacto" />
            <InputText id="telefono" label="Teléfono" />
            <InputText id="email" label="Email" />
        </GenericFormModal>
    );
};

export default SupplierFormModal;
