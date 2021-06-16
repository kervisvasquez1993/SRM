import axios from "axios";
import { apiURL } from "../../components/App";

export function getArts() {
    return async (dispatch, _getState) => {
        dispatch({ type: "GET_ARTS_REQUEST" });

        try {
            const response = await axios.get(`${apiURL}/artes`);

            dispatch({
                type: "GET_ARTS_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            dispatch({
                type: "GET_ARTS_FAILURE"
            });
        }
    };
}