const defaultState = {
    list: [],
    isLoadingList: false,
    fullList: [],
    isLoadingFullList: false,
    isEditing: false,
    allProviders: []
};

const providerReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "CHANGE_HISTORY":
            return {
                ...state,
                list: [],
                isLoadingList: true,
                fullList: [],
                isLoadingFullList: true
            };
        case "OPEN_MODAL":
            return {
                ...state
            };

        case "GET_PROVIDERS_SUCCESS":
            return {
                ...state,
                fullList: payload,
                isLoadingFullList: false
            };

        case "CLEAR_PROVIDERS":
            return {
                ...state,
                list: [],
                isLoadingList: true
            };

        case "GET_TASKS_PROVIDERS_SUCCESS":
            return {
                ...state,
                list: payload,
                isLoadingList: false
            };
        case "GET_TASKS_PROVIDERS_FAILURE":
            return {
                ...state,
                isLoadingList: false
            };

        case "EDIT_PROVIDER_REQUEST":
            return {
                ...state
            };
        case "EDIT_PROVIDER_SUCCESS":
            return {
                ...state,
                list: state.list.map(item =>
                    item.id == payload.id ? payload : item
                ),
                fullList: state.fullList.map(item =>
                    item.id == payload.id ? payload : item
                )
            };

        case "CREATE_TASK_PROVIDER_SUCCESS":
            return {
                ...state,
                list: [...state.list, payload]
            };

        case "CREATE_NEGOTIATION_REQUEST":
            return {
                ...state
            };
        case "CREATE_NEGOTIATION_SUCCESS":
            return {
                ...state,
                providers: [...state.list, payload]
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
