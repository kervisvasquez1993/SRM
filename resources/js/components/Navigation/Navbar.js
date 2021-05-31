import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const handleLogout = e => {
        axios.post("logout").then();
    };

    return (
        <nav className="navbar-dashboard">
            <div className="navbar-inicio">
                <button id="botonSidebar">
                    <i className="material-icons">menu</i>
                </button>
            </div>

            <Link to="/notifications" className="campana">
                <i className="material-icons">notifications</i>
                <span className="campana-numero">5</span>
            </Link>

            <span className="usuario-nombre">{user.name}</span>

            <button
                className="cerrar-sesion-dashboard btn btn-primary"
                onClick={handleLogout}
            >
                Cerrar Sesion
            </button>
        </nav>
    );
};

export default Navbar;
