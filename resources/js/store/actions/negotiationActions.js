import axios from "axios";
import { apiURL } from "../../components/App";
import { closeModal } from "./modalActions";

export function getNegotiations() {
    return async (dispatch, getState) => {
        dispatch({ type: "GET_NEGOTIATIONS_REQUEST" });

        try {
            const response = await axios.get(`${apiURL}/pivot`);

            dispatch({
                type: "GET_NEGOTIATIONS_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            dispatch({
                type: "GET_NEGOTIATIONS_FAILURE"
            });
        }
    };
}
