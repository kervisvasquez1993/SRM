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

            console.log(response.data.data)

            dispatch({
                type: "CREATE_TASK_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            dispatch({
                type: "CREATE_TASK_FAILURE",
                errors: e.response.data,
            });
        }

        dispatch(closeModal());
    };
}