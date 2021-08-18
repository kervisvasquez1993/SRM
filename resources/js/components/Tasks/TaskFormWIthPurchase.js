import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSuppliers } from "../../store/actions/providerActions";
import { createTask, editTask } from "../../store/actions/taskActions";
import InputSelect from "../Form/InputSelect";
import InputText from "../Form/InputText";
import InputTextArea from "../Form/InputTextarea";
import GenericFormModal from "../Table/GenericFormModal";

const TaskFormWIthPurchase = ({
    task = { proveedor_id: -1 },
    isEditor = false
}) => {
    const dispatch = useDispatch();
    // @ts-ignore
    const suppliers = useSelector(state => state.provider.fullList);

    useEffect(() => {
        dispatch(getSuppliers());
    }, []);

    const handleSubmit = data => {
        if (isEditor) {
            dispatch(editTask(data));
        } else {
            dispatch(createTask(data));
        }
    };

    return (
        <GenericFormModal formData={task} onSubmit={handleSubmit}>
            <div className="form-row">
                <InputText id="nombre" label="Titulo de la Tarea" />
            </div>

            <div className="form-row">
                <InputTextArea id="descripcion" label="Descripción" />
            </div>

            <div className="form-row">
                <InputSelect id="proveedor_id" label="Empresa">
                    {suppliers.map(supplier => {
                        return (
                            <option key={supplier.id} value={supplier.id}>
                                {`${supplier.nombre} - País: ${supplier.pais} - Ciudad: ${supplier.ciudad}`}
                            </option>
                        );
                    })}
                </InputSelect>
            </div>
        </GenericFormModal>
    );
};

export default TaskFormWIthPurchase;
