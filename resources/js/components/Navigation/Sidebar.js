import React from "react";
import { FaRegHandshake } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store/actions/authActions";
import { closeSidebar } from "../../store/actions/sidebarActions";
import PageLogo from "../Widgets/PageLogo";

const Sidebar = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    const closeMenu = () => {
        dispatch(closeSidebar());
    };

    const handleLogout = e => {
        e.preventDefault();

        dispatch(logout());
    };

    return (
        <div className="menu">
            <div className="logo">
                <button className="" onClick={closeMenu}>
                    <PageLogo />
                </button>
            </div>

            <nav>
                <Link className="menu-link" to="/home" onClick={closeMenu}>
                    <div className="link-container">
                        <i className="material-icons">dashboard</i>
                        <p>Inicio</p>
                    </div>
                </Link>

                {user.rol === "coordinador" && (
                    <Link className="menu-link" to="/users" onClick={closeMenu}>
                        <div className="link-container">
                            <i className="material-icons">person</i>
                            <p>Usuarios</p>
                        </div>
                    </Link>
                )}

                {(user.rol === "coordinador" || user.rol === "observador") && (
                    <Link className="menu-link" to="/tasks" onClick={closeMenu}>
                        <div className="link-container">
                            <i className="material-icons">task_alt</i>
                            <p>Asignación de Tareas </p>
                        </div>
                    </Link>
                )}

                {(user.rol === "coordinador" || user.rol === "comprador") && (
                    <Link
                        className="menu-link"
                        to="/me/tasks"
                        onClick={closeMenu}
                    >
                        <div className="link-container">
                            <i className="material-icons">task</i>
                            <p>Mis Tareas</p>
                        </div>
                    </Link>
                )}

                {(user.rol === "coordinador" || user.rol === "observador") && (
                    <Link
                        className="menu-link"
                        to="/negotiations"
                        onClick={closeMenu}
                    >
                        <div className="link-container">
                            <FaRegHandshake className="material-icons" />
                            <p>Negociaciones</p>
                        </div>
                    </Link>
                )}

                {(user.rol === "artes" ||
                    user.rol === "coordinador" ||
                    user.rol === "observador") && (
                    <Link className="menu-link" to="/arts" onClick={closeMenu}>
                        <div className="link-container">
                            <i className="material-icons">brush</i>
                            <p>Artes</p>
                        </div>
                    </Link>
                )}

                {(user.rol === "coordinador" ||
                    user.rol === "comprador" ||
                    user.rol === "observador") && (
                    <React.Fragment>
                        <Link
                            className="menu-link"
                            to="/productions"
                            onClick={closeMenu}
                        >
                            <div className="link-container">
                                <i className="material-icons">
                                    precision_manufacturing
                                </i>
                                <p>Producción y Transito</p>
                            </div>
                        </Link>
                        <Link
                            className="menu-link"
                            to="/claims"
                            onClick={closeMenu}
                        >
                            <div className="link-container">
                                <i className="material-icons">
                                    production_quantity_limits
                                </i>
                                <p>Reclamos y Devoluciones</p>
                            </div>
                        </Link>
                    </React.Fragment>
                )}

                <a
                    className="menu-link mt-4 cerrar-sesion"
                    onClick={handleLogout}
                    href="#"
                >
                    <div className="link-container">
                        <i className="material-icons">logout</i>
                        <p>Cerrar Sesión</p>
                    </div>
                </a>
            </nav>
        </div>
    );
};

export default Sidebar;
