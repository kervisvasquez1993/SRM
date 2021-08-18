import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask, editTask } from "../../store/actions/taskActions";
import GenericForm from "../Form/GenericForm";
import InputSelect from "../Form/InputSelect";
import InputText from "../Form/InputText";
import InputDate from "../Form/InputDate";
import InputTextArea from "../Form/InputTextarea";
import { apiURL } from "../App";
import GenericFormModal from "../Table/GenericFormModal";

const TaskFormModal = ({ task = {}, isEditor = false }) => {
    const dispatch = useDispatch();

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`${apiURL}/user`).then(response => {
            const filteredList = response.data.data.filter(
                user => user.rol === "coordinador" || user.rol === "comprador"
            );

            setUsers(filteredList);
        });
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
                <InputSelect id="user_id" label="Comprador">
                    {users.map(user => {
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

            <div className="form-row">
                <InputTextArea id="descripcion" label="Descripción" />
            </div>
        </GenericFormModal>
    );
};

export default TaskFormModal;
