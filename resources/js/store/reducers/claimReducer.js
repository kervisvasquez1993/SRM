const defaultState = {
    list: [],
    isLoadingList: true,
    current: null,
    isLoadingCurrent: true,
    isUploadingFile: false,

    receptionItems: [],

    inspectionFiles: [],
    uploadingFiles: [],

    productClaims: [],
    areClaimsLoading: true
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
                receptionItems: [],

                areClaimsLoading: true,
                productClaims: []
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

        case "GET_INSPECTION_FILES_SUCCESS":
            return {
                ...state,
                inspectionFiles: payload
            };

        case "DELETE_INSPECTION_FILE_REQUEST":
            return {
                ...state,
                deletingFileId: payload
            };
        case "DELETE_INSPECTION_FILE_SUCCESS":
            return {
                ...state,
                inspectionFiles: state.inspectionFiles.filter(
                    item => item.id != payload
                ),
                deletingFileId: null
            };
        case "DELETE_INSPECTION_FILE_FAILURE":
            return {
                ...state,
                deletingFileId: null
            };

        case "UPLOAD_INSPECTION_FILE_REQUEST":
            return {
                ...state,
                uploadingFiles: [...state.uploadingFiles, payload]
            };
        case "UPLOAD_INSPECTION_FILE_SUCCESS":
            return {
                ...state,
                uploadingFiles: state.uploadingFiles.filter(
                    item => item != payload
                )
            };
        case "UPLOAD_INSPECTION_FILE_FAILURE":
            return {
                ...state,
                uploadingFiles: state.uploadingFiles.filter(
                    item => item != payload
                )
            };

        case "GET_PRODUCT_CLAIMS_REQUEST":
            return {
                ...state,
                productClaims: [],
                areClaimsLoading: true
            };
        case "GET_PRODUCT_CLAIMS_SUCCESS":
            return {
                ...state,
                productClaims: payload,
                areClaimsLoading: false
            };
        case "GET_PRODUCT_CLAIMS_FAILURE":
            return {
                ...state,
                areClaimsLoading: false
            };

        case "CREATE_PRODUCT_CLAIM_SUCCESS":
            return {
                ...state,
                productClaims: [...state.productClaims, payload]
            };

        case "EDIT_PRODUCT_CLAIM_SUCCESS":
            return {
                ...state,
                productClaims: state.productClaims.map(item =>
                    item.id === payload.id ? payload : item
                )
            };

        case "DELETE_PRODUCT_CLAIM_SUCCESS":
            return {
                ...state,
                productClaims: state.productClaims.filter(
                    item => item.id != payload.id
                )
            };

        default:
            return state;
    }
};

export default claimReducer;
