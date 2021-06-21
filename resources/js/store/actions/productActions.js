import axios from "axios";
import { toast } from "react-toastify";
import { apiURL } from "../../components/App";
import { genericFormSubmit } from "./genericFormActions";
import { closeModal } from "./modalActions";

export function getProductsFromNegotiation(pivotId) {
    return async (dispatch, getState) => {
        dispatch({ type: "GET_PRODUCTS_REQUEST" });

        try {
            const response = await axios.get(
                `${apiURL}/negociacion/${pivotId}/productos`
            );

            dispatch({
                type: "GET_PRODUCTS_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            dispatch({
                type: "GET_PRODUCTS_FAILURE"
            });
        }
    };
}

export function createProductFromNegotiation(pivotId, data) {
    return dispatch => {
        return genericFormSubmit(dispatch, () =>
            axios.post(`${apiURL}/negociacion/${pivotId}/productos`, data)
        ).then(response => {
            dispatch({
                type: "CREATE_PRODUCT_SUCCESS",
                payload: response
            });

            toast.success("✔️ Producto creado");
        });
    };
}

export function editProduct(data) {
    return dispatch => {
        return genericFormSubmit(dispatch, () =>
            axios.put(`${apiURL}/productos/${data.id}`, data)
        ).then(response => {
            dispatch({
                type: "EDIT_PRODUCT_SUCCESS",
                payload: response
            });

            toast.success("✔️ Producto editado");
        });
    };
}

export function deleteProduct(data) {
    return async (dispatch, getState) => {
        try {
            await axios.delete(`${apiURL}/productos/${data.id}`);

            dispatch({
                type: "DELETE_PRODUCT_SUCCESS",
                payload: data
            });

            toast.success("✔️ Producto eliminado");
        } catch (e) {
            console.log(e);
        }
    };
}

export function uploadProductForNegotiation(pivotId, file) {
    return async dispatch => {
        dispatch({
            type: "UPLOADING_PRODUCT_REQUEST"
        });

        try {
            let formData = new FormData();
            formData.append("import", file);

            await axios.post(
                `${apiURL}/negociacion/${pivotId}}/importar-producto/`,
                formData
            );

            dispatch({
                type: "UPLOADING_PRODUCT_SUCCESS"
            });

            dispatch(closeModal());
            dispatch(getProductsFromNegotiation(pivotId));
            
            document
                .querySelector("#wrapper")
                .scrollTo(0, 10000000000000000000);

            toast.success("✔️ Productos importados");
        } catch (e) {
            console.log(e);
        }
    };
}
