import React, { useContext } from "react";
import { extractError } from "../../utils";
import { FormContext } from "./GenericForm";

const InputDate = ({ id, label, value = "", className = "" }) => {
    const { onChange, values, errors } = useContext(FormContext);

    const error = extractError(errors, id);

    return (
        <div className={`form-group col ${className}`}>
            <label htmlFor={id}>{label}</label>

            <input
                type="date"
                className={"form-control " + (error ? "is-invalid" : "")}
                id={id}
                name={id}
                onChange={onChange}
                value={(values && values[id]) || value || ""}
            />

            {error && (
                <div className="text-danger">
                    <strong>{error}</strong>
                </div>
            )}
        </div>
    );
};

export default InputDate;
