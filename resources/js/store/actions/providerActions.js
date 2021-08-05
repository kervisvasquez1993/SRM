import axios from "axios";
import { toast } from "react-toastify";
import { apiURL } from "../../components/App";
import { focusOnElementWithId } from "./focusActions";
import { closeModal } from "./modalActions";

export function getProviders() {
    return async (dispatch, getState) => {
        dispatch({ type: "GET_PROVIDERS_REQUEST" });

        try {
            const response = await axios.get(`${apiURL}/proveedor`);

            dispatch({
                type: "GET_PROVIDERS_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            dispatch({
                type: "GET_PROVIDERS_FAILURE"
            });
        }
    };
}

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

            dispatch(focusOnElementWithId(response.data.data.id));

            toast.success("✔️ Empresa creada");
        } catch (e) {
            dispatch({
                type: "CREATE_TASK_PROVIDER_FAILURE",
                error: e.response.data.error || null,
                errors: e.response.data
            });
        }
    };
}

export function editProviderFromTask(taskId, provider) {
    return async (dispatch, getState) => {
        dispatch({ type: "EDIT_PROVIDER_REQUEST" });

        try {
            const response = await axios.put(
                `${apiURL}/tarea/${taskId}/proveedor/${provider.id}`,
                provider
            );

            dispatch({
                type: "EDIT_PROVIDER_SUCCESS",
                payload: response.data.data
            });

            dispatch(closeModal());

            dispatch(focusOnElementWithId(provider.id));

            toast.success("✔️ Empresa editada");
        } catch (e) {
            dispatch({
                type: "CREATE_TASK_PROVIDER_FAILURE",
                error: e.response.data.error || null,
                errors: e.response.data
            });
        }
    };
}

// export function startNegotiation(taskId, providerId) {
//     return async (dispatch, getState) => {
//         dispatch({ type: "START_NEGOTIATION_REQUEST" });

//         try {
//             await axios.post(
//                 `${apiURL}/tarea/${taskId}/proveedor/${providerId}/negociar`
//             );

//             dispatch({
//                 type: "START_NEGOTIATION_SUCCESS",
//                 taskId,
//                 providerId
//             });

//             dispatch(focusOnElementWithId(providerId));

//             toast.success("✔️ Negociación iniciada");
//         } catch (e) {
//             dispatch({
//                 type: "START_NEGOTIATION_FAILURE"
//             });
//         }
//     };
// }

