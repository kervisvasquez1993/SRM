import React, { useContext } from "react";
import ReactQuill from "react-quill";
import { extractError } from "../../utils";
import { FormContext } from "./GenericForm";

const InputTextArea = ({ id, label, value = "" }) => {
    const { setData, onChange, values, errors } = useContext(FormContext);

    const error = extractError(errors, id);

    const finalValue = (values && values[id]) || value || "";

    const handleChange = e => {
        console.log(e)
        console.log(setData)
        if (setData != null) {
            setData(data => {
                return {
                    ...data,
                    [id]: e
                };
            });
        }
    };

    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>

            {/* <textarea
                className="form-control"
                id={id}
                name={id}
                rows="5"
                onChange={onChange}
                value={(values && values[id]) || value || ""}
            ></textarea> */}

            <ReactQuill
                theme="snow"
                value={finalValue}
                onChange={handleChange}
            />

            {error && (
                <div className="text-danger">
                    <strong>{error}</strong>
                </div>
            )}
        </div>
    );
};

export default InputTextArea;
