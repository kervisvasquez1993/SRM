const defaultState = {
    providers: []
};

const providerReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "GET_TASK_PROVIDERS_REQUEST":
            return {
                ...state
            };
        case "GET_TASKS_PROVIDERS_SUCCESS":
            return {
                ...state,
                providers: payload
            };
        case "GET_TASKS_PROVIDERS_FAILURE":
            return {
                ...state
            };
        default:
            return state;
    }
};

export default providerReducer;
