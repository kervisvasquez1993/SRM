import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    editPoCode,
    updateNegotiation
} from "../../store/actions/negotiationActions";
import { extractError } from "../../utils";
import { apiURL } from "../App";
import GenericForm from "../Form/GenericForm";
import InputDate from "../Form/InputDate";
import InputText from "../Form/InputText";
import GenericFormModal from "../Table/GenericFormModal";

const PoCodeModal = ({ formData }) => {
    const dispatch = useDispatch();

    const onSubmit = data => {
        //axios.put(`${apiURL}/pivot/${formData.id}`, data).then(repsonse => console.log(repsonse));
        dispatch(updateNegotiation(data));
    };

    return (
        <GenericFormModal formData={formData} onSubmit={onSubmit}>
            <InputText id="compra_po" label="Código PO" />
            <InputText id="payment_terms" label="Términos de Pago" />
            <InputText id="hs_code" label="Código HS" />
            <InputText id="incoterms" label="Incoterms" />
            <InputDate id="delivery_time" label="Tiempo de Entrega" />
        </GenericFormModal>
    );
};

export default PoCodeModal;
