const defaultState = {
    negotiations: []
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
        default:
            return state;
    }
};

export default negotiationReducer;
