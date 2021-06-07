const defaultState = {
    products: [],
    errors: {},
    isEditing: false
};

const productReducer = (state = defaultState, action) => {
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
                ...state
            };
        case "GET_PRODUCTS_REQUEST":
            return {
                ...state
            };
        case "GET_PRODUCTS_SUCCESS":
            return {
                ...state,
                products: payload
            };
        case "GET_PRODUCTS_FAILURE":
            return {
                ...state
            };
        case "CREATE_PRODUCT_REQUEST":
            return {
                ...state
            };
        case "CREATE_PRODUCT_SUCCESS":
            return {
                ...state,
                products: [...state.products, payload],
                errors: {}
            };
        case "CREATE_PRODUCT_FAILURE":
            return {
                ...state,
                errors: action.errors
            };
        default:
            return state;
    }
};

export default productReducer;
