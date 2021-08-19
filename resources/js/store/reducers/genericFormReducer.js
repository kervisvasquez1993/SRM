const defaultState = {
    isEditing: false,
    errors: {},
    error: null
};

const genericFormReducer = (state = defaultState, action) => {
    const { type, payload } = action;

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
                error: null,
                isEditing: false
            };
        case "FORM_SUBMIT_FAILURE":
            return {
                ...state,
                errors: action.errors,
                error: action.error,
                isEditing: false
            };

        case "FORM_SHOW_GENERAL_ERROR":
            return {
                ...state,
                error: payload
            };

        case "CLOSE_MODAL":
            return {
                ...state,
                errors: {},
                error: null,
                isEditing: false
            };

        default:
            return state;
    }
};

export default genericFormReducer;
