import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createProductFromNegotiation,
    editProduct
} from "../../store/actions/productActions";
import { extractError } from "../../utils";
import GenericForm from "../Form/GenericForm";
import InputNumber from "../Form/InputNumber";
import InputText from "../Form/InputText";
import InputTextArea from "../Form/InputTextarea";

export const emptyProduct = {
    hs_code: "",
    product_code: "",
    description: "",
    brand: "",
    product_name: "",
    total_pcs: "",
    shelf_life: "",
    pcs_unit: "",
    pcs_inner_box: "",
    pcs_ctn: "",
    ctn_packing_size_l: "",
    ctn_packing_size_w: "",
    ctn_packing_size_h: "",
    cbm: "",
    n_w_ctn: "",
    g_w_ctn: "",
    total_ctn: "",
    corregido_total_pcs: "",
    total_cbm: "",
    total_n_w: "",
    total_g_w: ""
};

const ProductModal = ({ product, isEditor = false, pivotId = null }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState({ ...product });

    // @ts-ignore
    const isEditing = useSelector(state => state.product.isEditing);
    // @ts-ignore
    const errors = useSelector(state => state.product.errors);
    const product_name_error = extractError(errors, "product_name");
    const brand_error = extractError(errors, "brand");
    const hs_code_error = extractError(errors, "hs_code");
    const product_code_error = extractError(errors, "product_code");
    const description_error = extractError(errors, "description");
    const shelf_life_error = extractError(errors, "shelf_life");
    const total_pcs_error = extractError(errors, "total_pcs");
    const pcs_unit_error = extractError(errors, "pcs_unit");
    const pcs_inner_box_error = extractError(errors, "pcs_inner_box");
    const pcs_ctn_error = extractError(errors, "pcs_ctn");
    const ctn_packing_size_l_error = extractError(errors, "ctn_packing_size_l");
    const ctn_packing_size_h_error = extractError(errors, "ctn_packing_size_h");
    const ctn_packing_size_w_error = extractError(errors, "ctn_packing_size_w");
    const cbm_error = extractError(errors, "cbm");
    const n_w_ctn_error = extractError(errors, "n_w_ctn");
    const g_w_ctn_error = extractError(errors, "g_w_ctn");
    const total_cbm_error = extractError(errors, "total_cbm");
    const total_n_w_error = extractError(errors, "total_n_w");
    const total_g_w_error = extractError(errors, "total_g_w");
    const total_ctn_error = extractError(errors, "total_ctn");
    const corregido_total_pcs_error = extractError(
        errors,
        "corregido_total_pcs"
    );

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
            dispatch(editProduct(data));
        } else {
            dispatch(createProductFromNegotiation(pivotId, data));
        }
    };

    const handleReset = e => {
        setData({ ...emptyProduct });
    };

    return (
        <div className="modal-body">
            <GenericForm
                handleSubmit={handleSubmit}
                disableSubmit={isEditing}
                handleReset={handleReset}
                onChange={handleChange}
                values={data}
            >
                <InputText
                    id="product_name"
                    label="Nombre"
                    error={product_name_error}
                />
                <InputText id="brand" label="Marca" error={brand_error} />
                <InputText
                    id="product_code"
                    label="Código"
                    error={product_code_error}
                />
                <InputText
                    id="hs_code"
                    label="Código HS"
                    error={hs_code_error}
                />
                <InputText
                    id="description"
                    label="Descripción"
                    error={description_error}
                />
                <InputNumber
                    id="shelf_life"
                    label="Vida útil (meses)"
                    error={shelf_life_error}
                />
                <InputNumber
                    id="total_pcs"
                    label="Total de piezas"
                    error={total_pcs_error}
                />
                <InputNumber
                    id="pcs_unit"
                    label="Piezas empaque unitario"
                    error={pcs_unit_error}
                />
                <InputNumber
                    id="pcs_inner_box"
                    label="Piezas empaque interno"
                    error={pcs_inner_box_error}
                />
                <InputNumber
                    id="pcs_ctn"
                    label="Piezas carton (cm)"
                    error={pcs_ctn_error}
                />
                <InputNumber
                    id="ctn_packing_size_l"
                    label="Largo Carton (cm)"
                    error={ctn_packing_size_l_error}
                />
                <InputNumber
                    id="ctn_packing_size_h"
                    label="Alto Carton (cm)"
                    error={ctn_packing_size_h_error}
                />
                <InputNumber
                    id="ctn_packing_size_w"
                    label="Ancho Carton (cm)"
                    error={ctn_packing_size_w_error}
                />
                <InputNumber id="cbm" label="CBM" error={cbm_error} />
                <InputNumber
                    id="n_w_ctn"
                    label="Peso Neto (kg)"
                    error={n_w_ctn_error}
                />
                <InputNumber
                    id="g_w_ctn"
                    label="Peso Bruto (kg)"
                    error={g_w_ctn_error}
                />
                <InputNumber
                    id="total_cbm"
                    label="Total CBM"
                    error={total_cbm_error}
                />
                <InputNumber
                    id="total_n_w"
                    label="Total Peso Neto (kg)"
                    error={total_n_w_error}
                />
                <InputNumber
                    id="total_g_w"
                    label="Total Peso Bruto (kg)"
                    error={total_g_w_error}
                />
                <InputNumber
                    id="total_ctn"
                    label="Total CTN"
                    error={total_ctn_error}
                />
                <InputNumber
                    id="corregido_total_pcs"
                    label="Corregido Total PCS"
                    error={corregido_total_pcs_error}
                />
            </GenericForm>
        </div>
    );
};

export default ProductModal;
