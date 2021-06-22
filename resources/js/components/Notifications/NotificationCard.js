import React from "react";
import { BiTask } from "react-icons/bi";
import { GiFactory } from "react-icons/gi";
import { RiShip2Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { markAsRead } from "../../store/actions/notificationActions";
import { getElapsedTimeString } from "../../utils";

const titles = {
    tarea_asignada: {
        title: "Tarea Asignada",
        icon: <BiTask className="text-primary icon-large mr-3" />
    },
    empresa_agregada: {
        title: "Empresa Agregada",
        icon: <GiFactory className="text-primary icon-large mr-3" />
    },
    salida_puerto_origen: {
        title: "Salida de Puerto Origen",
        icon: <RiShip2Line className="text-primary icon-large mr-3" />
    }
};

const NotificationCard = ({
    id,
    data: { text, link, type },
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
                    {type && type in titles && titles[type].icon}
                    <div>
                        <h2 className="h5 font-weight-bold mb-0">
                            {type && type in titles && titles[type].title}
                        </h2>
                        <p>{text}</p>
                    </div>
                </div>
                <div>{getElapsedTimeString(new Date(created_at))}</div>
            </Link>
        </div>
    );
};

export default NotificationCard;
