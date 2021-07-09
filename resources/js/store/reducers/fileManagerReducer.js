const defaultState = {
    states: {},
    inspectionFiles: [],
    uploadingFiles: []
};

const fileManagerReducer = (state = defaultState, action) => {
    const { type, payload, id } = action;

    let states = { ...state.states };

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

        case "GET_FILES_SUCCESS":
            if (!(id in states)) {
                states[id] = {
                    files: [],
                    uploadingFiles: [],
                    deletingFileId: null
                };
            }

            states[id].files = payload;

            return {
                ...state,
                states
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
