import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { apiURL } from "../../components/App";
import NegotiationModal from "../../components/Negotiation/NegotiationModal";
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