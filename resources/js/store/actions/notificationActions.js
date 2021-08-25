import axios from "axios";
import { apiURL } from "../../components/App";

export function getNotifications() {
    return async (dispatch, _getState) => {
        dispatch(getUnreadNotificationsCount());
        dispatch({ type: "GET_NOTIFICATIONS_REQUEST" });

        try {
            const response = await axios.get(`${apiURL}/notificacion`);

            dispatch({
                type: "GET_NOTIFICATIONS_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            dispatch({
                type: "GET_NOTIFICATIONS_FAILURE"
            });
        }
    };
}

export function getUnreadNotificationsCount() {
    return async (dispatch, _getState) => {
        dispatch({ type: "GET_UNREAD_NOTIFICATIONS_COUNT_REQUEST" });

        try {
            const response = await axios.get(`${apiURL}/notificacion/count`);

            dispatch({
                type: "GET_UNREAD_NOTIFICATIONS_COUNT_SUCCESS",
                payload: response.data.data.unread_count
            });
        } catch (e) {
            dispatch({
                type: "GET_UNREAD_NOTIFICATIONS_COUNT_FAILURE"
            });
        }
    };
}

export function markAsRead(id) {
    return async (dispatch, _getState) => {
        dispatch({ type: "MARK_AS_READ_REQUEST" });

        try {
            await axios.patch(`${apiURL}/notificacion/${id}`);

            dispatch({
                type: "MARK_AS_READ_SUCCESS"
            });

            dispatch(getNotifications());
            dispatch(getUnreadNotificationsCount());
        } catch (e) {
            dispatch({
                type: "MARK_AS_READ_FAILURE"
            });
        }
    };
}

export function markAllAsRead() {
    return async (dispatch, _getState) => {
        dispatch({ type: "MARK_ALL_AS_READ_REQUEST" });

        try {
            const response = await axios.post(
                `${apiURL}/notificacion/marcar_como_leidas`
            );

            dispatch({
                type: "MARK_ALL_AS_READ_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            dispatch({
                type: "MARK_ALL_AS_READ_FAILURE"
            });
        }
    };
}
