import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask, editTask } from "../../store/actions/taskActions";
import InputSelect from "../Form/InputSelect";
import InputText from "../Form/InputText";
import InputDate from "../Form/InputDate";
import InputTextArea from "../Form/InputTextarea";
import GenericFormModal from "../Table/GenericFormModal";
import { getUsers } from "../../store/actions/userActions";
import { useUser } from "../../utils";

const TaskFormModal = ({ task = {}, isEditor = false }) => {
    const dispatch = useDispatch();
    // @ts-ignore
    const users = useSelector(state => state.user.users);
    const user = useUser();
    const filteredUsers = users.filter(
        user => user.rol === "coordinador" || user.rol === "comprador"
    );

    useEffect(() => {
        dispatch(getUsers());
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

            {user.rol === "coordinador" && (
                <React.Fragment>
                    <div className="form-row">
                        <InputSelect id="user_id" label="Comprador">
                            {filteredUsers.map(user => {
                                return (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                );
                            })}
                        </InputSelect>
                    </div>

                    <div className="form-row">
                        <InputDate id="fecha_fin" label="Fecha Finalizacion" />
                    </div>
                </React.Fragment>
            )}

            <div className="form-row">
                <InputTextArea id="descripcion" label="Descripción" />
            </div>
        </GenericFormModal>
    );
};

export default TaskFormModal;
