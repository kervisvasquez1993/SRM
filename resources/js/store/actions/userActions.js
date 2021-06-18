import axios from "axios";
import { apiURL } from "../../components/App";
import { genericFormSubmit } from "./genericFormActions";
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

export function createUser(data) {
    /*
    return async (dispatch, getState) => {
        dispatch({ type: "FORM_SUBMIT_REQUEST" });

        try {
            const response = await axios.post(`${apiURL}/user`, data);

            dispatch({
                type: "FORM_SUBMIT_SUCCESS",
                payload: response.data.data
            });

            dispatch({
                type: "CREATE_USER_SUCCESS",
                payload: response.data.data
            });

            dispatch(closeModal());
        } catch (e) {
            dispatch({
                type: "FORM_SUBMIT_FAILURE",
                errors: e.response.data
            });
        }
    };
    */
    return dispatch => {
        return genericFormSubmit(dispatch, () =>
            axios.post(`${apiURL}/user`, data)
        ).then(response => {
            dispatch({
                type: "CREATE_USER_SUCCESS",
                payload: response
            });
        });
    };
}
