import axios from "axios";
import { toast } from "react-toastify";
import { apiURL } from "../../components/App";
import { genericFormSubmit } from "./genericFormActions";
import { closeModal } from "./modalActions";

export function getPurchaseOrdersFromNegotiation(pivotId) {
    return async (dispatch, getState) => {
        dispatch({ type: "GET_PURCHASE_ORDERS_REQUEST" });

        try {
            const response = await axios.get(
                `${apiURL}/negociacion/${pivotId}/compra`
            );

            dispatch({
                type: "GET_PURCHASE_ORDERS_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            dispatch({
                type: "GET_PURCHASE_ORDERS_FAILURE"
            });
        }
    };
}

export function createPurchaseOrderFromNegotiation(pivotId, data) {
    return dispatch => {
        return genericFormSubmit(dispatch, () =>
            axios.post(`${apiURL}/negociacion/${pivotId}/compra`, data)
        ).then(response => {
            dispatch({
                type: "CREATE_PURCHASE_ORDER_SUCCESS",
                payload: response
            });

            dispatch(closeModal());

            toast.success("✔️ Orden de compra creada");
        });
    };
}

export function editPurchaseOrder(data) {
    return dispatch => {
        return genericFormSubmit(dispatch, () =>
            axios.put(`${apiURL}/compra/${data.id}`, data)
        ).then(response => {
            dispatch({
                type: "EDIT_PURCHASE_ORDER_SUCCESS",
                payload: response
            });

            dispatch(closeModal());

            toast.success("✔️ Orden de compra editada");
        });
    };
}

export function deletePurchaseOrder(data) {
    return async (dispatch, getState) => {
        dispatch({ type: "DELETE_PURCHASE_ORDER_REQUEST" });

        try {
            const response = await axios.delete(`${apiURL}/compra/${data.id}`);

            dispatch({
                type: "DELETE_PURCHASE_ORDER_SUCCESS",
                payload: response.data.data
            });

            toast.success("✔️ Orden de compra eliminada");
        } catch (e) {
            dispatch({
                type: "DELETE_PURCHASE_ORDER_FAILURE"
            });
        }
    };
}

export function uploadPurchaseOrders(pivotId, file) {
    return async dispatch => {
        dispatch({
            type: "UPLOAD_PURCHASE_ORDERS_REQUEST"
        });

        try {
            let formData = new FormData();
            formData.append("import_compra", file);

            await axios.post(
                `${apiURL}/negociaciones/${pivotId}/importCompra`,
                formData
            );

            dispatch({
                type: "UPLOAD_PURCHASE_ORDERS_SUCCESS"
            });

            dispatch(closeModal());
            dispatch(getPurchaseOrdersFromNegotiation(pivotId));

            toast.success("✔️ Ordenes importadas");
        } catch (e) {
            console.log(e);
        }
    };
}
