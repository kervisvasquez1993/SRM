import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div
            className="sidebar"
            data-color="purple"
            data-background-color="white"
            data-image="../assets/img/sidebar-1.jpg"
        >
            <div className="logo">
                <a href="" className="simple-text logo-normal">
                    SRM Dynamics
                </a>
            </div>
            <div className="sidebar-wrapper">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/home">
                            <i className="material-icons">dashboard</i>
                            <p>Inicio</p>
                        </Link>
                    </li>

                    {user.rol === "coordinador" && (
                        <React.Fragment>
                            <li className="nav-item">
                                <Link className="nav-link" to="/create-user">
                                    <i className="material-icons">person</i>
                                    <p>Crear Usuario</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/tasks">
                                    <i className="material-icons">task_alt</i>
                                    <p>Asignacion de Tareas </p>
                                </Link>
                            </li>
                        </React.Fragment>
                    )}

                    {(user.rol === "coordinador" ||
                        user.rol === "comprador") && (
                        <React.Fragment>
                            <li className="nav-item">
                                <Link className="nav-link" to="/tasks">
                                    <i className="material-icons">task</i>
                                    <p>Tareas Asignadas</p>
                                </Link>
                            </li>

                            <li className="nav-item ">
                                <Link className="nav-link" to="/negotiations">
                                    <i className="material-icons">business</i>
                                    <p>Negociaciones</p>
                                </Link>
                            </li>
                        </React.Fragment>
                    )}

                    {(user.rol === "artes" || user.rol === "coordinador") && (
                        <li className="nav-item ">
                            <Link className="nav-link" to="/arts">
                                <i className="material-icons">brush</i>
                                <p>Artes</p>
                            </Link>
                        </li>
                    )}

                    {(user.rol === "coordinador" ||
                        user.rol === "comprador") && (
                        <React.Fragment>
                            <li className="nav-item ">
                                <Link className="nav-link" to="/production">
                                    <i className="material-icons">
                                        precision_manufacturing
                                    </i>
                                    <p>Produccion y Transito</p>
                                </Link>
                            </li>
                            
                            <li className="nav-item ">
                                <Link className="nav-link" to="/claims">
                                    <i className="material-icons">
                                        production_quantity_limits
                                    </i>
                                    <p>Reclamos y Devoluciones</p>
                                </Link>
                            </li>
                        </React.Fragment>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
