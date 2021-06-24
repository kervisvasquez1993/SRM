import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openArtModal, updateArt } from "../../store/actions/artActions";
import { isArtCompleted, useSimpleUrlFocus } from "../../utils";

export const options = [
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

export const categories = [
    {
        value: "creacion_fichas",
        label: "Creación de Fichas :"
    },
    {
        value: "validacion_fichas",
        label: "Validación de Fichas :"
    },
    {
        value: "creacion_boceto",
        label: "Creación de Bocetos :"
    },
    {
        value: "validacion_boceto",
        label: "Validación de Bocetos :"
    },
    {
        value: "confirmacion_proveedor",
        label: "Confirmación de Proveedor :"
    }
];

const ArtCard = ({ art }) => {
    const dispatch = useDispatch();
    const isEditingDropdowns = useSelector(
        state => state.art.isEditingDropdowns
    );

    const [ref, focusClassName] = useSimpleUrlFocus(art.id);

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

    const selectOptions = options.map(item => {
        return (
            <option key={item.value} value={item.value}>
                {item.label}
            </option>
        );
    });

    return (
        <div
            className={`card my-2 fade-in py-2 ${
                isArtCompleted(art) ? "bg-success text-white" : ""
            } ${focusClassName}`}
            onClick={handleOpenManagement}
            style={{ cursor: "pointer" }}
            ref={ref}
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
                {categories.map(({ value, label }) => {
                    return (
                        <div
                            className="form-group"
                            onClick={handleInputClick}
                            key={value}
                        >
                            <label htmlFor={value}>{label}</label>
                            <select
                                className="form-control"
                                id={value}
                                value={art[value]}
                                onChange={handleChange}
                                disabled={isEditingDropdowns}
                            >
                                {selectOptions}
                            </select>
                        </div>
                    );
                })}
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
