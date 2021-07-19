const defaultState = {
    states: {},
    inspectionFiles: [],
    uploadingFiles: [],
    isLoading: false
};

const fileManagerReducer = (state = defaultState, action) => {
    const { type, payload, id } = action;

    let states = { ...state.states };

    switch (type) {
        case "CHANGE_HISTORY":
            return {
                ...state,
                isLoading: true
            };

        case "GET_FILES_REQUEST":
            if (!(id in states)) {
                states[id] = {
                    files: [],
                    isLoadingList: true,
                    uploadingFiles: [],
                    deletingFileId: null
                };
            }

            return {
                ...state,
                states,
                isLoading: true
            };
        case "GET_FILES_SUCCESS":
            states[id].files = payload;
            states[id].isLoadingList = false;

            return {
                ...state,
                states,
                isLoading: false
            };
        case "GET_FILES_FAILURE":
            states[id].files = [];
            states[id].isLoadingList = false;

            return {
                ...state,
                states,
                isLoading: false
            };

        case "DELETE_FILE_REQUEST":
            states[id].deletingFileId = payload;

            return {
                ...state,
                states
            };
        case "DELETE_FILE_SUCCESS":
            states[id].files = states[id].files.filter(
                item => item.id != payload
            );
            states[id].deletingFileId = null;

            return {
                ...state,
                states
            };
        case "DELETE_FILE_FAILURE":
            states[id].deletingFileId = null;

            return {
                ...state,
                deletingFileId: null
            };

        case "UPLOAD_FILE_REQUEST":
            states[id].uploadingFiles = [...states[id].uploadingFiles, payload];

            return {
                ...state,
                states
            };
        case "UPLOAD_FILE_SUCCESS":
            states[id].uploadingFiles = states[id].uploadingFiles.filter(
                item => item != payload
            );

            return {
                ...state,
                states
            };
        case "UPLOAD_FILE_FAILURE":
            states[id].uploadingFiles = states[id].uploadingFiles.filter(
                item => item != payload
            );

            return {
                ...state,
                states
            };

        default:
            return state;
    }
};

export default fileManagerReducer;
