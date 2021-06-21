import axios from "axios";
import { toast } from "react-toastify";
import { apiURL } from "../../components/App";
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
    return async (dispatch, getState) => {
        dispatch({ type: "CREATE_PURCHASE_ORDER_REQUEST" });

        try {
            const response = await axios.post(
                `${apiURL}/negociacion/${pivotId}/compra`,
                data
            );

            dispatch({
                type: "CREATE_PURCHASE_ORDER_SUCCESS",
                payload: response.data.data
            });

            dispatch(closeModal());

            toast.success("✔️ Orden de compra creada");
        } catch (e) {
            dispatch({
                type: "CREATE_PURCHASE_ORDER_FAILURE",
                errors: e.response.data
            });
        }
    };
}

export function editPurchaseOrder(data) {
    return async (dispatch, getState) => {
        dispatch({ type: "EDIT_PURCHASE_ORDER_REQUEST" });

        try {
            const response = await axios.put(
                `${apiURL}/compra/${data.id}`,
                data
            );

            dispatch({
                type: "EDIT_PURCHASE_ORDER_SUCCESS",
                payload: response.data.data
            });

            dispatch(closeModal());

            toast.success("✔️ Orden de compra editada");
        } catch (e) {
            dispatch({
                type: "EDIT_PURCHASE_ORDER_FAILURE",
                errors: e.response.data
            });
        }
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
            formData.append("import", file);

            await axios.post(
                `${apiURL}/negociacion/${pivotId}}/importar-producto/`,
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
