const defaultState = {
    focusOnId: null
};

const focusReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    if (type === "FOCUS_ON_ID") {
        return {
            ...state,
            focusOnId: payload
        };
    }

    if (
        type === "FOCUS_CLEAR" ||
        type === "OPEN_MODAL" ||
        type === "CHANGE_HISTORY"
    ) {
        return {
            ...state,
            focusOnId: null
        };
    }

    return state;
};

export default focusReducer;
