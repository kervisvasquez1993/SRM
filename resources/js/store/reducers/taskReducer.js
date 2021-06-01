const defaultState = {
    tasks: []
};

const taskReducer = (state = defaultState, action) => {
    const { type, payload, error } = action;

    switch (type) {
        case "GET_TASKS_REQUEST":
            return {
                ...state,
            };
        case "GET_TASKS_SUCESS":
            return {
                ...state,
                tasks: payload
            };
        case "GET_TASKS_FAILURE":
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default taskReducer;
