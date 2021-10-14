import React, { useState } from "react";
import { useSelector } from "react-redux";
import GenericForm from "../Form/GenericForm";

const GenericFormModal = props => {
    const { formData = {}, onSubmit, methods } = props;
    const [data, setData] = useState({ ...formData });

    // @ts-ignore
    const isEditing = useSelector(state => state.genericForm.isEditing);
    // @ts-ignore
    const errors = useSelector(state => state.genericForm.errors);
    // @ts-ignore
    const error = useSelector(state => state.genericForm.error);

    const handleChange = e => {
        const { id, value } = e.target;

        setData(data => {
            return {
                ...data,
                [id]: value
            };
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const result = onSubmit(data);

        if (result) {
            setData(result);
        }
    };

    if (methods) {
        methods.current = {
            setData
        };
    }

    return (
        <React.Fragment>
            <div className="modal-body">
                <GenericForm
                    handleSubmit={handleSubmit}
                    onChange={handleChange}
                    values={data}
                    errors={errors}
                    error={error}
                    setData={setData}
                    hideButtons
                >
                    {props.children}
                </GenericForm>
            </div>

            <div className="modal-footer">
                <button
                    className="btn btn-success"
                    type="submit"
                    form="genericForm"
                    disabled={isEditing}
                >
                    {isEditing ? (
                        <div className="spinner-border spinner-border-sm">
                            <span className="sr-only">Loading...</span>
                        </div>
                    ) : (
                        props.submitButtonText || "Enviar"
                    )}
                </button>
            </div>
        </React.Fragment>
    );
};

export default GenericFormModal;
