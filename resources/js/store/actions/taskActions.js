import axios from "axios";

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