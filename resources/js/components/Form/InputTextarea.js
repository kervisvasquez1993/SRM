import React, { useContext } from "react";
import { FormContext } from "./GenericForm";

const InputTextArea = ({ id, label, value, error }) => {
    const { onChange } = useContext(FormContext);

    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>

            <textarea
                className="form-control"
                id={id}
                name={id}
                rows="5"
                onChange={onChange}
                value={value}
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
