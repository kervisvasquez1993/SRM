import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store/actions/authActions";
import { closeSidebar } from "../../store/actions/sidebarActions";

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
                <Link
                    to="/home"
                    className="simple-text logo-normal"
                    onClick={closeMenu}
                >
                    SRM Dynamics
                </Link>
            </div>

            <nav>
                <Link className="menu-link" to="/home" onClick={closeMenu}>
                    <i className="material-icons">dashboard</i>
                    <p>Inicio</p>
                </Link>

                {user.rol === "coordinador" && (
                    <Link
                        className="menu-link"
                        to="/create-user"
                        onClick={closeMenu}
                    >
                        <i className="material-icons">person</i>
                        <p>Crear Usuario</p>
                    </Link>
                )}

                {(user.rol === "coordinador" || user.rol === "observador") && (
                    <Link className="menu-link" to="/tasks" onClick={closeMenu}>
                        <i className="material-icons">task_alt</i>
                        <p>Asignacion de Tareas </p>
                    </Link>
                )}

                {(user.rol === "coordinador" || user.rol === "comprador") && (
                    <Link
                        className="menu-link"
                        to="/me/tasks"
                        onClick={closeMenu}
                    >
                        <i className="material-icons">task</i>
                        <p>Mis Tareas</p>
                    </Link>
                )}

                {(user.rol === "coordinador" || user.rol === "observador") && (
                    <Link
                        className="menu-link"
                        to="/negotiations"
                        onClick={closeMenu}
                    >
                        <i className="material-icons">business</i>
                        <p>Negociaciones</p>
                    </Link>
                )}

                {(user.rol === "artes" ||
                    user.rol === "coordinador" ||
                    user.rol === "observador") && (
                    <Link className="menu-link" to="/arts" onClick={closeMenu}>
                        <i className="material-icons">brush</i>
                        <p>Artes</p>
                    </Link>
                )}

                {(user.rol === "coordinador" ||
                    user.rol === "comprador" ||
                    user.rol === "observador") && (
                    <React.Fragment>
                        <Link
                            className="menu-link"
                            to="/production"
                            onClick={closeMenu}
                        >
                            <i className="material-icons">
                                precision_manufacturing
                            </i>
                            <p>Produccion y Transito</p>
                        </Link>
                        <Link
                            className="menu-link"
                            to="/claims"
                            onClick={closeMenu}
                        >
                            <i className="material-icons">
                                production_quantity_limits
                            </i>
                            <p>Reclamos y Devoluciones</p>
                        </Link>
                    </React.Fragment>
                )}

                <a
                    className="menu-link mt-4 cerrar-sesion"
                    onClick={handleLogout}
                    href="#"
                >
                    <i className="material-icons">logout</i>
                    <p>Cerrar Sesión</p>
                </a>
            </nav>
        </div>
    );
};

export default Sidebar;
