const defaultState = {
    providers: [],
    errors: {},
    isEditing: false
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
        case "EDIT_PROVIDER_REQUEST":
            return {
                ...state,
                isEditing: true
            };
        case "EDIT_PROVIDER_SUCCESS":
            const newProviders = state.providers.map(provider => {
                if (provider.id == payload.id) return payload;

                return provider;
            });

            return {
                ...state,
                providers: newProviders,
                errors: {},
                isEditing: false
            };

        case "EDIT_PROVIDER_FAILURE":
            return {
                ...state,
                errors: action.errors || {},
                error: action.error || "",
                isEditing: false
            };
        case "CREATE_TASK_PROVIDER_REQUEST":
            return {
                ...state,
                isEditing: true
            };
        case "CREATE_TASK_PROVIDER_SUCCESS":
            return {
                ...state,
                providers: [...state.providers, payload],
                errors: {},
                isEditing: false
            };
        case "CREATE_TASK_PROVIDER_FAILURE":
            return {
                ...state,
                errors: action.errors || {},
                error: action.error || null,
                isEditing: false
            };
        case "CLOSE_MODAL":
            return {
                ...state,
                errors: {},
                error: null
            };
        default:
            return state;
    }
};

export default providerReducer;
