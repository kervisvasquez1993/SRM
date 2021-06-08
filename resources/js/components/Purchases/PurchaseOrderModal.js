import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPurchaseOrderFromNegotiation, editPurchaseOrder } from "../../store/actions/purchaseOrderActions";
import { extractError } from "../../utils";
import GenericForm from "../Form/GenericForm";
import InputNumber from "../Form/InputNumber";
import InputText from "../Form/InputText";
import InputTextarea from "../Form/InputTextarea";

export const emptyPurchase = {
    orden_compra: "",
    item: "",
    registro_salud: "",
    cantidad_pcs: "",
    descripcion: "",
    total: ""
};

const PurchaseOrderModal = ({ purchase, isEditor = false, pivotId = null }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState({ ...purchase });

    const isEditing = useSelector(state => state.purchaseOrder.isEditing);
    const errors = useSelector(state => state.purchaseOrder.errors);
    const orden_compra_error = extractError(errors, "orden_compra");
    const item_error = extractError(errors, "item");
    const registro_salud_error = extractError(errors, "registro_salud");
    const cantidad_pcs_error = extractError(errors, "cantidad_pcs");
    const descripcion_error = extractError(errors, "descripcion");
    const total_error = extractError(errors, "total");

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
            dispatch(editPurchaseOrder(data));
        } else {
            dispatch(createPurchaseOrderFromNegotiation(pivotId, data));
        }
    };

    const handleReset = e => {
        setData({ ...emptyPurchase });
    };

    return (
        <GenericForm
            handleSubmit={handleSubmit}
            disableSubmit={isEditing}
            handleReset={handleReset}
            onChange={handleChange}
            values={data}
        >
            <InputText
                id="orden_compra"
                label="Orden de Compra"
                error={orden_compra_error}
            />

            <InputText id="item" label="Item" error={item_error} />

            <InputText
                id="registro_salud"
                label="Registro Salud"
                error={registro_salud_error}
            />

            <InputNumber
                id="cantidad_pcs"
                label="Cantidad PCS"
                error={cantidad_pcs_error}
            />

            <InputTextarea
                id="descripcion"
                label="Descripción"
                error={descripcion_error}
            />

            <InputNumber id="total" label="Total" error={total_error} />
        </GenericForm>
    );
};

export default PurchaseOrderModal;
