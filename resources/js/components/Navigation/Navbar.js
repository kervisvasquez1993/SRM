import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store/actions/authActions";
import { getUnreadNotificationsCount } from "../../store/actions/notificationActions";
import { toggleSidebar } from "../../store/actions/sidebarActions";

const Navbar = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const unreadNotificationsCount = useSelector(
        state => state.notification.unreadCount
    );

    useEffect(() => {
        dispatch(getUnreadNotificationsCount());

        const interval = setInterval(() => {
            dispatch(getUnreadNotificationsCount());
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <nav className="navbar-dashboard">
            <div className="navbar-inicio">
                <button
                    id="botonSidebar"
                    onClick={() => dispatch(toggleSidebar())}
                >
                    <i className="material-icons">menu</i>
                </button>
            </div>

            <Link to="/notifications" className="campana">
                <i className="material-icons">notifications</i>
                {unreadNotificationsCount > 0 && (
                    <span className="campana-numero">
                        {unreadNotificationsCount}
                    </span>
                )}
            </Link>

            <span className="usuario-nombre">{user.name}</span>

            <button
                className="cerrar-sesion-dashboard btn btn-primary ml-3"
                onClick={() => dispatch(logout())}
            >
                Cerrar Sesión
            </button>
        </nav>
    );
};

export default Navbar;
