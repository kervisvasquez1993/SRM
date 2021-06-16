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

export function updateArt(data) {
    return async (dispatch, _getState) => {
        dispatch({ type: "EDIT_ARTS_REQUEST", editedCard: data.id });

        try {
            const response = await axios.put(
                `${apiURL}/artes/${data.id}`,
                data
            );

            dispatch({
                type: "EDIT_ARTS_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            dispatch({
                type: "EDIT_ARTS_FAILURE"
            });
        }
    };
}
