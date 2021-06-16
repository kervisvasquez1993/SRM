const defaultState = {
    list: [],
    current: null,

    isEditingDropdowns: false
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
            return {
                ...state,
                list: payload
            };
        case "GET_ARTS_FAILURE":
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
