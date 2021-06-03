import React, { useState } from "react";

const ProviderCard = () => {
    return (
        <div className="card">
            <div className="card-header">
                <div className="d-flex justify-content-between w-100">
                    <h3 className="card-title">Nombre de la Empresa</h3>
                    <div className="d-flex">
                        <button className="btn btn-sm btn-outline-primary btn-round">
                            Negociar
                        </button>
                    </div>
                </div>
                <hr/>
            </div>

            <div className="card-body">
                <p className="card-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Morbi lacinia tristique risus, id bibendum magna. In mattis
                    aliquam risus, nec convallis eros placerat ac. Ut sed tortor
                    dapibus, sodales turpis vitae, interdum odio. Proin
                    tincidunt quis lectus aliquet pellentesque. Pellentesque
                    finibus nec magna id placerat.
                </p>

                <h3 className="card-title mb-2">Ubicación</h3>

                <p className="card-text">
                    <strong>País : </strong>Lorem ipsum dolor sit amet
                </p>

                <p className="card-text">
                    <strong>Ciudad : </strong>Lorem ipsum dolor sit amet
                </p>

                <p className="card-text">
                    <strong>Distrito : </strong>Lorem ipsum dolor sit amet
                </p>

                <h3 className="card-title mb-2">Contacto</h3>
                <p className="card-text">
                    <strong>Direccion : </strong>Lorem ipsum dolor sit amet
                </p>
                <p className="card-text">
                    <strong>Teléfono : </strong>Lorem ipsum dolor sit amet
                </p>
                <p className="card-text">
                    <strong>Contacto : </strong>Lorem ipsum dolor sit amet
                </p>
                <p className="card-text">
                    <strong>Email : </strong>Lorem ipsum dolor sit amet
                </p>
                <p className="card-text">
                    <strong>Contacto : </strong>Lorem ipsum dolor sit amet
                </p>
            </div>

            <div className="card-footer">
                <div className="d-flex justify-content-end w-100">
                    <div className="d-flex">
                        <button className="btn btn-sm btn-outline-warning btn-round mr-2">
                            <span className="material-icons">edit</span>
                            Editar
                        </button>
                    </div>
                </div>
                <hr />
            </div>
        </div>
    );
};

export default ProviderCard;
