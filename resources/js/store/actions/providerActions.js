import axios from "axios";
import { apiURL } from "../../components/App";
import { closeModal } from "./modalActions";

export function getProvidersFromTask(taskId) {
    return async (dispatch, getState) => {
        dispatch({ type: "GET_TASK_PROVIDERS_REQUEST" });

        try {
            const response = await axios.get(
                `${apiURL}/tarea/${taskId}/proveedor`
            );

            dispatch({
                type: "GET_TASKS_PROVIDERS_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            dispatch({
                type: "GET_TASKS_PROVIDERS_FAILURE"
            });
        }
    };
}

export function editProvider(provider) {
    return async (dispatch, getState) => {
        dispatch({ type: "EDIT_PROVIDER_REQUEST" });

        try {
            const response = await axios.put(
                `${apiURL}/proveedor/${provider.id}`,
                provider
            );

            dispatch({
                type: "EDIT_PROVIDER_SUCCESS",
                payload: response.data
            });

            dispatch(closeModal());
        } catch (e) {
            if ("errors" in e.response.data) {
                dispatch({
                    type: "EDIT_PROVIDER_FAILURE",
                    errors: e.response.data
                });
            } else {
                dispatch({
                    type: "EDIT_PROVIDER_FAILURE",
                    error: e.response.data.error
                });
            }
        }
    };
}
