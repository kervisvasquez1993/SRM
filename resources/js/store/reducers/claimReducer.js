const defaultState = {
    list: [],
    current: null
};

const claimReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "CHANGE_HISTORY":
            return {
                ...state,
                list: []
            };

        case "GET_CLAIMS_SUCCESS":
            return {
                ...state,
                list: payload
            };

        case "UPDATE_CLAIM_SUCCESS":
            return {
                ...state,
                list: state.list.map(item =>
                    item.id === payload.id ? payload : item
                )
            };

        case "GET_CLAIM_SUCCESS":
            return {
                ...state,
                current: payload
            };

        case "CLOSE_MODAL":
            return {
                ...state,
                current: null
            };

        default:
            return state;
    }
};

export default claimReducer;
