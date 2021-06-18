const defaultState = {
    isEditing: false,
    errors: {}
};

const genericFormReducer = (state = defaultState, action) => {
    const { type } = action;

    switch (type) {
        case "FORM_SUBMIT_REQUEST":
            return {
                ...state,
                isEditing: true
            };
        case "FORM_SUBMIT_SUCCESS":
            return {
                ...state,
                errors: {},
                isEditing: false
            };
        case "FORM_SUBMIT_FAILURE":
            return {
                ...state,
                errors: action.errors,
                isEditing: false
            };

        case "CLOSE_MODAL":
            return {
                ...state,
                errors: {},
                isEditing: false
            };

        default:
            return state;
    }
};

export default genericFormReducer;
