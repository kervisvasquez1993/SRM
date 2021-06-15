const defaultState = {
    list: [],
    current: null,

    payments: [],
    isEditing: false,
    errors: {},
    arePaymentsLoading: false,

    incidents: [],
    areIncidentsLoading: false
};

const negotiationReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "CLOSE_MODAL":
            return {
                ...state,
                errors: {},
                payments: [],
                arePaymentsLoading: false
            };
        case "GET_PRODUCTIONS_REQUEST":
            return {
                ...state
            };
        case "GET_PRODUCTIONS_SUCCESS":
            return {
                ...state,
                list: payload
            };
        case "GET_PRODUCTIONS_FAILURE":
            return {
                ...state
            };

        case "GET_PRODUCTION_SUCCESS":
            return {
                ...state,
                current: payload
            };

        case "UPDATE_PRODUCTION_REQUEST":
            return {
                ...state
            };
        case "UPDATE_PRODUCTION_SUCCESS":
            return {
                ...state,
                list: state.list.map(item =>
                    item.id === payload.id ? payload : item
                )
            };
        case "UPDATE_PRODUCTION_FAILURE":
            return {
                ...state
            };

        case "GET_PAYMENTS_REQUEST":
            return {
                ...state,
                arePaymentsLoading: true
            };
        case "GET_PAYMENTS_SUCCESS":
            return {
                ...state,
                payments: payload,
                arePaymentsLoading: false
            };
        case "GET_PAYMENTS_FAILURE":
            return {
                ...state,
                arePaymentsLoading: false
            };

        case "CREATE_PAYMENT_REQUEST":
            return {
                ...state,
                isEditing: true
            };
        case "CREATE_PAYMENT_SUCCESS":
            return {
                ...state,
                errors: {},
                isEditing: false
            };
        case "CREATE_PAYMENT_FAILURE":
            return {
                ...state,
                errors: action.errors,
                isEditing: false
            };

        case "DELETE_PAYMENT_SUCCESS":
            return {
                ...state,
                payments: state.payments.filter(item => item.id != payload)
            };

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

        default:
            return state;
    }
};

export default negotiationReducer;
