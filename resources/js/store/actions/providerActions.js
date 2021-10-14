import axios from "axios";
import { toast } from "react-toastify";
import { apiURL } from "../../components/App";
import { focusOnElementWithId } from "./focusActions";
import { genericFormSubmit } from "./genericFormActions";
import { closeModal } from "./modalActions";

export function getSuppliers() {
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

export function createSupplierForTask(taskId, supplier) {
    return dispatch => {
        return genericFormSubmit(dispatch, () =>
            axios.post(`${apiURL}/tarea/${taskId}/proveedor`, supplier)
        ).then(response => {
            dispatch({
                type: "CREATE_TASK_PROVIDER_SUCCESS",
                payload: response
            });

            dispatch(closeModal());
            dispatch(focusOnElementWithId(response.id));
            toast.success("Empresa creada");
        });
    };
}

export function editProviderFromTask(taskId, supplier) {
    return dispatch => {
        return genericFormSubmit(dispatch, () =>
            axios.put(
                `${apiURL}/tarea/${taskId}/proveedor/${supplier.id}`,
                supplier
            )
        ).then(response => {
            dispatch({
                type: "EDIT_TASK_PROVIDER_SUCCESS",
                payload: response
            });

            dispatch(closeModal());
            dispatch(focusOnElementWithId(supplier.id));
            toast.success("Empresa editada");
        });
    };
}

export function updateSupplier(supplier) {
    return dispatch => {
        return genericFormSubmit(dispatch, () =>
            axios.put(`${apiURL}/proveedor/${supplier.id}`, supplier)
        ).then(response => {
            dispatch({
                type: "EDIT_SUPPLIER_SUCCESS",
                payload: response
            });

            dispatch(closeModal());
            dispatch(focusOnElementWithId(response.id));
            toast.success("Empresa editada");
        });
    };
}

export function createSupplier(supplier) {
    return dispatch => {
        return genericFormSubmit(dispatch, () =>
            axios.post(`${apiURL}/proveedor`, supplier)
        ).then(response => {
            dispatch({
                type: "CREATE_SUPPLIER_SUCCESS",
                payload: response
            });

            dispatch(closeModal());
            dispatch(focusOnElementWithId(response.id));
            toast.success("Empresa creada");
        });
    };
}

export function selectSupplierWithNegotiation(supplier) {
    return async (dispatch, getState) => {
        try {
            const negotiation = supplier.pivot;
            negotiation.seleccionado = true;

            await axios.put(
                `${apiURL}/negociacion/${negotiation.id}`,
                negotiation
            );

            dispatch({
                type: "SELECT_SUPPLIER_SUCCESS",
                payload: negotiation
            });

            dispatch(focusOnElementWithId(supplier.id));

            toast.success("Esta empresa fue seleccionada");
        } catch (e) {
            console.log(e.response);
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

//             toast.success("Negociación iniciada");
//         } catch (e) {
//             dispatch({
//                 type: "START_NEGOTIATION_FAILURE"
//             });
//         }
//     };
// }
