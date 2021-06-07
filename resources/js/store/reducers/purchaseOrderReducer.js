const defaultState = {
    order: null,
    errors: {},
    isEditing: false
};

const purcharseOrderReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    console.log(action)

    switch (type) {
        case "OPEN_MODAL":
            return {
                ...state
            };
        case "CLOSE_MODAL":
            return {
                ...state,
                errors: {}
            };
        case "CHANGE_HISTORY":
            return {
                ...state,
                order: null
            };
        case "GET_PURCHASE_ORDER_REQUEST":
            return {
                ...state
            };
        case "GET_PURCHASE_ORDER_SUCCESS":
            return {
                ...state,
                order: payload
            };
        case "GET_PURCHASE_ORDER_FAILURE":
            return {
                ...state,
                order: null
            };
        case "CREATE_PURCHASE_ORDER_REQUEST":
            return {
                ...state,
                isEditing: true
            };
        case "CREATE_PURCHASE_ORDER_SUCCESS":
            return {
                ...state,
                order: payload,
                errors: {},
                isEditing: false
            };
        case "CREATE_PURCHASE_ORDER_FAILURE":
            return {
                ...state,
                errors: action.errors,
                isEditing: false
            };
        default:
            return state;
    }
};

export default purcharseOrderReducer;
