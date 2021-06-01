import axios from "axios";
import React from "react";

const Navbar = () => {
    const handleLogout = e => {
        axios.post("logout").then();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    aria-controls="navigation-index"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="sr-only">Toggle navigation</span>
                    <span className="navbar-toggler-icon icon-bar"></span>
                    <span className="navbar-toggler-icon icon-bar"></span>
                    <span className="navbar-toggler-icon icon-bar"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link"
                                href="http://example.com"
                                id="navbarDropdownMenuLink"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <i className="material-icons">notifications</i>
                                <span className="notification">5</span>
                                <p className="d-lg-none d-md-block">
                                    Some Actions
                                </p>
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link"
                                href="/profile"
                                id="navbarDropdownProfile"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <i className="material-icons">person</i>
                                <p className="d-lg-none d-md-block">Account</p>
                                {user.name}
                            </a>
                            <div
                                className="dropdown-menu dropdown-menu-right"
                                aria-labelledby="navbarDropdownProfile"
                            >
                                <a
                                    className="dropdown-item"
                                    href="{{ route('logout') }}"
                                    onClick={handleLogout}
                                >
                                    Cerrar Sesion
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
