import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="error-template text-center">
                        <h2>404</h2>
                        <div className="error-details">
                            ¡La página a la que intentas acceder no existe!
                        </div>
                        <div className="error-actions">
                            <Link to="/home" className="btn btn-primary btn-lg">
                                Inicio
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error;
