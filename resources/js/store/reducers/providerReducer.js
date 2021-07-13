const defaultState = {
    providers: [],
    errors: {},
    isEditing: false,
    allProviders: []
};

const providerReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "CHANGE_HISTORY":
            return {
                ...state,
                providers: []
            };

        case "OPEN_MODAL":
            return {
                ...state
            };

        case "GET_PROVIDERS_REQUEST":
            return {
                ...state
            };
        case "GET_PROVIDERS_SUCCESS":
            return {
                ...state,
                allProviders: payload
            };
        case "GET_PROVIDERS_FAILURE":
            return {
                ...state
            };

        case "CLEAR_PROVIDERS":
            return {
                ...state,
                providers: []
            };

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
        case "START_NEGOTIATION_SUCCESS":
            const _newProviders = state.providers.map(provider => {
                if (provider.id === action.providerId) {
                    provider.pivot.iniciar_negociacion = 1;
                }

                return provider;
            });

            return {
                ...state,
                providers: _newProviders
            };

        case "CREATE_NEGOTIATION_REQUEST":
            return {
                ...state
            };
        case "CREATE_NEGOTIATION_SUCCESS":
            return {
                ...state,
                providers: [...state.providers, payload]
            };
        case "CREATE_NEGOTIATION_FAILURE":
            return {
                ...state
            };
        default:
            return state;
    }
};

export default providerReducer;
