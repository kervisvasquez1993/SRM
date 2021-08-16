import React from "react";
import { FaRegHandshake } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../../store/actions/authActions";
import { closeSidebar } from "../../store/actions/sidebarActions";
import useWindowDimensions from "../../utils";
import { sidebarBreakpoint } from "../App";
import PageLogo from "../Widgets/PageLogo";

const Sidebar = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const user = useSelector(state => state.auth.user);

    const { width } = useWindowDimensions();

    const closeMenu = () => {
        if (width < sidebarBreakpoint) {
            dispatch(closeSidebar());
        }
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
                <NavLink
                    className="menu-link"
                    to="/home"
                    onClick={closeMenu}
                    activeClassName="active"
                >
                    <div className="link-container">
                        <i className="material-icons">dashboard</i>
                        <p>Inicio</p>
                    </div>
                </NavLink>

                {user.rol === "coordinador" && (
                    <NavLink
                        className="menu-link"
                        to="/users"
                        onClick={closeMenu}
                        activeClassName="active"
                    >
                        <div className="link-container">
                            <i className="material-icons">person</i>
                            <p>Usuarios</p>
                        </div>
                    </NavLink>
                )}

                {(user.rol === "coordinador" ||
                    user.rol === "observador" ||
                    user.rol === "logistica") && (
                    <NavLink
                        className="menu-link"
                        to="/tasks"
                        onClick={closeMenu}
                        activeClassName="active"
                    >
                        <div className="link-container">
                            <i className="material-icons">task_alt</i>
                            <p>Asignación de Tareas </p>
                        </div>
                    </NavLink>
                )}

                {(user.rol === "coordinador" || user.rol === "comprador") && (
                    <NavLink
                        className="menu-link"
                        to="/me/tasks"
                        onClick={closeMenu}
                        activeClassName="active"
                    >
                        <div className="link-container">
                            <i className="material-icons">task</i>
                            <p>Mis Tareas</p>
                        </div>
                    </NavLink>
                )}

                {(user.rol === "coordinador" ||
                    user.rol === "observador" ||
                    user.rol == "comprador") && (
                    <NavLink
                        className="menu-link"
                        to="/negotiations"
                        onClick={closeMenu}
                        activeClassName="active"
                    >
                        <div className="link-container">
                            <FaRegHandshake className="material-icons" />
                            <p>Negociaciones</p>
                        </div>
                    </NavLink>
                )}

                {(user.rol === "artes" ||
                    user.rol === "coordinador" ||
                    user.rol === "observador" ||
                    user.rol === "comprador") && (
                    <NavLink
                        className="menu-link"
                        to="/arts"
                        onClick={closeMenu}
                        activeClassName="active"
                    >
                        <div className="link-container">
                            <i className="material-icons">brush</i>
                            <p>Artes</p>
                        </div>
                    </NavLink>
                )}

                {(user.rol === "coordinador" ||
                    user.rol === "comprador" ||
                    user.rol === "observador" ||
                    user.rol === "logistica") && (
                    <React.Fragment>
                        <NavLink
                            className="menu-link"
                            to="/productions"
                            onClick={closeMenu}
                            activeClassName="active"
                        >
                            <div className="link-container">
                                <i className="material-icons">
                                    precision_manufacturing
                                </i>
                                <p>Producción y Transito</p>
                            </div>
                        </NavLink>
                    </React.Fragment>
                )}

                {(user.rol === "coordinador" ||
                    user.rol === "comprador" ||
                    user.rol === "observador" ||
                    user.rol === "almacen") && (
                    <React.Fragment>
                        <NavLink
                            className="menu-link"
                            to="/claims"
                            onClick={closeMenu}
                            activeClassName="active"
                        >
                            <div className="link-container">
                                <i className="material-icons">
                                    production_quantity_limits
                                </i>
                                <p>Recepción Reclamos y Devoluciones</p>
                            </div>
                        </NavLink>
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
