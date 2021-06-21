const defaultState = {
    list: [],
    unreadCount: 0
};

const notificationReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "GET_NOTIFICATIONS_SUCCESS":
            return {
                ...state,
                list: payload
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
