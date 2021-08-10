const defaultState = {
    comparisions: []
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
                item.productName === payload.productName ? payload : item
            )
        };
    }

    return state;
};

export default comparatorReducer;
