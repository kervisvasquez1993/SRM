const defaultState = {
    list: [],
    payments: []
};

const negotiationReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "GET_PRODUCTIONS_REQUEST":
            return {
                ...state
            };
        case "GET_PRODUCTIONS_SUCCESS":
            return {
                ...state,
                list: payload
            };
        case "GET_PRODUCTIONS_FAILURE":
            return {
                ...state
            };
        case "UPDATE_PRODUCTION_REQUEST":
            return {
                ...state
            };
        case "UPDATE_PRODUCTION_SUCCESS":
            return {
                ...state,
                list: state.list.map(item =>
                    item.id === payload.id ? payload : item
                )
            };
        case "UPDATE_PRODUCTION_FAILURE":
            return {
                ...state
            };
        case "GET_PAYMENTS_REQUEST":
            return {
                ...state
            };
        case "GET_PAYMENTS_SUCCESS":
            return {
                ...state,
                payments: payload
            };
        case "GET_PAYMENTS_FAILURE":
            return {
                ...state
            };
        default:
            return state;
    }
};

export default negotiationReducer;
