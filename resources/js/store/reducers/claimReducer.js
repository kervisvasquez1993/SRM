const defaultState = {
    list: []
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

        default:
            return state;
    }
};

export default claimReducer;
