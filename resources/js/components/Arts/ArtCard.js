import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openArtModal, updateArt } from "../../store/actions/artActions";

const options = [
    {
        value: "sin_inicializar",
        label: "Sin Inicializar"
    },
    {
        value: "en_proceso",
        label: "En Proceso"
    },
    {
        value: "finalizado",
        label: "Finalizado"
    }
];

const ArtCard = ({ art }) => {
    const dispatch = useDispatch();
    const isEditingDropdowns = useSelector(
        state => state.art.isEditingDropdowns
    );

    const handleOpenManagement = () => {
        dispatch(openArtModal(art.id));
    };

    const handleInputClick = e => {
        e.stopPropagation();
    };

    const handleChange = e => {
        const data = {
            ...art,
            [e.target.id]: e.target.value
        };

        dispatch(updateArt(data));
    };

    const {
        creacion_fichas,
        validacion_fichas,
        creacion_boceto,
        validacion_boceto,
        confirmacion_proveedor
    } = art;

    const selectOptions = options.map(item => {
        return (
            <option key={item.value} value={item.value}>
                {item.label}
            </option>
        );
    });

    return (
        <div
            className={`card my-2 fade-in py-2`}
            onClick={handleOpenManagement}
            style={{ cursor: "pointer" }}
        >
            <div className="card-header ">
                <div className="row">
                    <div className="col-sm h4 d-flex mb-3">
                        <p className="m-0">
                            <span className="material-icons mr-2">
                                business
                            </span>
                            Proveedor : <strong>{art.proveedor}</strong>
                        </p>
                    </div>
                    <div className="col-sm h4 d-flex">
                        <p className="m-0">
                            <span className="material-icons mr-2">task</span>
                            Tarea : <strong>{art.tarea}</strong>
                        </p>
                    </div>
                </div>
            </div>

            <div className="card-body py-0 my-0 ml-2">
                <div className="form-group" onClick={handleInputClick}>
                    <label htmlFor="creacion_fichas">Creación de Fichas</label>
                    <select
                        className="form-control"
                        id="creacion_fichas"
                        value={creacion_fichas}
                        onChange={handleChange}
                        disabled={isEditingDropdowns}
                    >
                        {selectOptions}
                    </select>
                </div>

                <div className="form-group" onClick={handleInputClick}>
                    <label htmlFor="validacion_fichas">
                        Validación de Fichas
                    </label>
                    <select
                        className="form-control"
                        id="validacion_fichas"
                        value={validacion_fichas}
                        onChange={handleChange}
                        disabled={isEditingDropdowns}
                    >
                        {selectOptions}
                    </select>
                </div>

                <div className="form-group" onClick={handleInputClick}>
                    <label htmlFor="creacion_boceto">Bocetos</label>
                    <select
                        className="form-control"
                        id="creacion_boceto"
                        value={creacion_boceto}
                        onChange={handleChange}
                        disabled={isEditingDropdowns}
                    >
                        {selectOptions}
                    </select>
                </div>

                <div className="form-group" onClick={handleInputClick}>
                    <label htmlFor="validacion_boceto">
                        Validación de Bocetos
                    </label>
                    <select
                        className="form-control"
                        id="validacion_boceto"
                        value={validacion_boceto}
                        onChange={handleChange}
                        disabled={isEditingDropdowns}
                    >
                        {selectOptions}
                    </select>
                </div>

                <div className="form-group" onClick={handleInputClick}>
                    <label htmlFor="confirmacion_proveedor">
                        Confirmación de Proveedor
                    </label>
                    <select
                        className="form-control"
                        id="confirmacion_proveedor"
                        value={confirmacion_proveedor}
                        onChange={handleChange}
                        disabled={isEditingDropdowns}
                    >
                        {selectOptions}
                    </select>
                </div>
            </div>

            <div className="card-footer">
                <div className="d-flex justify-content-end align-items-center w-100 flex-wrap">
                    <button className="btn btn-success btn-round">
                        Administrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ArtCard;
