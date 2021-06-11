const defaultState = {
    negotiations: [],
    isStarting: false,
    negotiation: null,
    negotiationError: false
};

const negotiationReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "GET_NEGOTIATIONS_REQUEST":
            return {
                ...state
            };
        case "GET_NEGOTIATIONS_SUCCESS":
            return {
                ...state,
                negotiations: payload
            };
        case "GET_NEGOTIATIONS_FAILURE":
            return {
                ...state
            };
        case "GET_NEGOTIATION_REQUEST":
            return {
                ...state,
                negotiation: null,
                negotiationError: false
            };
        case "GET_NEGOTIATION_SUCCESS":
            return {
                ...state,
                negotiation: payload,
                negotiationError: false
            };
        case "GET_NEGOTIATION_FAILURE":
            return {
                ...state,
                negotiationError: true
            };
        case "CLOSE_MODAL":
            return {
                ...state,
                isStarting: false
            };
        case "START_PRODUCTION_REQUEST":
            return {
                ...state,
                isStarting: true
            };
        case "START_PRODUCTION_SUCCESS":
            const newList = state.negotiations.map(negotiation =>
                negotiation.id === payload.id ? payload : negotiation
            );

            return {
                ...state,
                negotiations: newList,
                isStarting: false
            };
        case "START_PRODUCTION_FAILURE":
            return {
                ...state,
                isStarting: false
            };
        case "START_ART_REQUEST":
            return {
                ...state,
                isStarting: true
            };
        case "START_ART_SUCCESS":
            const _newList = state.negotiations.map(negotiation =>
                negotiation.id === payload.id ? payload : negotiation
            );

            return {
                ...state,
                negotiations: _newList,
                isStarting: false
            };
        case "START_ART_FAILURE":
            return {
                ...state,
                isStarting: false
            };
            case "EDIT_PO_CODE_REQUEST":
                return {
                    ...state,
                    isEditing: true
                };
            case "EDIT_PO_CODE_SUCCESS":
                return {
                    ...state,
                    isEditing: false,
                    negotiation: payload,
                };
            case "EDIT_PO_CODE_FAILURE":
                return {
                    ...state,
                    isEditing: false
                };
        default:
            return state;
    }
};

export default negotiationReducer;
