import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
import { MdTouchApp } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { confirmDelete } from "../../appText";
import { selectSupplierWithNegotiation } from "../../store/actions/providerActions";

const SupplierCard = ({
    supplier,
    selectedProvider = undefined,
    haveNegotiation = true
}) => {
    const dispatch = useDispatch();
    const user = useUser();

    // @ts-ignore
    const task = useSelector(state => state.task.current);
    const isSelected = selectedProvider === supplier;

    const [container, focusClassName] = useSimpleUrlFocus(
        supplier.id,
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
    } = supplier;

    const isMine = haveNegotiation ? task && user.id == task.usuario.id : false;

    const handleEdit = e => {
        e.preventDefault();

        const providerToEdit = { ...supplier };

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

    const handleSelectSupplier = e => {
        e.preventDefault();

        if (confirm(confirmDelete)) {
            dispatch(selectSupplierWithNegotiation(supplier));
        }
    };

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

                    {supplier.pivot && !selectedProvider && (
                        <p className="card-text text-muted">
                            Productos cargados :{" "}
                            {supplier.pivot.cantidad_productos}
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
                        provider={supplier}
                        selectedProvider={selectedProvider}
                    />
                )}
            </div>

            <div className="card-footer d-flex flex-wrap justify-content-end">
                <button
                    className="btn btn-primary btn-sm mr-2"
                    onClick={handleEdit}
                >
                    <FaRegEdit className="icon-normal mr-2" />
                    Editar
                </button>
                {isMine && !selectedProvider && (
                    <button
                        type="button"
                        className="btn btn-info btn-sm"
                        onClick={handleSelectSupplier}
                    >
                        <MdTouchApp className="icon-normal mr-2" />
                        Seleccionar esta empresa
                    </button>
                )}
            </div>
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
