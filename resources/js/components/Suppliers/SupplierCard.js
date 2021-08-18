import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { openModal } from "../../store/actions/modalActions";
// import { startNegotiation } from "../../store/actions/providerActions";
import {
    greenCard,
    normalCard,
    redCard,
    useSimpleUrlFocus,
    useUser
} from "../../utils";
import SupplierFormModal from "./SupplierFormModal";
import SupplierCardStatus from "./SupplierCardStatus";

const SupplierCard = ({
    provider,
    selectedProvider = undefined,
    haveNegotiation = true
}) => {
    const dispatch = useDispatch();
    const user = useUser();

    // @ts-ignore
    const task = useSelector(state => state.task.task);
    const isSelected = selectedProvider === provider;

    const [container, focusClassName] = useSimpleUrlFocus(
        provider.id,
        "providerId"
    );

    const {
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

    const isMine = !haveNegotiation || (task && user.id == task.usuario.id);

    const handleEdit = e => {
        e.preventDefault();

        const providerToEdit = { ...provider };

        dispatch(
            openModal({
                title: "Editar Empresa",
                body: (
                    <SupplierFormModal
                        provider={providerToEdit}
                        isEditor={true}
                    />
                )
            })
        );
    };

    // const handleNegotiate = e => {
    //     e.preventDefault();

    //     dispatch(startNegotiation(taskId, id));
    // };

    const { text, background } = isSelected
        ? greenCard
        : selectedProvider
        ? redCard
        : normalCard;

    const content = (
        <div
            className={`card supplier-card fade-in ${text} ${background} ${focusClassName}`}
            ref={container}
        >
            <div className="card-header pb-0">
                <div className="d-flex justify-content-between flex-wrap">
                    <h3 className="card-title">{nombre}</h3>

                    {provider.pivot && !selectedProvider && (
                        <p className="card-text text-muted">
                            Productos cargados :{" "}
                            {provider.pivot.cantidad_productos}
                        </p>
                    )}
                </div>

                <hr className="mb-0" />
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

                {haveNegotiation && (
                    <SupplierCardStatus
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
    );

    return (
        <React.Fragment>
            {haveNegotiation ? (
                <Link
                    to={`/negotiation/${pivot.id}`}
                    style={{ cursor: "pointer" }}
                >
                    {content}
                </Link>
            ) : (
                content
            )}
        </React.Fragment>
    );
};

export default SupplierCard;
