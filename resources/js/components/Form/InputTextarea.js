import React, { useContext } from "react";
import { extractError } from "../../utils";
import { FormContext } from "./GenericForm";

const InputTextArea = ({ id, label, value = "" }) => {
    const { onChange, values, errors } = useContext(FormContext);

    const error = extractError(errors, id);

    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>

            <textarea
                className="form-control"
                id={id}
                name={id}
                rows="5"
                onChange={onChange}
                value={(values && values[id]) || value || ""}
            ></textarea>

            {error && (
                <div className="text-danger">
                    <strong>{error}</strong>
                </div>
            )}
        </div>
    );
};

export default InputTextArea;
