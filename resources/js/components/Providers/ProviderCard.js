import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { openModal } from "../../store/actions/modalActions";
import { startNegotiation } from "../../store/actions/providerActions";
import { greenCard, normalCard, useUser } from "../../utils";
import Accordion from "../UI/Accordion";
import ProviderModal from "./ProviderModal";

const ProviderCard = ({ provider }) => {
    const dispatch = useDispatch();
    const user = useUser();
    const { id: taskId } = useParams();
    const edited = useSelector(state => state.provider.edited);
    const container = useRef(null);

    useEffect(() => {
        if (edited && edited.id === provider.id) {
            container.current.focus();
        }
    }, [edited]);

    const {
        id,
        address,
        ciudad,
        contacto,
        descripcion,
        distrito,
        email,
        nombre,
        pais,
        telefono,
        pivot
    } = provider;

    const handleEdit = e => {
        e.preventDefault();

        const providerToEdit = { ...provider };

        dispatch(
            openModal({
                title: "Editar Empresa",
                body: (
                    <ProviderModal
                        provider={providerToEdit}
                        isEditor={true}
                        taskId={taskId}
                    />
                )
            })
        );
    };

    const enNegociacion = pivot.iniciar_negociacion === 1;

    const handleNegotiate = () => {
        dispatch(startNegotiation(taskId, id));
    };

    const { text, background } = enNegociacion ? greenCard : normalCard;

    return (
        <div
            className={`card fade-in ${text} ${background} ${
                edited && edited.id === id ? "jump" : ""
            }`}
            ref={container}
            tabIndex={-1}
        >
            <div className="card-header">
                <div className="d-flex justify-content-between w-100 flex-wrap">
                    <h3 className="card-title">{nombre}</h3>

                    {enNegociacion ? (
                        <Link
                            to={`/negotiation/${pivot.id}`}
                            className="btn btn-primary btn-round"
                        >
                            Ver Compra
                        </Link>
                    ) : ((user.rol == "coordinador" || user.rol == "comprador") && (
                        <div className="d-flex">
                            <button
                                className="btn btn-sm btn-outline-primary btn-round"
                                onClick={handleNegotiate}
                            >
                                Negociar
                            </button>
                        </div>
                    ))}
                </div>
                <hr />
            </div>

            <div className="card-body">
                <p className="card-text keep-line-breaks">{descripcion}</p>

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

                {enNegociacion && (
                    <div className="d-flex justify-content-center align-items-center mt-4">
                        <span className="material-icons mr-2">done</span>
                        <strong className="h4">
                            Ya se ha inciado una negociacion con esta empresa
                        </strong>
                    </div>
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
                                className="btn btn-sm btn-primary btn-round mr-2"
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
