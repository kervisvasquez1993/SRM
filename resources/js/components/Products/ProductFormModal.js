import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import {
    createProductFromNegotiation,
    editProduct
} from "../../store/actions/productActions";
import InputNumber from "../Form/InputNumber";
import InputText from "../Form/InputText";
import GenericFormModal from "../Table/GenericFormModal";

export const emptyProduct = {
    id: "",
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

const ProductFormModal = ({ product, isEditor = false, pivotId = null }) => {
    const dispatch = useDispatch();

    const onSubmit = data => {
        if (isEditor) {
            dispatch(editProduct(data));
        } else {
            dispatch(createProductFromNegotiation(pivotId, data));
        }
    };

    return (
        <div className="modal-body">
            <GenericFormModal formData={product} onSubmit={onSubmit}>
                <InputText id="original_product_name" label="Nombre original" />
                <InputText id="product_name" label="Nombre" />
                <InputText id="brand" label="Marca" />
                <InputText id="product_code" label="Código" />
                <InputText id="hs_code" label="Código HS" />
                <InputText id="description" label="Descripción" />
                <InputNumber id="shelf_life" label="Vida útil (meses)" />
                <InputNumber id="total_pcs" label="Total de piezas" />
                <InputNumber id="pcs_unit" label="Piezas empaque unitario" />
                <InputNumber
                    id="pcs_inner_box"
                    label="Piezas empaque interno"
                />
                <InputNumber id="pcs_ctn" label="Piezas carton (cm)" />
                <InputNumber
                    id="ctn_packing_size_l"
                    label="Largo Carton (cm)"
                />
                <InputNumber id="ctn_packing_size_h" label="Alto Carton (cm)" />
                <InputNumber
                    id="ctn_packing_size_w"
                    label="Ancho Carton (cm)"
                />
                <InputNumber id="cbm" label="CBM" />
                <InputNumber id="n_w_ctn" label="Peso Neto (kg)" />
                <InputNumber id="g_w_ctn" label="Peso Bruto (kg)" />
                <InputNumber id="total_cbm" label="Total CBM" />
                <InputNumber id="total_n_w" label="Total Peso Neto (kg)" />
                <InputNumber id="total_g_w" label="Total Peso Bruto (kg)" />
                <InputNumber id="total_ctn" label="Total CTN" />
                <InputNumber
                    id="corregido_total_pcs"
                    label="Corregido Total PCS"
                />
            </GenericFormModal>
        </div>
    );
};

export default ProductFormModal;