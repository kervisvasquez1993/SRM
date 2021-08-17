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

export function editUser(data) {
    return dispatch => {
        return genericFormSubmit(dispatch, () =>
            axios.put(`${apiURL}/user/${data.id}`, data)
        ).then(response => {
            dispatch({
                type: "EDIT_USER_SUCCESS",
                payload: response
            });
        });
    };
}
