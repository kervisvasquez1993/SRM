const defaultState = {
    isOpen: false,
    title: "",
    body: null,
    onClose: null
};

const modalReducer = (state = defaultState, action) => {
    const { type, payload, error } = action;

    switch (type) {
        case "OPEN_MODAL":
            return {
                ...state,
                isOpen: true,
                ...payload
            };
        case "CLOSE_MODAL":
            return {
                ...state,
                isOpen: false,
                defaultTab: null
            };
        case "REMOVE_MODAL_CLOSE_CALLBACK":
            return {
                ...state,
                onClose: null
            };

        case "CHANGE_HISTORY":
            return {
                ...state,
                isOpen: false,
                defaultTab: null
            };
        default:
            return state;
    }
};

export default modalReducer;
