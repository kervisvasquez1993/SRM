const defaultState = {
    tasks: [],
    errors: {}
};

const taskReducer = (state = defaultState, action) => {
    const { type, payload } = action;

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
        case "CREATE_TASK_REQUEST":
            return {
                ...state,
            };
        case "CREATE_TASK_SUCCESS":
            return {
                ...state,
                tasks: [...state.tasks, payload]
            };
        case "CREATE_TASK_FAILURE":
            return {
                ...state,
                errors: action.errors
            };
        default:
            return state;
    }
};

export default taskReducer;
