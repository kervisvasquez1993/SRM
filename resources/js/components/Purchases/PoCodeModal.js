import React from "react";
import { useDispatch } from "react-redux";
import { updateNegotiation as updateNegotiationPurchaseOrder } from "../../store/actions/negotiationActions";
import InputDate from "../Form/InputDate";
import InputNumber from "../Form/InputNumber";
import InputText from "../Form/InputText";
import GenericFormModal from "../Table/GenericFormModal";

const PoCodeModal = ({ formData }) => {
    const dispatch = useDispatch();

    const onSubmit = data => {
        dispatch(updateNegotiationPurchaseOrder(data));
    };

    return (
        <GenericFormModal formData={formData} onSubmit={onSubmit}>
            <InputText id="compra_po" label="Código PO" />
            <InputNumber id="total_pagar" label="Total a Pagar" />
            <InputNumber id="delivery_time" label="Tiempo de Entrega (días)" />
            {/* <InputText id="payment_terms" label="Términos de Pago" />
            <InputText id="hs_code" label="Código HS" />
            <InputText id="incoterms" label="Incoterms" />
            <InputDate id="delivery_time" label="Tiempo de Entrega" /> */}
        </GenericFormModal>
    );
};

export default PoCodeModal;
