import React from "react";
import { useDispatch } from "react-redux";
import {
    createPayment,
    editPayment
} from "../../../store/actions/productionActions";
import InputDate from "../../Form/InputDate";
import InputNumber from "../../Form/InputNumber";
import InputText from "../../Form/InputText";
import GenericFormModal from "../../Table/GenericFormModal";

export const emptyPayment = {
    titulo: "",
    fecha: "",
    monto: ""
};

const PaymentModal = ({ production, formData, isEditor }) => {
    const dispatch = useDispatch();

    const onSubmit = data => {
        console.log(data);
        if (isEditor) {
            dispatch(editPayment(production, data));
        } else {
            dispatch(createPayment(production, data));
        }
    };

    return (
        <GenericFormModal
            formData={formData}
            storeName="production"
            isEditor={isEditor}
            onSubmit={onSubmit}
        >
            <InputText id="titulo" label="Titulo" />
            <InputDate id="fecha" label="Fecha" />
            <InputNumber id="monto" label="Monto" />
        </GenericFormModal>
    );
};

export default PaymentModal;
