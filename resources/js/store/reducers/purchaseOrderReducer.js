const defaultState = {
    orders: [],
    errors: {},
    isEditing: false
};

const purcharseOrderReducer = (state = defaultState, action) => {
    const { type, payload } = action;

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
                orders: []
            };
        case "GET_PURCHASE_ORDERS_REQUEST":
            return {
                ...state
            };
        case "GET_PURCHASE_ORDERS_SUCCESS":
            return {
                ...state,
                orders: payload
            };
        case "GET_PURCHASE_ORDERS_FAILURE":
            return {
                ...state,
                orders: []
            };
        case "CREATE_PURCHASE_ORDER_REQUEST":
            return {
                ...state,
                isEditing: true
            };
        case "CREATE_PURCHASE_ORDER_SUCCESS":
            return {
                ...state,
                orders: [...state.orders, payload],
                errors: {},
                isEditing: false
            };
        case "CREATE_PURCHASE_ORDER_FAILURE":
            return {
                ...state,
                errors: action.errors,
                isEditing: false
            };
        case "EDIT_PURCHASE_ORDER_REQUEST":
            return {
                ...state,
                isEditing: true
            };
        case "EDIT_PURCHASE_ORDER_SUCCESS":
            return {
                ...state,
                orders: state.orders.map(item => item.id === payload.id ? payload : item),
                errors: {},
                isEditing: false
            };
        case "EDIT_PURCHASE_ORDER_FAILURE":
            return {
                ...state,
                errors: action.errors,
                isEditing: false
            };
        case "DELETE_PURCHASE_ORDER_SUCCESS":
            return {
                ...state,
                orders: state.orders.filter(item => item.id != payload.id)
            };
        default:
            return state;
    }
};

export default purcharseOrderReducer;
