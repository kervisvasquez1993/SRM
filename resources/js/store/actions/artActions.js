import axios from "axios";
import React from "react";
import { apiURL } from "../../components/App";
import ArtModal from "../../components/Arts/ArtModal";
import { openModal } from "./modalActions";

export function getArts() {
    return async (dispatch, _getState) => {
        dispatch({ type: "GET_ARTS_REQUEST" });

        try {
            const response = await axios.get(`${apiURL}/artes`);

            dispatch({
                type: "GET_ARTS_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            dispatch({
                type: "GET_ARTS_FAILURE"
            });
        }
    };
}

export function getArt(id) {
    return async (dispatch, _getState) => {
        dispatch({ type: "GET_ART_REQUEST" });

        try {
            const response = await axios.get(`${apiURL}/artes/${id}`);

            dispatch({
                type: "GET_ART_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            dispatch({
                type: "GET_ART_FAILURE"
            });
        }
    };
}

export function updateArt(data) {
    return async (dispatch, _getState) => {
        dispatch({ type: "EDIT_ARTS_REQUEST", editedCard: data.id });

        try {
            const response = await axios.put(
                `${apiURL}/artes/${data.id}`,
                data
            );

            dispatch({
                type: "EDIT_ARTS_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            dispatch({
                type: "EDIT_ARTS_FAILURE"
            });
        }
    };
}

export function openArtModal(id, defaultTab = "ficha") {
    return async (dispatch, _getState) => {
        console.log(defaultTab)
        dispatch(
            openModal({
                title: "Hola",
                body: <ArtModal id={id} defaultTab={defaultTab} />
            })
        );
    };
}
