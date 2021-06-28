import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    createProviderFromTask,
    editProviderFromTask
} from "../../store/actions/providerActions";
import { extractError } from "../../utils";
import GenericForm from "../Form/GenericForm";
import InputText from "../Form/InputText";
import InputTextArea from "../Form/InputTextarea";

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

const ProviderFormModal = ({ provider, isEditor = false }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState({ ...provider });
    const taskId = useSelector(state => state.task.task).id;

    const isEditing = useSelector(state => state.provider.isEditing);
    const errors = useSelector(state => state.provider.errors);
    const error = useSelector(state => state.provider.error);

    const handleChange = e => {
        const { id, value } = e.target;

        setData(data => {
            return {
                ...data,
                [id]: value
            };
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (isEditor) {
            dispatch(editProviderFromTask(taskId, data));
        } else {
            dispatch(createProviderFromTask(taskId, data));
        }
    };

    const handleReset = e => {
        setData({ ...provider, ...emptyProvider });
    };

    return (
        <div className="modal-body">
            <GenericForm
                handleSubmit={handleSubmit}
                disableSubmit={isEditing}
                handleReset={handleReset}
                onChange={handleChange}
                errors={errors}
                setData={setData}
            >
                <InputText
                    id="nombre"
                    label="Nombre"
                    value={data.nombre}
                />

                <InputText
                    id="pais"
                    label="País"
                    value={data.pais}
                />

                <InputText
                    id="ciudad"
                    label="Ciudad"
                    value={data.ciudad}
                />

                <InputText
                    id="distrito"
                    label="Distrito"
                    value={data.distrito}
                />

                <InputTextArea
                    id="descripcion"
                    label="Descripcion"
                    value={data.descripcion}
                />

                <InputText
                    id="address"
                    label="Dirección"
                    value={data.address}
                />

                <InputText
                    id="contacto"
                    label="Contacto"
                    value={data.contacto}
                />

                <InputText
                    id="telefono"
                    label="Teléfono"
                    value={data.telefono}
                />

                <InputText
                    id="email"
                    label="Email"
                    value={data.email}
                />

                {error && (
                    <div className="text-danger">
                        <strong>{error}</strong>
                    </div>
                )}
            </GenericForm>
        </div>
    );
};

export default ProviderFormModal;
