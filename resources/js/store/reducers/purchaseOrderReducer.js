const defaultState = {
    orders: [],
    errors: {},
    isEditing: false,
    isUploadingFile: false,
    isLoadingList: false
};

const purcharseOrderReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "CHANGE_HISTORY":
            return {
                ...state,
                isLoadingList: true
            };

        case "OPEN_MODAL":
            return {
                ...state
            };
        case "CLOSE_MODAL":
            return {
                ...state,
                errors: {},
                isUploadingFile: false
            };
        case "CHANGE_HISTORY":
            return {
                ...state,
                orders: [],
                isUploadingFile: false
            };
        case "GET_PURCHASE_ORDERS_REQUEST":
            return {
                ...state,
                isLoadingList: true
            };
        case "GET_PURCHASE_ORDERS_SUCCESS":
            return {
                ...state,
                isLoadingList: false,
                orders: payload
            };
        case "GET_PURCHASE_ORDERS_FAILURE":
            return {
                ...state,
                isLoadingList: false,
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
                orders: state.orders.map(item =>
                    item.id === payload.id ? payload : item
                ),
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

        case "UPLOAD_PURCHASE_ORDERS_REQUEST":
            return {
                ...state,
                isUploadingFile: true
            };
        case "UPLOAD_PURCHASE_ORDERS_SUCCESS":
            return {
                ...state,
                isUploadingFile: false
            };
        case "UPLOAD_PURCHASE_ORDERS_FAILURE":
            return {
                ...state,
                isUploadingFile: false
            };

        case "UPLOAD_PURCHASE_ORDER_REQUEST":
            return {
                ...state,
                isUploadingFile: true
            };
        case "UPLOAD_PURCHASE_ORDER_SUCCESS":
            return {
                ...state,
                isUploadingFile: false
            };
            case "UPLOAD_PURCHASE_ORDER_FAILURE":
            return {
                ...state,
                isUploadingFile: false
            };

        default:
            return state;
    }
};

export default purcharseOrderReducer;
