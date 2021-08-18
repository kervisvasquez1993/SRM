import React, { useContext } from "react";
import { extractError } from "../../utils";
import { FormContext } from "./GenericForm";

const InputSelect = ({
    id,
    label,
    value = "",
    className = "",
    children,
    includeDefaultOption = true
}) => {
    const { onChange, values, errors } = useContext(FormContext);

    const error = extractError(errors, id);

    return (
        <div className={`form-group col ${className}`}>
            <label htmlFor={id}>{label}</label>

            <select
                className={"custom-select " + (error ? "is-invalid" : "")}
                id={id}
                name={id}
                onChange={onChange}
                value={(values && values[id]) || value || ""}
            >
                {includeDefaultOption && (
                    <option value="">Selecciona...</option>
                )}

                {children}
            </select>

            {error && (
                <div className="text-danger">
                    <strong>{error}</strong>
                </div>
            )}
        </div>
    );
};

export default InputSelect;
