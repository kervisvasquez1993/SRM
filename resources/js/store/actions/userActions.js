import axios from "axios";
import { apiURL } from "../../components/App";
import { closeModal } from "./modalActions";

export function getUsers() {
    return async (dispatch, getState) => {
        dispatch({ type: "GET_USERS_REQUEST" });

        try {
            const response = await axios.get(`${apiURL}/user`);

            dispatch({
                type: "GET_USERS_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            dispatch({
                type: "GET_USERS_FAILURE"
            });
        }
    };
}
