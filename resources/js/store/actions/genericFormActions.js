import { closeModal } from "./modalActions";

export async function genericFormSubmit(dispatch, request) {
    return new Promise((resolve, reject) => {
        dispatch({ type: "FORM_SUBMIT_REQUEST" });

        request()
            .then(e => {
                dispatch({
                    type: "FORM_SUBMIT_SUCCESS",
                    payload: e.data.data
                });

                dispatch(closeModal());

                resolve(e.data.data);
            })
            .catch(e => {
                dispatch({
                    type: "FORM_SUBMIT_FAILURE",
                    errors: e.response.data,
                    error: e.response.data.error
                });

                reject(e.response);
            });
    });
}

export function showGeneralError(message) {
    return {
        type: "FORM_SHOW_GENERAL_ERROR",
        payload: message
    };
}
