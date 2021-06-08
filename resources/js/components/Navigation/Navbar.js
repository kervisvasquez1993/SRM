import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store/actions/authActions";
import { toggleSidebar } from "../../store/actions/sidebarActions";

const Navbar = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    const handleLogout = e => {
        dispatch(logout());
    };

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
                <span className="campana-numero">5</span>
            </Link>

            <span className="usuario-nombre">{user.name}</span>

            <button
                className="cerrar-sesion-dashboard btn btn-primary ml-3"
                onClick={handleLogout}
            >
                Cerrar Sesion
            </button>
        </nav>
    );
};

export default Navbar;
