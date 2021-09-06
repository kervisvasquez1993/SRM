import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createPurchaseOrderFromNegotiation,
    editPurchaseOrder
} from "../../store/actions/purchaseOrderActions";
import { extractError } from "../../utils";
import GenericForm from "../Form/GenericForm";
import InputNumber from "../Form/InputNumber";
import InputText from "../Form/InputText";
import InputTextarea from "../Form/InputTextarea";
import GenericFormModal from "../Table/GenericFormModal";

export const emptyPurchase = {
    item: "",
    registro_salud: "",
    cantidad_ctns: "",
    descripcion: "",
    price: "",
    total: ""
};

const PurchaseOrderModal = ({ purchase, isEditor = false, pivotId = null }) => {
    const dispatch = useDispatch();

    const onSubmit = data => {
        if (isEditor) {
            dispatch(editPurchaseOrder(data));
        } else {
            dispatch(createPurchaseOrderFromNegotiation(pivotId, data));
        }
    };

    return (
        <GenericFormModal formData={purchase} onSubmit={onSubmit}>
            <InputText id="item" label="Item" />
            <InputTextarea id="descripcion" label="Descripción" />
            <InputText id="registro_salud" label="Registro Salud" />
            <InputNumber id="cantidad_ctns" label="Cantidad Cantidad (CTNS)" />
            <InputNumber id="price" label="Precio" />
            <InputNumber id="total" label="Total" />
        </GenericFormModal>
    );
};

export default PurchaseOrderModal;
