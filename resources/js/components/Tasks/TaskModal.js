import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../store/actions/taskActions";

function extractError(errors, error) {
    if (errors[error]) {
        return errors[error][0];
    }
}

const TaskModal = () => {
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);

    const [task, setTask] = useState({
        nombre: "",
        user_id: "",
        fecha_fin: "",
        descripcion: ""
    });

    const errors = useSelector(state => state.task.errors);
    const nameError = extractError(errors, "nombre");
    const userName = extractError(errors, "user_id");
    const endDateError = extractError(errors, "fecha_fin");
    const descriptionError = extractError(errors, "descripcion");

    useEffect(() => {
        axios.get("api/user").then(response => {
            const filteredList = response.data.data.filter(
                user => user.rol === "coordinador" || user.rol === "comprador"
            );
            setUsers(filteredList);
        });
    }, []);

    const handleChange = e => {
        const id = e.target.id;

        setTask({
            ...task,
            [id]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(createTask(task));
    };

    return (
        <form className="form-horizontal" onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="col-md-12 mb-3">
                    <label htmlFor="nombre">
                        Titulo de la Tarea<span className="red">*</span>
                    </label>
                    <input
                        type="text"
                        className={
                            "form-control " + (nameError && "is-invalid")
                        }
                        id="nombre"
                        name="nombre"
                        onChange={handleChange}
                        value={task.nombre}
                    />
                    {nameError && (
                        <div className="text-danger">
                            <strong>{nameError}</strong>
                        </div>
                    )}
                </div>
            </div>

            <div className="form-row">
                <div className="col-md-12 mb-3">
                    <label htmlFor="user_id">
                        Comprador:<span className="red">*</span>
                    </label>
                    <select
                        className={
                            "custom-select " + (userName && "is-invalid")
                        }
                        id="user_id"
                        name="user_id"
                        onChange={handleChange}
                        value={task.user_id}
                    >
                        <option disabled value="">
                            Selecciona...
                        </option>
                        {users.map(user => {
                            return (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            );
                        })}
                    </select>
                    {userName && (
                        <div className="text-danger">
                            <strong>{userName}</strong>
                        </div>
                    )}
                </div>
            </div>

            <div className="form-row">
                <div className="col-md-12 mb-3">
                    <label htmlFor="fecha_fin">
                        Fecha Finalizacion<span className="red">*</span>
                    </label>
                    <input
                        type="date"
                        id="fecha_fin"
                        name="fecha_fin"
                        className={
                            "form-control " + (endDateError && "is-invalid")
                        }
                        pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}"
                        onChange={handleChange}
                        value={task.fecha_fin}
                    />
                    {endDateError && (
                        <div className="text-danger">
                            <strong>{endDateError}</strong>
                        </div>
                    )}
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="descripcion">
                    Mensaje:<span className="red">*</span>
                </label>
                <textarea
                    className="form-control"
                    id="descripcion"
                    name="descripcion"
                    rows="5"
                    onChange={handleChange}
                    value={task.descripcion}
                ></textarea>
                {descriptionError && (
                    <div className="text-danger">
                        <strong>{descriptionError}</strong>
                    </div>
                )}
            </div>

            <div className="form-group mb-10">
                <button
                    className="btn btn-sm btn-outline-success btn-round"
                    type="submit"
                >
                    Enviar
                </button>
                <button
                    className="btn btn-sm btn-outline-warning btn-round"
                    type="reset"
                    name="reset"
                >
                    Limpiar
                </button>
            </div>
        </form>
    );
};

export default TaskModal;
