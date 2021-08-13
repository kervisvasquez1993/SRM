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
            console.log(e.response);
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
            console.log(e.response);
            dispatch({
                type: "EDIT_TASK_FAILURE",
                errors: e.response.data
            });
        }
    };
}

export function getTask(id, params = {}) {
    return async (dispatch, getState) => {
        dispatch({ type: "GET_TASK_REQUEST" });

        try {
            const response = await axios.get(`${apiURL}/tarea/${id}`, {
                params
            });

            if (params.productos && params.negociaciones) {
                // Filtrar las negociaciones que solo tengan productos cargados
                response.data.data.negociaciones = response.data.data.negociaciones.filter(
                    item => item.productos_cargados
                );

                // Obtener un arreglo de todos los productos de las negociaciones filtradas
                const products = response.data.data.negociaciones
                    .map(item => item.productos)
                    .flat();

                response.data.data.comparaciones = JSON.parse(
                    response.data.data.comparaciones
                );

                dispatch({
                    type: "SET_SELECTED_NEGOTIATIONS_FOR_COMPARISON",
                    payload: { products }
                });
            }

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
