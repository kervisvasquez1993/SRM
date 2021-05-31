import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="menu">
            <div className="logo">
                <a href="" className="simple-text logo-normal">
                    SRM Dynamics
                </a>
            </div>

            <nav>
                <Link className="menu-link" to="/home">
                    <i className="material-icons">dashboard</i>
                    <p>Inicio</p>
                </Link>

                {user.rol === "coordinador" && (
                    <React.Fragment>
                        <Link className="menu-link" to="/create-user">
                            <i className="material-icons">person</i>
                            <p>Crear Usuario</p>
                        </Link>
                        <Link className="menu-link" to="/tasks">
                            <i className="material-icons">task_alt</i>
                            <p>Asignacion de Tareas </p>
                        </Link>
                    </React.Fragment>
                )}

                {(user.rol === "coordinador" || user.rol === "comprador") && (
                    <React.Fragment>
                        <Link className="menu-link" to="/tasks">
                            <i className="material-icons">task</i>
                            <p>Tareas Asignadas</p>
                        </Link>
                        <Link className="menu-link" to="/negotiations">
                            <i className="material-icons">business</i>
                            <p>Negociaciones</p>
                        </Link>
                    </React.Fragment>
                )}

                {(user.rol === "artes" || user.rol === "coordinador") && (
                    <Link className="menu-link" to="/arts">
                        <i className="material-icons">brush</i>
                        <p>Artes</p>
                    </Link>
                )}

                {(user.rol === "coordinador" || user.rol === "comprador") && (
                    <React.Fragment>
                        <Link className="menu-link" to="/production">
                            <i className="material-icons">
                                precision_manufacturing
                            </i>
                            <p>Produccion y Transito</p>
                        </Link>
                        <Link className="menu-link" to="/claims">
                            <i className="material-icons">
                                production_quantity_limits
                            </i>
                            <p>Reclamos y Devoluciones</p>
                        </Link>
                    </React.Fragment>
                )}
            </nav>
        </div>
    );
};

export default Sidebar;
