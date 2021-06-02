import React, { useContext } from "react";
import { FormContext } from "./GenericForm";

const InputDate = ({ id, label, value, error }) => {
    const { onChange } = useContext(FormContext);

    return (
        <div className="form-row">
            <div className="col-md-12 mb-3">
                <label htmlFor={id}>{label}</label>

                <input
                    type="date"
                    id={id}
                    name={id}
                    className={"form-control " + (error ? "is-invalid" : "")}
                    onChange={onChange}
                    value={value}
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

export default InputDate;
