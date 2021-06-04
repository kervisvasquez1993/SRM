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

export function createProviderFromTask(taskId, provider) {
    return async (dispatch, getState) => {
        dispatch({ type: "CREATE_TASK_PROVIDER_REQUEST" });

        try {
            const response = await axios.post(
                `${apiURL}/tarea/${taskId}/proveedor`,
                provider
            );

            dispatch({
                type: "CREATE_TASK_PROVIDER_SUCCESS",
                payload: response.data.data
            });

            dispatch(closeModal());
        } catch (e) {
            dispatch({
                type: "CREATE_TASK_PROVIDER_FAILURE",
                error: e.response.data.error || null,
                errors: e.response.data
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
            dispatch({
                type: "CREATE_TASK_PROVIDER_FAILURE",
                error: e.response.data.error || null,
                errors: e.response.data
            });
        }
    };
}
