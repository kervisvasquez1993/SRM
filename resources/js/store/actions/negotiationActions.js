import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { apiURL } from "../../components/App";
import NegotiationModal from "../../components/Negotiation/NegotiationModal";
import { focusOnElementWithId } from "./focusActions";
import { closeModal, openModal } from "./modalActions";

export function getNegotiations() {
    return async (dispatch, getState) => {
        dispatch({ type: "GET_NEGOTIATIONS_REQUEST" });

        try {
            const response = await axios.get(`${apiURL}/pivot`);

            dispatch({
                type: "GET_NEGOTIATIONS_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            dispatch({
                type: "GET_NEGOTIATIONS_FAILURE"
            });
        }
    };
}

export function getNegotiation(id) {
    return async (dispatch, getState) => {
        dispatch({ type: "GET_NEGOTIATION_REQUEST" });

        try {
            const response = await axios.get(`${apiURL}/pivot/${id}`);

            dispatch({
                type: "GET_NEGOTIATION_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            dispatch({
                type: "GET_NEGOTIATION_FAILURE"
            });
        }
    };
}

export function startProductionWithNegotiation(negotiationIndex) {
    return async (dispatch, getState) => {
        dispatch({ type: "START_PRODUCTION_REQUEST" });

        try {
            const response = await axios.put(
                `${apiURL}/negociacion/${negotiationIndex}/iniciar-produccion`
            );

            const negotiation = response.data.data;

            dispatch({
                type: "START_PRODUCTION_SUCCESS",
                payload: response.data.data
            });

            dispatch(
                openModal({
                    title: negotiation.nombre,
                    body: <NegotiationModal negotiation={negotiation} />
                })
            );

            toast.success("✔️ Producción iniciada");
        } catch (e) {
            console.log(e);
            dispatch({
                type: "START_PRODUCTION_FAILURE"
            });
        }
    };
}

export function startArtWithNegotiation(negotiationIndex) {
    return async (dispatch, getState) => {
        dispatch({ type: "START_ART_REQUEST" });

        try {
            const response = await axios.put(
                `${apiURL}/negociacion/${negotiationIndex}/iniciar-arte`
            );

            const negotiation = response.data.data;

            dispatch({
                type: "START_ART_SUCCESS",
                payload: negotiation
            });

            dispatch(
                openModal({
                    title: negotiation.nombre,
                    body: <NegotiationModal negotiation={negotiation} />
                })
            );

            toast.success("✔️ Arte iniciada");
        } catch (e) {
            dispatch({
                type: "START_ART_FAILURE"
            });
        }
    };
}

export function editPoCode(data) {
    return async (dispatch, getState) => {
        dispatch({ type: "EDIT_PO_CODE_REQUEST" });

        try {
            const response = await axios.put(
                `${apiURL}/pivot/${data.id}`,
                data
            );

            dispatch({
                type: "EDIT_PO_CODE_SUCCESS",
                payload: response.data.data
            });

            dispatch(closeModal());

            toast.success("✔️ Código PO editado");
        } catch (e) {
            dispatch({
                type: "EDIT_PO_CODE_FAILURE",
                errors: e.response.data
            });
        }
    };
}

export function createNegotiation(data) {
    return async (dispatch, getState) => {
        dispatch({ type: "CREATE_NEGOTIATION_REQUEST" });

        try {
            // Create the pivot
            const response = await axios.post(`${apiURL}/pivot`, data);

            // Get the provider resource
            const providerResponse = await axios.get(
                `${apiURL}/proveedor/${data.proveedor_id}/?tarea_id=${data.tarea_id}`
            );

            dispatch({
                type: "CREATE_NEGOTIATION_SUCCESS",
                payload: providerResponse.data.data
            });

            dispatch(focusOnElementWithId(providerResponse.data.data.id));

            dispatch(closeModal());

            toast.success("✔️ Empresa agregada");
        } catch (e) {
            console.log(e.response);
            dispatch({
                type: "CREATE_NEGOTIATION_FAILURE"
            });
        }
    };
}

export function getFiles(negotiationId, uploadedFile = null) {
    return async dispatch => {
        dispatch({ type: "GET_NEGOTIATION_FILES_REQUEST" });

        try {
            let response = await axios.get(
                `${apiURL}/negociacion/${negotiationId}/file`
            );

            if (uploadedFile) {
                dispatch({
                    type: "UPLOAD_NEGOTIATION_FILE_SUCCESS",
                    payload: uploadedFile
                });
            }

            dispatch({
                type: "GET_NEGOTIATION_FILES_SUCCESS",
                payload: response.data.data
            });

            
        } catch (e) {
            dispatch({
                type: "GET_NEGOTIATION_FILES_FAILURE"
            });
        }
    };
}

export function uploadFile(negotiationId, file) {
    return async dispatch => {
        dispatch({
            type: "UPLOAD_NEGOTIATION_FILE_REQUEST",
            payload: file.name
        });

        try {
            let formData = new FormData();
            formData.append("file", file);

            await axios.post(
                `${apiURL}/negociacion/${negotiationId}/file`,
                formData
            );

            dispatch(getFiles(negotiationId, file.name));

            toast.success("✔️ Archivo cargado");
        } catch (e) {
            toast.error(`🚨 ${e.response.data.error}`);
            console.log(e.response)

            dispatch({
                type: "UPLOAD_NEGOTIATION_FILE_FAILURE",
                payload: file.name
            });
        }
    };
}

export function deleteFile(id) {
    return async dispatch => {
        dispatch({ type: "DELETE_NEGOTIATION_FILE_REQUEST", payload: id });

        try {
            await axios.delete(`${apiURL}/file/${id}`);

            dispatch({
                type: "DELETE_NEGOTIATION_FILE_SUCCESS",
                payload: id
            });
        } catch (e) {
            toast.error("🚨 Error");

            dispatch({
                type: "DELETE_NEGOTIATION_FILE_FAILURE"
            });
        }
    };
}
