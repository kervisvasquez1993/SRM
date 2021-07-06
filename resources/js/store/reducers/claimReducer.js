const defaultState = {
    list: [],
    isLoadingList: true,
    current: null,
    isLoadingCurrent: true,
    isUploadingFile: false,

    receptionItems: []
};

const claimReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "CHANGE_HISTORY":
            return {
                ...state,
                list: [],
                isLoadingList: true,
                isLoadingCurrent: true,
                receptionItems: []
            };

        case "GET_CLAIMS_REQUEST":
            return {
                ...state,
                isLoadingList: true
            };
        case "GET_CLAIMS_SUCCESS":
            return {
                ...state,
                list: payload,
                isLoadingList: false
            };
        case "GET_CLAIMS_FAILURE":
            return {
                ...state,
                isLoadingList: false
            };

        case "UPDATE_CLAIM_SUCCESS":
            return {
                ...state,
                list: state.list.map(item =>
                    item.id === payload.id ? payload : item
                ),
                current: payload
            };

        case "GET_CLAIM_REQUEST":
            return {
                ...state,
                isLoadingCurrent: true
            };
        case "GET_CLAIM_SUCCESS":
            return {
                ...state,
                current: payload,
                isLoadingCurrent: false
            };
        case "GET_CLAIM_FAILURE":
            return {
                ...state,
                isLoadingCurrent: false
            };

        case "CLOSE_MODAL":
            return {
                ...state,
                current: null
            };

        case "UPLOADING_CLAIMS_REQUEST":
            return {
                ...state,
                isUploadingFile: true
            };
        case "UPLOADING_CLAIMS_SUCCESS":
            return {
                ...state,
                isUploadingFile: false
            };
        case "UPLOADING_CLAIMS_FAILURE":
            return {
                ...state,
                isUploadingFile: false
            };

        case "GET_RECEPTION_ITEMS_SUCCESS":
            return {
                ...state,
                receptionItems: payload
            };

        default:
            return state;
    }
};

export default claimReducer;
