const defaultState = {
    isOpen: false
};

const sidebarReducer = (state = defaultState, action) => {
    const { type } = action;

    switch (type) {
        case "TOGGLE_SIDEBAR":
            return {
                ...state,
                isOpen: !state.isOpen,
            };
        case "CLOSE_SIDEBAR":
            return {
                ...state,
                isOpen: false,
            }
        default:
            return state;
    }
};

export default sidebarReducer;
