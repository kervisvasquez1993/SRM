import axios from "axios";
import { toast } from "react-toastify";
import { apiURL } from "../../components/App";
import { focusOnElementWithId } from "./focusActions";
import { closeModal } from "./modalActions";

export function getTasks(myTasks = false) {
    return async (dispatch, getState) => {
        dispatch({ type: "GET_TASKS_REQUEST" });

        try {
            let response;
            if (myTasks) {
                response = await axios.get(`${apiURL}/me/tareas`);
            } else {
                response = await axios.get(`${apiURL}/tarea`);
            }

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
            const response = await axios.post(`${apiURL}/tarea`, task);

            dispatch({
                type: "CREATE_TASK_SUCCESS",
                payload: response.data.data
            });

            dispatch(closeModal());

            dispatch(focusOnElementWithId(response.data.data.id));

            toast.success("✔️ Tarea creada");
        } catch (e) {
            dispatch({
                type: "CREATE_TASK_FAILURE",
                errors: e.response.data
            });
        }
    };
}

export function editTask(id, task) {
    return async (dispatch, getState) => {
        dispatch({ type: "EDIT_TASK_REQUEST" });

        try {
            const response = await axios.put(`${apiURL}/tarea/${id}`, task);

            dispatch({
                type: "EDIT_TASK_SUCCESS",
                payload: response.data.data
            });

            dispatch(closeModal());

            dispatch(focusOnElementWithId(id));

            toast.success("✔️ Tarea editada");
        } catch (e) {
            dispatch({
                type: "EDIT_TASK_FAILURE",
                errors: e.response.data
            });
        }
    };
}

export function getTask(id) {
    return async (dispatch, getState) => {
        dispatch({ type: "GET_TASK_REQUEST" });

        try {
            const response = await axios.get(`${apiURL}/tarea/${id}`);

            dispatch({
                type: "GET_TASK_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            dispatch({
                type: "GET_TASK_FAILURE"
            });
        }
    };
}
