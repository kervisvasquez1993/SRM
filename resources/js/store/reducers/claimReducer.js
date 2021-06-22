const defaultState = {
    list: [],
    isLoadingList: false,
    current: null
};

const claimReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "CHANGE_HISTORY":
            return {
                ...state,
                list: [],
                isLoadingList: true
            };

        case "GET_CLAIMS_REQUEST":
            return {
                ...state,
                isLoadingList: true
            };
        case "GET_CLAIMS_SUCCESS":
            return {
                ...state,
                list: payload,
                isLoadingList: false
            };
        case "GET_CLAIMS_FAILURE":
            return {
                ...state,
                isLoadingList: false
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
