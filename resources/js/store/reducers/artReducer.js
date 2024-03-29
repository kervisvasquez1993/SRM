const defaultState = {
    list: [],
    isLoadingList: false,
    current: null,

    isEditingDropdowns: false
};

const artReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "CLOSE_MODAL":
            return {
                ...state,
                current: null
            };
        case "GET_ARTS_REQUEST":
            return {
                ...state,
                isLoadingList: true
            };
        case "GET_ARTS_SUCCESS":
            return {
                ...state,
                list: payload,
                isLoadingList: false
            };
        case "GET_ARTS_FAILURE":
            return {
                ...state,
                isLoadingList: false
            };

        case "CHANGE_HISTORY":
            return {
                ...state,
                isLoadingList: true
            };

        case "GET_ART_REQUEST":
            return {
                ...state
            };
        case "GET_ART_SUCCESS":
            return {
                ...state,
                current: payload
            };
        case "GET_ART_FAILURE":
            return {
                ...state
            };

        case "EDIT_ARTS_REQUEST":
            return {
                ...state,
                isEditingDropdowns: true
            };
        case "EDIT_ARTS_SUCCESS":
            return {
                ...state,
                isEditingDropdowns: false,
                list: state.list.map(item =>
                    item.id === payload.id ? payload : item
                )
            };
        case "EDIT_ARTS_FAILURE":
            return {
                ...state,
                isEditingDropdowns: false
            };

        default:
            return state;
    }
};

export default artReducer;
