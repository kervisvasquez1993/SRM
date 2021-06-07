import axios from "axios";
import { apiURL } from "../../components/App";
import { closeModal } from "./modalActions";

export function getProductsFromNegotiation(pivotId) {
    return async (dispatch, getState) => {
        dispatch({ type: "GET_PRODUCTS_REQUEST" });

        try {
            const response = await axios.get(
                `${apiURL}/negociacion/${pivotId}/producto`
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
    return async (dispatch, getState) => {
        dispatch({ type: "CREATE_PRODUCT_REQUEST" });

        try {
            const response = await axios.post(
                `${apiURL}/negociacion/${pivotId}/producto`,
                data
            );

            dispatch({
                type: "CREATE_PRODUCT_SUCCESS",
                payload: response.data.data
            });

            dispatch(closeModal())
        } catch (e) {
            dispatch({
                type: "CREATE_PRODUCT_FAILURE",
                errors: e.response.data
            });
        }
    };
}
