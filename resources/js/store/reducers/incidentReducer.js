const defaultState = {
    isEditing: false,
    errors: {},
    incidents: [],
    areIncidentsLoading: false
};

const incidentReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "GET_INCIDENTS_REQUEST":
            return {
                ...state,
                areIncidentsLoading: true
            };
        case "GET_INCIDENTS_SUCCESS":
            return {
                ...state,
                incidents: payload,
                areIncidentsLoading: false
            };
        case "GET_INCIDENTS_FAILURE":
            return {
                ...state,
                areIncidentsLoading: false
            };
        case "DELETE_INCIDENT_SUCCESS":
            return {
                ...state,
                incidents: state.incidents.filter(item => item.id != payload)
            };

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
            }

        default:
            return state;
    }
};

export default incidentReducer;
