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

const ProviderModal = ({ provider, isEditor = false, taskId = null }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState({ ...provider });

    // @ts-ignore
    const isEditing = useSelector(state => state.provider.isEditing);
    // @ts-ignore
    const errors = useSelector(state => state.provider.errors);
    const nameError = extractError(errors, "nombre");
    const countryError = extractError(errors, "pais");
    const cityError = extractError(errors, "ciudad");
    const distritError = extractError(errors, "distrito");
    const descriptionError = extractError(errors, "descripcion");
    const addressError = extractError(errors, "address");
    const contactError = extractError(errors, "contacto");
    const phoneError = extractError(errors, "telefono");
    const emailError = extractError(errors, "email");
    // @ts-ignore
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
        setData({ ...emptyProvider });
    };

    return (
        <GenericForm
            handleSubmit={handleSubmit}
            disableSubmit={isEditing}
            handleReset={handleReset}
            onChange={handleChange}
        >
            <InputText
                id="nombre"
                label="Nombre"
                value={data.nombre}
                error={nameError}
            />

            <InputText
                id="pais"
                label="País"
                value={data.pais}
                error={countryError}
            />

            <InputText
                id="ciudad"
                label="Ciudad"
                value={data.ciudad}
                error={cityError}
            />

            <InputText
                id="distrito"
                label="Distrito"
                value={data.distrito}
                error={distritError}
            />

            <InputTextArea
                id="descripcion"
                label="Descripcion"
                value={data.descripcion}
                error={descriptionError}
            />

            <InputText
                id="address"
                label="Dirección"
                value={data.address}
                error={addressError}
            />

            <InputText
                id="contacto"
                label="Contacto"
                value={data.contacto}
                error={contactError}
            />

            <InputText
                id="telefono"
                label="Teléfono"
                value={data.telefono}
                error={phoneError}
            />

            <InputText
                id="email"
                label="Email"
                value={data.email}
                error={emailError}
            />

            {error && (
                <div className="text-danger">
                    <strong>{error}</strong>
                </div>
            )}
        </GenericForm>
    );
};

export default ProviderModal;
