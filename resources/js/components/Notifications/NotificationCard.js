import React from "react";
import { FaRegHandshake } from "react-icons/fa";
import { GiGearHammer, GiLargePaintBrush } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { markAsRead } from "../../store/actions/notificationActions";
import { getElapsedTimeString } from "../../utils";
import { AiFillWarning } from "react-icons/ai";
import {
    FcAssistant,
    FcComments,
    FcFactoryBreakdown,
    FcInTransit,
    FcMoneyTransfer,
    FcOk,
    FcServices,
    FcTodoList,
    FcUpload
} from "react-icons/fc";

const iconClassName = "text-dark icon-large mr-3 flex-shrink-0";
const dangerIconClassName = "text-danger icon-large mr-3 flex-shrink-0";
const subIconClassName = "text-dark mr-3 notification-sub-icon flex-shrink-0";

const ArtIncidentIcon = () => {
    return (
        <div className="notification-icon-parent">
            <AiFillWarning className={dangerIconClassName} />
            <GiLargePaintBrush className={subIconClassName} />
        </div>
    );
};

const ProductionIncidentIcon = () => {
    return (
        <div className="notification-icon-parent">
            <AiFillWarning className={dangerIconClassName} />
            <FcServices className={subIconClassName} />
        </div>
    );
};

const ClaimIncidentIcon = () => {
    return (
        <div className="notification-icon-parent">
            <FcComments className={dangerIconClassName} />
            <FcAssistant className={subIconClassName} />
        </div>
    );
};

const titles = {
    tarea_asignada: {
        title: "Tarea Asignada",
        icon: <FcTodoList className={iconClassName} />
    },
    empresa_agregada: {
        title: "Empresa Agregada",
        icon: <FcFactoryBreakdown className={iconClassName} />
    },
    salida_puerto_origen: {
        title: "Salida de Puerto Origen",
        icon: <FcInTransit className={iconClassName} />
    },
    iniciar_negociacion: {
        title: "Negociación Iniciada",
        icon: <FaRegHandshake className={iconClassName} />
    },
    cargar_productos: {
        title: "Productos Cargados",
        icon: <FcUpload className={iconClassName} />
    },
    cargar_compras: {
        title: "Órdenes de Compra Cargadas",
        icon: <FcUpload className={iconClassName} />
    },
    iniciar_arte: {
        title: "Arte Iniciada",
        icon: <GiLargePaintBrush className={iconClassName} />
    },

    arte_ficha: {
        title: "Incidencia con Creación de Fichas",
        icon: <ArtIncidentIcon />
    },
    validacion_ficha: {
        title: "Incidencia con Validación de Fichas",
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
        icon: <FcServices className={iconClassName} />
    },
    pago_anticipado: {
        title: "Pago Anticipado Agregado",
        icon: <FcMoneyTransfer className={iconClassName} />
    },
    pago_restante: {
        title: "Pago Balance Agregado",
        icon: <FcMoneyTransfer className={iconClassName} />
    },

    incidencia_inicio_produccion: {
        title: "Incidencia con Inicio de Producción",
        icon: <ProductionIncidentIcon />
    },
    incidencia_fin_produccion: {
        title: "Incidencia con Fin de Producción",
        icon: <ProductionIncidentIcon />
    },
    incidencia_transito_normalizacion: {
        title: "Incidencia con Transito Nacionalización",
        icon: <ProductionIncidentIcon />
    },

    inicio_produccion: {
        title: "Producción Iniciada",
        icon: <GiGearHammer className={iconClassName} />
    },
    fin_produccion: {
        title: "Producción Finalizada",
        icon: (
            <div className="notification-icon-parent">
                <FcServices className={iconClassName} />
                <FcOk className={subIconClassName} />
            </div>
        )
    },

    recepcion_carga: {
        title: "Comentario en Recepción de Mercancía",
        icon: <ClaimIncidentIcon />
    },
    inspeccion_carga: {
        title: "Comentario en Inspección de Carga",
        icon: <ClaimIncidentIcon />
    },
    reclamo_devolucion_carga: {
        title: "Comentario en Reclamos y Devoluciones",
        icon: <ClaimIncidentIcon />
    },

    cambio_creacion_fichas: {
        title: "Creación de Fichas",
        icon: <GiLargePaintBrush className={iconClassName} />
    },
    cambio_validacion_fichas: {
        title: "Validación de Fichas",
        icon: <GiLargePaintBrush className={iconClassName} />
    },
    cambio_creacion_boceto: {
        title: "Creación de Bocetos",
        icon: <GiLargePaintBrush className={iconClassName} />
    },
    cambio_validacion_boceto: {
        title: "Validación de Bocetos",
        icon: <GiLargePaintBrush className={iconClassName} />
    },
    cambio_confirmacion_proveedor: {
        title: "Confirmación de Proveedor",
        icon: <GiLargePaintBrush className={iconClassName} />
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
