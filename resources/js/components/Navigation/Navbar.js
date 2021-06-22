import React from "react";
import { Gestures } from "react-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store/actions/authActions";
import {
    sidebarPanLeft,
    sidebarPanRight,
    toggleSidebar
} from "../../store/actions/sidebarActions";

const Navbar = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    const handleGesture = event => {
        if (event.type === "panleft") {
            dispatch(sidebarPanLeft());
        }

        if (event.type === "panright") {
            dispatch(sidebarPanRight());
        }
    };

    return (
        <Gestures
            recognizers={{
                Pan: {
                    events: {
                        panleft: handleGesture,
                        panright: handleGesture,
                        panup: handleGesture,
                        pandown: handleGesture
                    }
                }
            }}
        >
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
                    onClick={() => dispatch(logout())}
                >
                    Cerrar Sesión
                </button>
            </nav>
        </Gestures>
    );
};

export default Navbar;
