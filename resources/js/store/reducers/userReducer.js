const defaultState = {
    users: [],
    isLoadingList: false
};

const userReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "GET_USERS_REQUEST":
            return {
                ...state,
                isLoadingList: true
            };
        case "GET_USERS_SUCCESS":
            return {
                ...state,
                users: payload,
                isLoadingList: false
            };
        case "GET_USERS_FAILURE":
            return {
                ...state,
                isLoadingList: false
            };

        case "CHANGE_HISTORY":
            return {
                ...state,
                isLoadingList: true
            };

        case "CREATE_USER_SUCCESS":
            return {
                ...state,
                users: [...state.users, payload]
            };
        default:
            return state;
    }
};

export default userReducer;
