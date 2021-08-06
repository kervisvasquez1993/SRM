import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../../store/actions/notificationActions";
import { dateToString } from "../../utils";
import EmptyList from "../Navigation/EmptyList";
import LoadingScreen from "../Navigation/LoadingScreen";
import NotificationCard from "./NotificationCard";

const ProductionList = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const notifications = useSelector(state => state.notification.list);
    const isLoadingList = useSelector(
        // @ts-ignore
        state => state.notification.isLoadingList
    );
    // @ts-ignore
    const unreadCount = useSelector(state => state.notification.unreadCount);

    useEffect(() => {
        dispatch(getNotifications());
    }, [unreadCount]);

    if (isLoadingList) {
        return <LoadingScreen />;
    }

    let lastEpoch = null;

    return (
        <React.Fragment>
            <h1 className="text-center my-5">Notificaciones</h1>

            <div className="notifications-container">
                {notifications.length === 0 && <EmptyList />}
                
                {notifications.map(item => {
                    let header = null;
                    const epoch = new Date(item.created_at).setHours(
                        0,
                        0,
                        0,
                        0
                    );

                    if (lastEpoch != epoch) {
                        lastEpoch = epoch;
                        header = (
                            <h2 className="h4 mt-4">
                                {dateToString(new Date(item.created_at))}
                            </h2>
                        );
                    }

                    return (
                        <React.Fragment key={item.id}>
                            {header}
                            <NotificationCard {...item} />
                        </React.Fragment>
                    );
                })}
            </div>
        </React.Fragment>
    );
};

export default ProductionList;
