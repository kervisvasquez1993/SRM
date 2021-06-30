import React from "react";
import { AiOutlineBarcode } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { StringParam, useQueryParam } from "use-query-params";
import { openArtModal, updateArt } from "../../store/actions/artActions";
import { isArtCompleted, useSimpleUrlFocus, useUser } from "../../utils";

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
    const user = useUser();

    const handleOpenManagement = () => {
        dispatch(openArtModal(art.id));
    };

    const handleInputClick = e => {
        e.stopPropagation();
    };

    const [tab] = useQueryParam("tab", StringParam);

    const [ref, focusClassName] = useSimpleUrlFocus(art.id, "id", () => {
        if (tab) {
            dispatch(openArtModal(art.id, tab));
        }
    });

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
            <div className="card-header ml-2">
                <div className="col-sm h4 d-flex mb-3">
                    <AiOutlineBarcode className="icon-normal mr-2" />
                    <p className="mb-0">
                        Codigo : <strong>{art.codigo}</strong>
                    </p>
                </div>
            </div>

            <div className="card-body py-0 my-0 ml-2">
                <div className="row">
                    {categories.map(({ value, label }) => {
                        let disable = true;

                        if (
                            user.rol === "coordinador" ||
                            user.rol === "comprador"
                        ) {
                            if (value != "creacion_boceto") {
                                disable = false;
                            }
                        } else if (user.rol === "artes" && value === "creacion_boceto") {
                            disable = false;
                        }

                        return (
                            <div
                                className="form-group col-sm-6 col-md-4 col-lg-3"
                                onClick={handleInputClick}
                                key={value}
                            >
                                <label htmlFor={value}>{label}</label>
                                <select
                                    className="form-control"
                                    id={value}
                                    value={art[value]}
                                    onChange={handleChange}
                                    disabled={disable || isEditingDropdowns}
                                >
                                    {selectOptions}
                                </select>
                            </div>
                        );
                    })}
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
