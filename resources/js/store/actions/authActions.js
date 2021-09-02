import axios from "axios";
import { apiURL } from "../../components/App";
import {
    removeTokenFromServer,
    sendTokenToServer
} from "../../components/FirebaseSetup";
import { registerEcho, unregisterEcho } from "../../utils/Echo";

export function login(user) {
    return async (dispatch, getState) => {
        dispatch({ type: "LOGIN_REQUEST" });

        try {
            const response = await axios.post(`${apiURL}/login`, user);

            console.log(response);

            // Get the token and save it
            const token = response.data.access_token;
            localStorage.setItem("auth", token);

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: response.data
            });

            dispatch(getMyUser());
        } catch (e) {
            console.log(e);
            console.log(e.response);

            if ("errors" in e.response.data) {
                dispatch({
                    type: "LOGIN_FAILURE",
                    errors: e.response.data.errors,
                    error: ""
                });
            } else {
                dispatch({
                    type: "LOGIN_FAILURE",
                    error: e.response.data.error,
                    errors: {}
                });
                getMyUser;
            }
        }
    };
}

export function getMyUser(user) {
    return async (dispatch, getState) => {
        dispatch({ type: "MY_USER_REQUEST" });

        try {
            const token = localStorage.getItem("auth");
            // @ts-ignore
            const response = await axios.get(`${apiURL}/me`, { token });

            registerEcho(token);

            dispatch({
                type: "MY_USER_SUCESS",
                payload: response.data
            });

            sendTokenToServer();
        } catch (e) {
            console.log(e);
            console.log(e.response);
            dispatch({
                type: "MY_USER_FAILURE"
            });
        }
    };
}

export function logout(user) {
    return async (dispatch, getState) => {
        await removeTokenFromServer();

        localStorage.removeItem("auth");

        unregisterEcho();

        dispatch({
            type: "LOGOUT"
        });
    };
}
