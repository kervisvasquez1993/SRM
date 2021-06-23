import React from "react";
import { BiTask } from "react-icons/bi";
import { FaRegHandshake } from "react-icons/fa";
import { HiUpload } from "react-icons/hi";
import { GiFactory, GiGearHammer } from "react-icons/gi";
import { RiShip2Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { markAsRead } from "../../store/actions/notificationActions";
import { getElapsedTimeString } from "../../utils";
import { MdBrush } from "react-icons/md";
import { AiFillWarning } from "react-icons/ai";

const ArtIncidentIcon = () => {
    return (
        <div className="notification-icon-parent">
            <AiFillWarning className="text-danger icon-large mr-3" />
            <MdBrush className="text-primary mr-3 notification-sub-icon" />
        </div>
    );
};

const titles = {
    tarea_asignada: {
        title: "Tarea Asignada",
        icon: <BiTask className="text-primary icon-large mr-3 flex-shrink-0" />
    },
    empresa_agregada: {
        title: "Empresa Agregada",
        icon: (
            <GiFactory className="text-primary icon-large mr-3 flex-shrink-0" />
        )
    },
    salida_puerto_origen: {
        title: "Salida de Puerto Origen",
        icon: (
            <RiShip2Line className="text-primary icon-large mr-3 flex-shrink-0" />
        )
    },
    iniciar_negociacion: {
        title: "Negociación Iniciada",
        icon: (
            <FaRegHandshake className="text-primary icon-large mr-3 flex-shrink-0" />
        )
    },
    cargar_productos: {
        title: "Productos Cargados",
        icon: (
            <HiUpload className="text-primary icon-large mr-3 flex-shrink-0" />
        )
    },
    cargar_compras: {
        title: "Órdenes de Compra Cargadas",
        icon: (
            <HiUpload className="text-primary icon-large mr-3 flex-shrink-0" />
        )
    },
    iniciar_arte: {
        title: "Arte Iniciada",
        icon: <MdBrush className="text-primary icon-large mr-3 flex-shrink-0" />
    },
    arte_ficha: {
        title: "Incidencia con Creación de Fichas",
        icon: <ArtIncidentIcon />
    },
    validacion_ficha: {
        title: "Incidencia con Validación de Bocetos",
        icon: <ArtIncidentIcon />
    },
    arte_boceto: {
        title: "Incidencia con Creación de Bocetos",
        icon: <ArtIncidentIcon />
    },
    validacion_boceto: {
        title: "Incidencia con Validación de Bocetos",
        icon: <ArtIncidentIcon />
    },
    confirmacion_proveedor: {
        title: "Incidencia con Confirmación de Proveedor",
        icon: <ArtIncidentIcon />
    },

    iniciar_produccion: {
        title: "Producción Iniciada",
        icon: (
            <GiGearHammer className="text-primary icon-large mr-3 flex-shrink-0" />
        )
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
                        <p className="m-0 mb-md-2">{text}</p>
                    </div>
                </div>
                <div className="ml-2">
                    {getElapsedTimeString(new Date(created_at))}
                </div>
            </Link>
        </div>
    );
};

export default NotificationCard;
