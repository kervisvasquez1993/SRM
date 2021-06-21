import axios from "axios";
import { apiURL } from "../../components/App";

export function getClaims() {
    return async dispatch => {
        dispatch({ type: "GET_CLAIMS_REQUEST" });

        try {
            const response = await axios.get(`${apiURL}/reclamos_devoluciones`);

            dispatch({
                type: "GET_CLAIMS_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            dispatch({
                type: "GET_CLAIMS_FAILURE"
            });
        }
    };
}

export function getClaim(id) {
    return async dispatch => {
        dispatch({ type: "GET_CLAIM_REQUEST" });

        try {
            const response = await axios.get(`${apiURL}/reclamos_devoluciones/${id}`);

            dispatch({
                type: "GET_CLAIM_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            dispatch({
                type: "GET_CLAIM_FAILURE"
            });
        }
    };
}

export function updateClaim(data) {
    return async dispatch => {
        dispatch({ type: "UPDATE_CLAIM_REQUEST" });

        try {
            const response = await axios.put(
                `${apiURL}/reclamos_devoluciones/${data.id}`,
                data
            );

            dispatch({
                type: "UPDATE_CLAIM_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            dispatch({
                type: "UPDATE_CLAIM_FAILURE"
            });
        }
    };
}
