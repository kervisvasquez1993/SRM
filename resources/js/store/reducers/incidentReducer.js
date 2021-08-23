const defaultState = {
    isEditing: false,
    errors: {},
    incidents: [],
    areIncidentsLoading: false,
    parentId: null
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
                areIncidentsLoading: false,
                parentId: action.parentId
            };
        case "GET_INCIDENTS_FAILURE":
            return {
                ...state,
                areIncidentsLoading: false
            };

        case "CREATE_INCIDENT_SUCCESS":
            return {
                ...state,
                incidents: [...state.incidents, payload]
            };
        case "EDIT_INCIDENT_SUCCESS":
            return {
                ...state,
                incidents: state.incidents.map(item =>
                    item.id == payload.id ? payload : item
                )
            };
        case "DELETE_INCIDENT_SUCCESS":
            return {
                ...state,
                incidents: state.incidents.filter(item => item.id != payload)
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

export default incidentReducer;
