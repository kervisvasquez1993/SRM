import axios from "axios";

export const openModal = (options) => {
    return {
        type: "OPEN_MODAL",
        payload: options
    }
}

export const closeModal = (options) => {
    return {
        type: "CLOSE_MODAL"
    }
}


/*
export function getTaskList(projectId) {
    return async (dispatch, getState) => {
        dispatch({type: "GET_TASKS_REQUEST"});

        try {
            const request = await axios.get(`${apiURL}/projects/${projectId}/tasks`);

            dispatch({
                type: "GET_TASKS_SUCCESS",
                payload: request.data
            });
        } catch(e) {
            console.log(e)
            console.log(e.response);
            dispatch({type: "GET_TASKS_FAILURE", error: "Can't fetch tasks"});
        }
    }
}
*/