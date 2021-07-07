import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../../store/actions/notificationActions";
import EmptyList from "../Navigation/EmptyList";
import LoadingScreen from "../Navigation/LoadingScreen";
import NotificationCard from "./NotificationCard";

const ProductionList = () => {
    const dispatch = useDispatch();
    const notifications = useSelector(state => state.notification.list);
    const isLoadingList = useSelector(state => state.notification.isLoadingList);
    const unreadCount = useSelector(state => state.notification.unreadCount);

    useEffect(() => {
        dispatch(getNotifications());
    }, [unreadCount]);

    if (isLoadingList) {
        return <LoadingScreen />;
    }

    return (
        <React.Fragment>
            <h1 className="text-center my-5">Notificaciones</h1>
            {notifications.length > 0 ? (
                <div className="d-flex flex-column align-items-center">
                    {notifications.map(item => {
                        return <NotificationCard key={item.id} {...item} />;
                    })}
                </div>
            ) : (
                <EmptyList message="Aun no tiene notificaciones" />
            )}
        </React.Fragment>
    );
};

export default ProductionList;
