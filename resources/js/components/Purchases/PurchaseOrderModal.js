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
        <div className="modal-body">
            <GenericForm
                handleSubmit={handleSubmit}
                disableSubmit={isEditing}
                handleReset={handleReset}
                onChange={handleChange}
                values={data}
                errors={errors}
            >
                <InputText id="orden_compra" label="Orden de Compra" />

                <InputText id="item" label="Item" />

                <InputText id="registro_salud" label="Registro Salud" />

                <InputNumber id="cantidad_pcs" label="Cantidad PCS" />

                <InputTextarea id="descripcion" label="Descripción" />

                <InputNumber id="total" label="Total" />
            </GenericForm>
        </div>
    );
};

export default PurchaseOrderModal;
