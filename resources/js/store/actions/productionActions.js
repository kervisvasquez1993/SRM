import axios from "axios";
import { apiURL } from "../../components/App";

export function getProductions() {
    return async (dispatch, _getState) => {
        dispatch({ type: "GET_PRODUCTIONS_REQUEST" });

        try {
            const response = await axios.get(`${apiURL}/produccion_transito`);

            dispatch({
                type: "GET_PRODUCTIONS_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            dispatch({
                type: "GET_PRODUCTIONS_FAILURE"
            });
        }
    };
}

export function updateProduction(data) {
    return async (dispatch, _getState) => {
        dispatch({ type: "UPDATE_PRODUCTION_REQUEST" });

        try {
            const response = await axios.put(`${apiURL}/produccion_transito/${data.id}`, data);
            console.log(response.data.data)
            dispatch({
                type: "UPDATE_PRODUCTION_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            console.log(e)
            console.log(e.response)
            dispatch({
                type: "UPDATE_PRODUCTION_FAILURE"
            });
        }
    };
}

export function getPayments(productionId) {
    return async (dispatch, _getState) => {
        dispatch({ type: "GET_PAYMENTS_REQUEST" });

        try {
            const response = await axios.get(`${apiURL}/produccion_transito/${productionId}/pago`);
           
            dispatch({
                type: "GET_PAYMENTS_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            dispatch({
                type: "GET_PAYMENTS_FAILURE"
            });
        }
    };
}

export function createPayment(productionId, data) {
    return async (dispatch, _getState) => {
        dispatch({ type: "CREATE_PAYMENT_REQUEST" });

        try {
            const response = await axios.post(`${apiURL}/produccion_transito/${productionId}/pago`, data);
           
            dispatch({
                type: "CREATE_PAYMENT_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            console.log(e)
            console.log(e.response)
            dispatch({
                type: "CREATE_PAYMENT_FAILURE",
                errors: e.response.data
            });
        }
    };
}