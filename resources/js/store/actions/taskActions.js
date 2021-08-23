import axios from "axios";
import { toast } from "react-toastify";
import { apiURL } from "../../components/App";
import { focusOnElementWithId } from "./focusActions";
import { genericFormSubmit } from "./genericFormActions";
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
    return dispatch => {
        return genericFormSubmit(dispatch, () =>
            axios.post(`${apiURL}/tarea`, task)
        ).then(response => {
            dispatch({
                type: "CREATE_TASK_SUCCESS",
                payload: response
            });

            dispatch(closeModal());
            dispatch(focusOnElementWithId(response.id));
            toast.success("✔️ Tarea creada");
        });
    };

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
            console.log(e.response);
            dispatch({
                type: "CREATE_TASK_FAILURE",
                errors: e.response.data
            });
        }
    };
}

export function editTask(task, focusEnabled = true) {
    return dispatch => {
        return genericFormSubmit(dispatch, () =>
            axios.put(`${apiURL}/tarea/${task.id}`, task)
        ).then(response => {
            dispatch({
                type: "EDIT_TASK_SUCCESS",
                payload: response
            });

            dispatch(closeModal());
            if (focusEnabled) {
                dispatch(focusOnElementWithId(response.id));
            }

            toast.success("✔️ Tarea editada");
        });
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
            console.log(e);
            dispatch({
                type: "GET_TASK_FAILURE"
            });
        }
    };
}
