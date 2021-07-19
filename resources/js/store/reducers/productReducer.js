const defaultState = {
    products: [],
    isLoadingList: [],
    isUploadingFile: false
};

const productReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "CHANGE_HISTORY":
            return {
                ...state,
                products: [],
                isLoadingList: true
            };

        case "MODAL_CLOSE":
            return {
                ...state,
                isUploadingFile: false
            };

        case "GET_PRODUCTS_REQUEST":
            return {
                ...state,
                isLoadingList: true
            };
        case "GET_PRODUCTS_SUCCESS":
            return {
                ...state,
                products: payload,
                isLoadingList: false
            };
        case "GET_PRODUCTS_FAILURE":
            return {
                ...state,
                isLoadingList: false
            };

        case "CREATE_PRODUCT_SUCCESS":
            return {
                ...state,
                products: [...state.products, payload],
                errors: {},
                isEditing: false
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

        case "DELETE_PRODUCT_SUCCESS":
            const _newProducts = state.products.filter(
                product => product.id != payload.id
            );

            return {
                ...state,
                products: _newProducts
            };

        case "UPLOADING_PRODUCT_REQUEST":
            return {
                ...state,
                isUploadingFile: true
            };
        case "UPLOADING_PRODUCT_SUCCESS":
            return {
                ...state,
                isUploadingFile: false
            };

        default:
            return state;
    }
};

export default productReducer;
