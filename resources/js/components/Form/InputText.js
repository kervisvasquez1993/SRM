import React, { useContext } from "react";
import { extractError } from "../../utils";
import { FormContext } from "./GenericForm";

const InputText = ({ id, label, value = "", type = "text" }) => {
    const { onChange, values, errors } = useContext(FormContext);

    const error = extractError(errors, id);

    return (
        <div className="form-row">
            <div className="col-md-12 mb-3">
                <label htmlFor={id}>{label}</label>

                <input
                    type={type}
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
        </div>
    );
};

export default InputText;
