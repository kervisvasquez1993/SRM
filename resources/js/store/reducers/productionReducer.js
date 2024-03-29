const defaultState = {
    list: [],
    isLoadingList: true,
    current: null,
    isLoading: true,

    payments: [],
    isEditing: false,
    errors: {},
    arePaymentsLoading: false
};

const negotiationReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "CLOSE_MODAL":
            return {
                ...state,
                errors: {},
                payments: [],
                arePaymentsLoading: false,
                current: null
            };
        case "GET_PRODUCTIONS_REQUEST":
            return {
                ...state
            };
        case "GET_PRODUCTIONS_SUCCESS":
            return {
                ...state,
                list: payload,
                isLoadingList: false
            };
        case "GET_PRODUCTIONS_FAILURE":
            return {
                ...state,
                isLoadingList: false
            };

        case "CHANGE_HISTORY":
            return {
                ...state,
                isLoadingList: true
            };

        case "GET_PRODUCTION_REQUEST":
            return {
                ...state,
                isLoading: true
            };
        case "GET_PRODUCTION_SUCCESS":
            return {
                ...state,
                current: payload,
                isLoading: false
            };
        case "GET_PRODUCTION_FAILURE":
            return {
                ...state,
                isLoading: false
            };
        case "REMOVE_PRODUCTION":
            return {
                ...state,
                isLoading: true,
                current: null
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

        case "DELETE_PAYMENT_SUCCESS":
            const payments = state.payments.filter(item => item.id != payload);

            return {
                ...state,
                payments,
                current: { ...state.current, pagos: payments }
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
