import React, { useState } from "react";
import { useSelector } from "react-redux";
import GenericForm from "../Form/GenericForm";
import InputDate from "../Form/InputDate";
import InputNumber from "../Form/InputNumber";
import InputText from "../Form/InputText";

const GenericFormModal = props => {
    const { formData, onSubmit } = props;
    const [data, setData] = useState({ ...formData });

    const isEditing = useSelector(state => state.genericForm.isEditing);
    const errors = useSelector(state => state.genericForm.errors);
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

    return (
        <div className="modal-body">
            <GenericForm
                handleSubmit={handleSubmit}
                disableSubmit={isEditing}
                onChange={handleChange}
                values={data}
                errors={errors}
                error={error}
                setData={setData}
            >
                {props.children}
            </GenericForm>
        </div>
    );
};

export default GenericFormModal;
