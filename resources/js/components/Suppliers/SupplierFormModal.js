import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createSupplierForTask,
    createSupplier,
    editProviderFromTask,
    updateSupplier
} from "../../store/actions/providerActions";
import GenericForm from "../Form/GenericForm";
import InputText from "../Form/InputText";
import InputTextArea from "../Form/InputTextarea";
import GenericFormModal from "../Table/GenericFormModal";

export const emptyProvider = {
    nombre: null,
    pais: null,
    ciudad: null,
    distrito: null,
    descripcion: null,
    archivos_src: null,
    address: null,
    contacto: null,
    telefono: null,
    email: null
};

const SupplierFormModal = ({ provider, isEditor = false }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState({ ...provider });
    // @ts-ignore
    const task = useSelector(state => state.task.task);

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
            <InputText id="nombre" label="Nombre" value={data.nombre} />

            <InputText id="pais" label="País" value={data.pais} />

            <InputText id="ciudad" label="Ciudad" value={data.ciudad} />

            <InputText id="distrito" label="Distrito" value={data.distrito} />

            <InputTextArea
                id="descripcion"
                label="Descripcion"
                value={data.descripcion}
            />

            <InputText id="address" label="Dirección" value={data.address} />

            <InputText id="contacto" label="Contacto" value={data.contacto} />

            <InputText id="telefono" label="Teléfono" value={data.telefono} />

            <InputText id="email" label="Email" value={data.email} />
        </GenericFormModal>
    );
};

export default SupplierFormModal;
