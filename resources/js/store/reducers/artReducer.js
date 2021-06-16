const defaultState = {
    list: [],
    current: null
};

const artReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "CLOSE_MODAL":
            return {
                ...state
            };
        case "GET_ARTS_REQUEST":
            return {
                ...state
            };
        case "GET_ARTS_SUCCESS":
            console.log(payload)
            return {
                ...state,
                list: payload
            };
        case "GET_ARTS_FAILURE":
            return {
                ...state
            };

        default:
            return state;
    }
};

export default artReducer;
