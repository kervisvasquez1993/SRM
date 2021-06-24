const defaultState = {
    focusOnId: null
};

const focusReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "FOCUS_ON_ID":
            return {
                ...state,
                focusOnId: payload
            };

        case "OPEN_MODAL":
            return {
                ...state,
                focusOnId: null
            };

        case "CHANGE_HISTORY":
            return {
                ...state,
                focusOnId: null
            };

        default:
            return state;
    }
};

export default focusReducer;
