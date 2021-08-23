import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdAddCircle } from "react-icons/io";
import { openModal } from "../../store/actions/modalActions";
import SupplierFormModal, { emptyProvider } from "./SupplierFormModal";
import { getSuppliers } from "../../store/actions/providerActions";
import { createNegotiation } from "../../store/actions/negotiationActions";

const SupplierModal = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const taskId = useSelector(state => state.task.current).id;
    // @ts-ignore
    const taskSuppliers = useSelector(state => state.provider.list);
    // @ts-ignore
    const allProviders = useSelector(state => state.provider.fullList);
    const [proveedorId, setProveedorId] = useState("");
    const [shownProviders, setShownProviders] = useState(allProviders);

    const handleCreateNewProvider = () => {
        dispatch(
            openModal({
                title: "Agregar Empresa",
                body: <SupplierFormModal provider={emptyProvider} />
            })
        );
    };

    useEffect(() => {
        dispatch(getSuppliers());
    }, []);

    useEffect(() => {
        // Filter the provider list to remove the providers added to the same task
        const newProviders = allProviders.filter(
            i => !taskSuppliers.find(j => j.id === i.id)
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
            {shownProviders.length > 0 && (
                <React.Fragment>
                    <h3 className="text-center mb-5">
                        Agregar Empresa Existente
                    </h3>
                    <form className="form-horizontal">
                        <div className="form-row">
                            <div className="col-md-12 mb-3">
                                <select
                                    className={"custom-select"}
                                    id="proveedor_id"
                                    name="proveedor_id"
                                    value={proveedorId}
                                    onChange={e =>
                                        setProveedorId(e.target.value)
                                    }
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
                                disabled={proveedorId === ""}
                            >
                                <IoMdAddCircle className="mr-2" />
                                Agregar
                            </button>
                        </div>
                    </form>
                    <hr className="my-5" />
                </React.Fragment>
            )}
            <h3 className="text-center mb-5">Agregar Empresa Nueva</h3>
            <div className="form-row justify-content-center">
                <button
                    className="btn btn-success btn-round mb-5"
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

export default SupplierModal;
