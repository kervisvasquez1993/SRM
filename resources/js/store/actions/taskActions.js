import axios from "axios";
import { closeModal } from "./modalActions";

export function getTasks() {
    return async (dispatch, getState) => {
        dispatch({ type: "GET_TASKS_REQUEST" });

        try {
            const response = await axios.get(`api/tarea`);

            dispatch({
                type: "GET_TASKS_SUCESS",
                payload: response.data.data
            });
        } catch (e) {
            dispatch({
                type: "GET_TASKS_FAILURE"
            });
        }
    };
}

export function createTask(task) {
    return async (dispatch, getState) => {
        dispatch({ type: "CREATE_TASK_REQUEST" });

        try {
            const response = await axios.post(`api/tarea/`, task);

            dispatch({
                type: "CREATE_TASK_SUCCESS",
                payload: response.data.data
            });

            dispatch(closeModal());
        } catch (e) {
            dispatch({
                type: "CREATE_TASK_FAILURE",
                errors: e.response.data,
            });
        }
    };
}

export function editTask(id, task) {
    return async (dispatch, getState) => {
        dispatch({ type: "EDIT_TASK_REQUEST" });

        try {
            const response = await axios.put(`api/tarea/${id}`, task);

            dispatch({
                type: "EDIT_TASK_SUCCESS",
                payload: response.data.data
            });

            dispatch(closeModal());
        } catch (e) {
            dispatch({
                type: "EDIT_TASK_FAILURE",
                errors: e.response.data,
            });
        }
    };
}

export function clearTaskErrors(user) {
    return {
        type: "CLEAR_TASK_ERRORS"
    }
}