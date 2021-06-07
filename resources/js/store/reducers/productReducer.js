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
                ...state,
                isEditing: true
            };
        case "CREATE_PRODUCT_SUCCESS":
            return {
                ...state,
                products: [...state.products, payload],
                errors: {},
                isEditing: false
            };
        case "CREATE_PRODUCT_FAILURE":
            return {
                ...state,
                errors: action.errors,
                isEditing: false
            };
        case "EDIT_PRODUCT_REQUEST":
            return {
                ...state,
                isEditing: true
            };
        case "EDIT_PRODUCT_SUCCESS":
            const newProducts = state.products.map(product => {
                if (product.id == payload.id) return payload;

                return product;
            });

            return {
                ...state,
                products: newProducts,
                errors: {},
                isEditing: false
            };
        case "EDIT_PRODUCT_FAILURE":
            return {
                ...state,
                errors: action.errors,
                isEditing: false
            };
        case "DELETE_PRODUCT_REQUEST":
            return {
                ...state
            };
        case "DELETE_PRODUCT_SUCCESS":
            const _newProducts = state.products.filter(
                product => product.id != payload.id
            );

            return {
                ...state,
                products: _newProducts
            };
        case "DELETE_PRODUCT_FAILURE":
            return {
                ...state
            };
        default:
            return state;
    }
};

export default productReducer;
