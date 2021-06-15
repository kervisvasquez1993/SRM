import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createPayment,
    editPayment
} from "../../../store/actions/productionActions";
import GenericForm from "../../Form/GenericForm";
import InputDate from "../../Form/InputDate";
import InputNumber from "../../Form/InputNumber";
import InputText from "../../Form/InputText";

export const emptyPayment = {
    titulo: "",
    fecha: "",
    monto: "",
    url_archivo_factura: "#"
};

const PaymentModal = ({ payment, production, isEditor }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState({ ...payment });

    const isEditing = useSelector(state => state.production.isEditing);
    const errors = useSelector(state => state.production.errors);

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

        if (isEditor) {
            dispatch(editPayment(production, data));
        } else {
            dispatch(createPayment(production, data));
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
            >
                <InputText id="titulo" label="Titulo" />
                <InputDate id="fecha" label="Fecha" />
                <InputNumber id="monto" label="Monto" />
            </GenericForm>
        </div>
    );
};

export default PaymentModal;
