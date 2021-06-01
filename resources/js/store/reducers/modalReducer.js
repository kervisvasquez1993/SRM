const defaultState = {
    isOpen: false,
    title: "",
    body: null,
};

const modalReducer = (state=defaultState, action) => {
    const {type, payload, error} = action;

    switch (type) {
        case "OPEN_MODAL":
            return {
                ...state,
                ...payload,
                isOpen: true
            }
        case "CLOSE_MODAL":
            return {
                ...state,
                isOpen: false
            }
        default:
            return state;

    }
}

export default modalReducer;