import { filterNegotiations } from "../../utils";

const defaultState = {
    negotiations: [],
    isLoadingList: false,
    isStarting: false,
    negotiation: null,
    negotiationError: false,

    files: [],
    deletingFileId: null,
    uploadingFiles: []
};

const negotiationReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "GET_NEGOTIATIONS_REQUEST":
            return {
                ...state,
                isLoadingList: true
            };
        case "GET_NEGOTIATIONS_SUCCESS":
            return {
                ...state,
                negotiations: filterNegotiations(payload),
                isLoadingList: false
            };
        case "GET_NEGOTIATIONS_FAILURE":
            return {
                ...state,
                isLoadingList: false
            };

        case "CHANGE_HISTORY":
            return {
                ...state,
                isLoadingList: true,
                files: [],
                isUploadingFile: false,
                uploadingFiles: []
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
                negotiations: filterNegotiations(newList),
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
                negotiations: filterNegotiations(_newList),
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
                negotiation: payload
            };
        case "EDIT_PO_CODE_FAILURE":
            return {
                ...state,
                isEditing: false
            };

        case "GET_NEGOTIATION_FILES_SUCCESS":
            return {
                ...state,
                files: payload
            };

        case "DELETE_NEGOTIATION_FILE_REQUEST":
            return {
                ...state,
                deletingFileId: payload
            };
        case "DELETE_NEGOTIATION_FILE_SUCCESS":
            return {
                ...state,
                files: state.files.filter(item => item.id != payload),
                deletingFileId: null
            };
        case "DELETE_NEGOTIATION_FILE_FAILURE":
            return {
                ...state,
                deletingFileId: null
            };

        case "UPLOAD_NEGOTIATION_FILE_REQUEST":
            return {
                ...state,
                uploadingFiles: [...state.uploadingFiles, payload]
            };
        case "UPLOAD_NEGOTIATION_FILE_SUCCESS":
            return {
                ...state,
                uploadingFiles: state.uploadingFiles.filter(
                    item => item != payload
                )
            };
        case "UPLOAD_NEGOTIATION_FILE_FAILURE":
            return {
                ...state,
                uploadingFiles: state.uploadingFiles.filter(
                    item => item != payload
                )
            };

        case "UPDATE_NEGOTIATION_SUCCESS":
            return {
                ...state,
                negotiation: payload
            };
        default:
            return state;
    }
};

export default negotiationReducer;
