import React from "react";

const TaskModal = () => {
    return (
        <form className="form-horizontal">
            <div className="form-row">
                <div className="col-md-12 mb-3">
                    <label htmlFor="nombre">
                        Titulo de la Tarea<span className="red">*</span>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        name="nombre"
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="col-md-12 mb-3">
                    <label htmlFor="user_id">
                        Comprador:<span className="red">*</span>
                    </label>
                    <select
                        className="custom-select"
                        id="user_id"
                        name="user_id"
                        defaultValue=""
                    >
                        <option disabled value="">Selecciona...</option>
                    </select>
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
                        className="form-control"
                        pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}"
                    />
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
                ></textarea>
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
