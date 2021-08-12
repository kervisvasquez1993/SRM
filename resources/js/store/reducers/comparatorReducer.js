const defaultState = {
    comparisions: [],
    negotiations: [],
    products: []
};

const comparatorReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    if (type === "ADD_NEGOTIATION_COMPARATOR") {
        return {
            ...state,
            comparisions: [...state.comparisions, payload]
        };
    }

    if (type === "DELETE_NEGOTIATION_COMPARATOR") {
        return {
            ...state,
            comparisions: state.comparisions.filter(
                item => item.productName != payload
            )
        };
    }

    if (type === "EDIT_NEGOTIATION_COMPARATOR") {
        return {
            ...state,
            comparisions: state.comparisions.map(item =>
                item.id === payload.id ? payload : item
            )
        };
    }

    if (type === "CHANGE_HISTORY") {
        return {
            ...state,
            comparisions: []
        };
    }

    if (type === "SET_SELECTED_NEGOTIATIONS_FOR_COMPARISON") {
        return {
            ...state,
            negotiations: payload.negotiations,
            products: payload.products
        };
    }

    return state;
};

export default comparatorReducer;
