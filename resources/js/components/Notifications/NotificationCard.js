import React from "react";
import { RiShip2Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { markAsRead } from "../../store/actions/notificationActions";
import { getElapsedTimeString } from "../../utils";

const titles = {
    salida_puerto_origen: {
        title: "Salida de Puerto Origen",
        icon: <RiShip2Line className="text-primary icon-large mr-3" />
    }
};

const NotificationCard = ({
    id,
    data: { body, link, tipoNotify },
    read_at,
    created_at
}) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(markAsRead(id));
    };

    return (
        <div
            className={`card my-0 p-4 notification fade-in rounded-0 ${!read_at &&
                "unread"}`}
        >
            <Link to={link} className="d-flex flex-row" onClick={handleClick}>
                <div className="flex-grow-1 d-flex align-items-center">
                    {tipoNotify && titles[tipoNotify].icon}
                    <div>
                        <h2 className="h5 font-weight-bold mb-0">
                            {tipoNotify && titles[tipoNotify].title}
                        </h2>
                        <p>{body}</p>
                    </div>
                </div>
                <div>{getElapsedTimeString(new Date(created_at))}</div>
            </Link>
        </div>
    );
};

export default NotificationCard;
