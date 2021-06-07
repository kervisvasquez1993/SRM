import React, { useContext } from "react";
import { FormContext } from "./GenericForm";

const InputNumber = ({ id, label, value = null, error = null }) => {
    const { onChange, values } = useContext(FormContext);

    return (
        <div className="form-row">
            <div className="col-md-12 mb-3">
                <label htmlFor={id}>{label}</label>

                <input
                    type="number"
                    className={"form-control " + (error ? "is-invalid" : "")}
                    id={id}
                    name={id}
                    onChange={onChange}
                    value={values && values[id] || value || ""}
                />
                {error && (
                    <div className="text-danger">
                        <strong>{error}</strong>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InputNumber;
