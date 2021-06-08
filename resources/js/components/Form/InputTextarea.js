import React, { useContext } from "react";
import { FormContext } from "./GenericForm";

const InputTextArea = ({ id, label, value = null, error = null }) => {
    const { onChange, values } = useContext(FormContext);

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
