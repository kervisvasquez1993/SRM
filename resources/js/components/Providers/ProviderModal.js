import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdAddCircle } from "react-icons/io";
import { openModal } from "../../store/actions/modalActions";
import ProviderFormModal, { emptyProvider } from "./ProviderFormModal";
import { useParams } from "react-router-dom";
import { getProviders } from "../../store/actions/providerActions";
import { createNegotiation } from "../../store/actions/negotiationActions";

const ProviderModal = () => {
    const dispatch = useDispatch();
    const taskId = useSelector(state => state.task.task).id;
    const taskProviders = useSelector(state => state.provider.providers);
    const allProviders = useSelector(state => state.provider.allProviders);
    const [proveedorId, setProveedorId] = useState("");
    const [shownProviders, setShownProviders] = useState(allProviders);

    const handleCreateNewProvider = () => {
        dispatch(
            openModal({
                title: "Agregar Empresa",
                body: (
                    <ProviderFormModal
                        provider={emptyProvider}
                        taskId={taskId}
                    />
                )
            })
        );
    };

    useEffect(() => {
        dispatch(getProviders());
    }, []);

    useEffect(() => {
        // Filter the provider list to remove the providers added to the same task
        const newProviders = allProviders.filter(
            i => !taskProviders.find(j => j.id === i.id)
        );
        
        // Set the new list for the form
        setShownProviders(newProviders);
    }, [allProviders]);

    const handleAddProvider = e => {
        e.preventDefault();

        const data = {
            tarea_id: taskId,
            proveedor_id: proveedorId
        };

        dispatch(createNegotiation(data));
    };

    return (
        <div className="modal-body">
            <h3 className="text-center">Agregar Empresa Existente</h3>
            <p>Selecciona una empresa de la siguiente lista:</p>
            <form className="form-horizontal">
                <div className="form-row">
                    <div className="col-md-12 mb-3">
                        <select
                            className={"custom-select"}
                            id="proveedor_id"
                            name="proveedor_id"
                            value={proveedorId}
                            onChange={e => setProveedorId(e.target.value)}
                        >
                            <option value="">Selecciona...</option>
                            {shownProviders.map(provider => {
                                return (
                                    <option
                                        key={provider.id}
                                        value={provider.id}
                                    >
                                        {`${provider.nombre} - País: ${provider.pais} - Ciudad: ${provider.ciudad}`}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <button
                        className="btn btn-success btn-round"
                        type="submit"
                        onClick={handleAddProvider}
                    >
                        <IoMdAddCircle className="mr-2" />
                        Agregar
                    </button>
                </div>
            </form>
            <hr className="my-5" />
            <h3 className="text-center">Agregar Empresa Nueva</h3>
            <p>O cree una empresa totalmente desde cero:</p>
            <div className="form-row justify-content-center">
                <button
                    className="btn btn-success btn-round"
                    type="submit"
                    onClick={handleCreateNewProvider}
                >
                    <IoMdAddCircle className="mr-2" />
                    Agregar Empresa Nueva
                </button>
            </div>
        </div>
    );
};

export default ProviderModal;
