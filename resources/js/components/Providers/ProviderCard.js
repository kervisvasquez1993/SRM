import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { openModal } from "../../store/actions/modalActions";
import { startNegotiation } from "../../store/actions/providerActions";
import {
    blueCard,
    greenCard,
    normalCard,
    redCard,
    useSimpleUrlFocus,
    useUser
} from "../../utils";
import ProviderFormModal from "./ProviderFormModal";
import ProviderStatus from "./ProviderStatus";

const ProviderCard = ({ provider, selectedProvider }) => {
    const dispatch = useDispatch();
    const user = useUser();
    // @ts-ignore
    const { id: taskId } = useParams();

    // @ts-ignore
    const task = useSelector(state => state.task.task);
    const isSelected = selectedProvider === provider;

    const [container, focusClassName] = useSimpleUrlFocus(
        provider.id,
        "providerId"
    );

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

    const isMine = user.id == task.usuario.id;

    const handleEdit = e => {
        e.preventDefault();

        const providerToEdit = { ...provider };

        dispatch(
            openModal({
                title: "Editar Empresa",
                body: (
                    <ProviderFormModal
                        provider={providerToEdit}
                        isEditor={true}
                    />
                )
            })
        );
    };

    const enNegociacion = pivot.iniciar_negociacion;

    const handleNegotiate = e => {
        e.preventDefault();

        dispatch(startNegotiation(taskId, id));
    };

    const { text, background } = isSelected
        ? greenCard
        : selectedProvider
        ? redCard
        : enNegociacion
        ? blueCard
        : normalCard;

    return (
        <Link to={`/negotiation/${pivot.id}`} style={{ cursor: "pointer" }}>
            <div
                className={`card fade-in ${text} ${background} ${focusClassName}`}
                ref={container}
            >
                <div className="card-header">
                    <div className="d-flex justify-content-between w-100 flex-wrap">
                        <h3 className="card-title">{nombre}</h3>

                        {enNegociacion ? (
                            <button className="btn btn-primary btn-round">
                                Cotizar
                            </button>
                        ) : (
                            !selectedProvider &&
                            (user.rol == "coordinador" || isMine) && (
                                <div className="d-flex">
                                    <button
                                        className="btn btn btn-outline-primary btn-round"
                                        onClick={handleNegotiate}
                                    >
                                        Iniciar Negociación
                                    </button>
                                </div>
                            )
                        )}
                    </div>
                    <hr />
                </div>

                <div className="card-body">
                    <div
                        className="card-text rich-text"
                        dangerouslySetInnerHTML={{ __html: descripcion }}
                    ></div>

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
                        <ProviderStatus
                            provider={provider}
                            selectedProvider={selectedProvider}
                        />
                    )}
                </div>

                {isMine && (
                    <div className="card-footer">
                        <div className="d-flex justify-content-end w-100">
                            <div className="d-flex">
                                <button
                                    className="btn btn-primary btn-round mr-2"
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
        </Link>
    );
};

export default ProviderCard;
