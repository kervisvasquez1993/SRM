import axios from "axios";
import { apiURL } from "../../components/App";
import { closeModal } from "./modalActions";

export const emptyIncident = {
    titulo: "",
    fecha: "",
    monto: ""
};

export function getIncidents(url1, url2, parentId) {
    return async (dispatch, _getState) => {
        dispatch({ type: "GET_INCIDENTS_REQUEST" });

        try {
            const response = await axios.get(
                `${apiURL}/${url1}/${parentId}/${url2}`
            );

            dispatch({
                type: "GET_INCIDENTS_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            dispatch({
                type: "GET_INCIDENTS_FAILURE"
            });
        }
    };
}

export function createIncident(url1, parentId, url2, data) {
    return async (dispatch, _getState) => {
        dispatch({ type: "FORM_SUBMIT_REQUEST" });

        try {
            const response = await axios.post(
                `${apiURL}/${url1}/${parentId}/${url2}`,
                data
            );

            dispatch({
                type: "FORM_SUBMIT_SUCCESS",
                payload: response.data.data
            });

            dispatch(closeModal());
        } catch (e) {
            dispatch({
                type: "FORM_SUBMIT_FAILURE",
                errors: e.response.data
            });
        }
    };
}

export function editIncident(url, data) {
    return async (dispatch, _getState) => {
        dispatch({ type: "FORM_SUBMIT_REQUEST" });
        
        try {
            const response = await axios.put(
                `${apiURL}/${url}/${data.id}`,
                data
            );

            dispatch({
                type: "FORM_SUBMIT_SUCCESS",
                payload: response.data.data
            });

            dispatch(closeModal());
        } catch (e) {
            dispatch({
                type: "FORM_SUBMIT_FAILURE",
                errors: e.response.data
            });
        }
    };
}

export function deleteIncident(url, id) {
    return async (dispatch, _getState) => {
        try {
            const response = await axios.delete(`${apiURL}/${url}/${id}`);

            dispatch({
                type: "DELETE_INCIDENT_SUCCESS",
                payload: id
            });
        } catch (e) {}
    };
}