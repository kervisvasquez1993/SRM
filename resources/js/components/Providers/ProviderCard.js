import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/actions/modalActions";
import { useUser } from "../../utils";
import Accordion from "../UI/Accordion";
import ProviderModal from "./ProviderModal";

const ProviderCard = ({ provider }) => {
    const dispatch = useDispatch();
    const user = useUser();

    const {
        address,
        ciudad,
        contacto,
        descripcion,
        distrito,
        email,
        id,
        nombre,
        pais,
        telefono
    } = provider;

    const handleEdit = e => {
        e.preventDefault();

        const providerToEdit = { ...provider };

        dispatch(
            openModal({
                title: "Editar Empresa",
                body: (
                    <ProviderModal provider={providerToEdit} isEditor={true} />
                )
            })
        );
    };

    return (
        <div className="card">
            <div className="card-header">
                <div className="d-flex justify-content-between w-100">
                    <h3 className="card-title">{nombre}</h3>

                    {(user.rol == "coordinador" || user.rol == "comprador") && (
                        <div className="d-flex">
                            <button className="btn btn-sm btn-outline-primary btn-round">
                                Negociar
                            </button>
                        </div>
                    )}
                </div>
                <hr />
            </div>

            <div className="card-body">
                <p className="card-text">{descripcion}</p>

                {(pais || ciudad || distrito) && (
                    <React.Fragment>
                        <h3 className="card-title mb-2">Ubicación</h3>

                        {pais && (
                            <p className="card-text text-capitalize">
                                <strong>País : </strong>
                                {pais.toLowerCase()}
                            </p>
                        )}

                        {ciudad && (
                            <p className="card-text">
                                <strong>Ciudad : </strong>
                                {ciudad}
                            </p>
                        )}

                        {distrito && (
                            <p className="card-text">
                                <strong>Distrito : </strong>
                                {distrito}
                            </p>
                        )}
                    </React.Fragment>
                )}

                {(address || telefono || contacto || email) && (
                    <React.Fragment>
                        <h3 className="card-title mb-2">Contacto</h3>

                        {address && (
                            <p className="card-text">
                                <strong>Direccion : </strong>
                                {address}
                            </p>
                        )}

                        {telefono && (
                            <p className="card-text">
                                <strong>Teléfono : </strong>
                                {telefono}
                            </p>
                        )}
                        {contacto && (
                            <p className="card-text">
                                <strong>Contacto : </strong>
                                {contacto}
                            </p>
                        )}

                        {email && (
                            <p className="card-text">
                                <strong>Email : </strong>
                                {email}
                            </p>
                        )}

                        {contacto && (
                            <p className="card-text">
                                <strong>Contacto : </strong>
                                {contacto}
                            </p>
                        )}
                    </React.Fragment>
                )}

                {/* {(pais || ciudad || distrito) && (
                    <Accordion title="Ubicación" defaultState="close">
                        <h3 className="card-title mb-2">Ubicación</h3>

                        {pais && (
                            <p className="card-text text-capitalize">
                                <strong>País : </strong>
                                {pais.toLowerCase()}
                            </p>
                        )}

                        {ciudad && (
                            <p className="card-text">
                                <strong>Ciudad : </strong>
                                {ciudad}
                            </p>
                        )}

                        {distrito && (
                            <p className="card-text">
                                <strong>Distrito : </strong>
                                {distrito}
                            </p>
                        )}
                    </Accordion>
                )}

                {(address || telefono || contacto || email) && (
                    <Accordion title="Contacto" defaultState="close">
                        {address && (
                            <p className="card-text">
                                <strong>Direccion : </strong>
                                {address}
                            </p>
                        )}

                        {telefono && (
                            <p className="card-text">
                                <strong>Teléfono : </strong>
                                {telefono}
                            </p>
                        )}
                        {contacto && (
                            <p className="card-text">
                                <strong>Contacto : </strong>
                                {contacto}
                            </p>
                        )}

                        {email && (
                            <p className="card-text">
                                <strong>Email : </strong>
                                {email}
                            </p>
                        )}

                        {contacto && (
                            <p className="card-text">
                                <strong>Contacto : </strong>
                                {contacto}
                            </p>
                        )}
                    </Accordion>
                )} */}
            </div>

            {(user.rol == "coordinador" || user.rol == "comprador") && (
                <div className="card-footer">
                    <div className="d-flex justify-content-end w-100">
                        <div className="d-flex">
                            <button
                                className="btn btn-sm btn-outline-warning btn-round mr-2"
                                onClick={handleEdit}
                            >
                                <span className="material-icons">edit</span>
                                Editar
                            </button>
                        </div>
                    </div>
                    <hr />
                </div>
            )}
        </div>
    );
};

export default ProviderCard;
