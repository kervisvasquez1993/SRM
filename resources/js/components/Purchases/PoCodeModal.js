import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPoCode } from "../../store/actions/negotiationActions";
import { extractError } from "../../utils";
import GenericForm from "../Form/GenericForm";
import InputText from "../Form/InputText";

const PoCodeModal = ({ pivot }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState({ ...pivot });

    const isEditing = useSelector(state => state.negotiation.isEditing);
    const errors = useSelector(state => state.negotiation.errors);

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

        dispatch(editPoCode(data));
    };

    const handleReset = e => {};

    return (
        <div className="modal-body">
            <GenericForm
                handleSubmit={handleSubmit}
                disableSubmit={isEditing}
                onChange={handleChange}
                values={data}
            >
                <InputText id="compra_po" label="Código PO" />
            </GenericForm>
        </div>
    );
};

export default PoCodeModal;
