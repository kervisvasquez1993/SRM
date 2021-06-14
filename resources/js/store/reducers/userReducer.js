const defaultState = {
    users: []
};

const userReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "GET_USERS_REQUEST":
            return {
                ...state
            };
        case "GET_USERS_SUCCESS":
            return {
                ...state,
                users: payload
            };
        case "GET_USERS_FAILURE":
            return {
                ...state
            };
        default:
            return state;
    }
};

export default userReducer;
