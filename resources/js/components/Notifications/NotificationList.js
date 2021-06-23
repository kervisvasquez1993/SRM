import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../../store/actions/notificationActions";
import EmptyList from "../Navigation/EmptyList";
import NotificationCard from "./NotificationCard";

const ProductionList = () => {
    const dispatch = useDispatch();
    const notifications = useSelector(state => state.notification.list);

    useEffect(() => {
        dispatch(getNotifications());
    }, []);

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