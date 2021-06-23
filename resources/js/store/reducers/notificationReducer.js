const defaultState = {
    list: [],
    isLoadingList: false,
    unreadCount: 0
};

const notificationReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "GET_NOTIFICATIONS_REQUEST":
            return {
                ...state,
                isLoadingList: true
            };
        case "GET_NOTIFICATIONS_SUCCESS":
            return {
                ...state,
                list: payload,
                isLoadingList: false
            };
        case "GET_NOTIFICATIONS_FAILURE":
            return {
                ...state,
                isLoadingList: false
            };
        case "CHANGE_HISTORY":
            return {
                ...state,
                isLoadingList: true
            };

        case "GET_UNREAD_NOTIFICATIONS_COUNT_SUCCESS":
            return {
                ...state,
                unreadCount: payload
            };

        default:
            return state;
    }
};

export default notificationReducer;
