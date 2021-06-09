const defaultState = {
    negotiations: [],
    isStarting: false
};

const negotiationReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "GET_NEGOTIATIONS_REQUEST":
            return {
                ...state
            };
        case "GET_NEGOTIATIONS_SUCCESS":
            return {
                ...state,
                negotiations: payload
            };
        case "GET_NEGOTIATIONS_FAILURE":
            return {
                ...state
            };
        case "CLOSE_MODAL":
            return {
                ...state,
                isStarting: false
            };
        case "START_PRODUCTION_REQUEST":
            return {
                ...state,
                isStarting: true
            };
        case "START_PRODUCTION_SUCCESS":
            const newList = state.negotiations.map(negotiation =>
                negotiation.id === payload.id ? payload : negotiation
            );

            return {
                ...state,
                negotiations: newList,
                isStarting: false
            };
        case "START_PRODUCTION_FAILURE":
            return {
                ...state,
                isStarting: false
            };
        case "START_ART_REQUEST":
            return {
                ...state,
                isStarting: true
            };
        case "START_ART_SUCCESS":
            const _newList = state.negotiations.map(negotiation =>
                negotiation.id === payload.id ? payload : negotiation
            );

            return {
                ...state,
                negotiations: _newList,
                isStarting: false
            };
        case "START_ART_FAILURE":
            return {
                ...state,
                isStarting: false
            };
        default:
            return state;
    }
};

export default negotiationReducer;
