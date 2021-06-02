import React, { useContext } from "react";
import { FormContext } from "./GenericForm";

const InputSelect = props => {
    const { id, label, value, error } = props;
    const { onChange } = useContext(FormContext);

    return (
        <div className="form-row">
            <div className="col-md-12 mb-3">
                <label htmlFor={id}>{label}</label>
                
                <select
                    className={"custom-select " + (error ? "is-invalid" : "")}
                    id={id}
                    name={id}
                    onChange={onChange}
                    value={value}
                >
                    <option value="">Selecciona...</option>
                    {props.children}
                </select>

                {error && (
                    <div className="text-danger">
                        <strong>{error}</strong>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InputSelect;
