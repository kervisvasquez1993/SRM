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

function extractError(errors, error) {
    if (errors[error]) {
        return errors[error][0];
    }
}

export const emptyTask = {
    nombre: "",
    user_id: "",
    fecha_fin: "",
    descripcion: ""
};

const TaskModal = ({ task, isEditor }) => {
    const dispatch = useDispatch();

    const [users, setUsers] = useState([]);
    const [data, setData] = useState({ ...task });

    const isEditing = useSelector(state => state.task.isEditing);
    const errors = useSelector(state => state.task.errors);

    useEffect(() => {
        axios.get(`${apiURL}/user`).then(response => {
            const filteredList = response.data.data.filter(
                user => user.rol === "coordinador" || user.rol === "comprador"
            );

            setUsers(filteredList);
        });
    }, []);

    const handleChange = e => {
        const { id, value } = e.target;

        setData(data => {
            return {
                ...data,
                [id]: value
            };
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (isEditor) {
            dispatch(editTask(task.id, data));
        } else {
            dispatch(createTask(data));
        }
    };

    const handleReset = e => {
        setData({ ...emptyTask });
    };

    return (
        <div className="modal-body">
            <GenericForm
                handleSubmit={handleSubmit}
                disableSubmit={isEditing}
                handleReset={handleReset}
                onChange={handleChange}
                values={data}
                errors={errors}
            >
                <InputText id="nombre" label="Titulo de la Tarea" />

                <InputSelect id="user_id" label="Comprador">
                    {users.map(user => {
                        return (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        );
                    })}
                </InputSelect>

                <InputDate id="fecha_fin" label="Fecha Finalizacion" />

                <InputTextArea id="descripcion" label="Descripción" />
            </GenericForm>
        </div>
    );
};

export default TaskModal;
