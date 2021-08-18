import React from "react";
import { useDispatch } from "react-redux";
import {
    createProductFromNegotiation,
    editProduct
} from "../../store/actions/productActions";
import InputNumber from "../Form/InputNumber";
import InputText from "../Form/InputText";
import GenericFormModal from "../Table/GenericFormModal";

export const emptyProduct = {};

const ProductFormModal = ({
    product,
    isEditor = false,
    pivotId = null,
    firstColumns = true,
    buyerColumns = true,
    logisticsColumns = false
}) => {
    const dispatch = useDispatch();

    const onSubmit = data => {
        if (isEditor) {
            dispatch(editProduct(data));
        } else {
            dispatch(createProductFromNegotiation(pivotId, data));
        }
    };

    return (
        <GenericFormModal formData={product} onSubmit={onSubmit}>
            {firstColumns && (
                <React.Fragment>
                    <div className="form-row">
                        <InputText id="hs_code" label="HS CODE" />
                    </div>
                    <div className="form-row">
                        <InputText
                            id="product_code_supplier"
                            label="PRODUCT CODE"
                        />
                    </div>
                    <div className="form-row">
                        <InputText
                            id="product_name_supplier"
                            label="PRODUCT NAME"
                        />
                    </div>
                    <div className="form-row">
                        <InputText id="brand_customer" label="BRAND" />
                    </div>
                    <div className="form-row">
                        <InputText id="sub_brand_customer" label="SUB-BRAND" />
                    </div>
                    <div className="form-row">
                        <InputText
                            id="product_name_customer"
                            label="PRODUCT NAME"
                        />
                    </div>
                    <div className="form-row">
                        <InputText id="description" label="DESCRIPTION" />
                    </div>
                    <div className="form-row">
                        <InputNumber
                            id="shelf_life"
                            label="SHELF LIFE (Month*)"
                        />
                    </div>
                </React.Fragment>
            )}

            {buyerColumns && (
                <React.Fragment>
                    <div className="form-row">
                        <InputNumber id="total_pcs" label="TOTAL PCS" />
                        <InputNumber id="unit_price" label="Unit Price" />
                        <InputNumber id="total_usd" label="Total USD" />
                    </div>
                    <div className="form-row">
                        <InputNumber id="pcs_unit_packing" label="PCS/UNIT" />
                        <InputNumber
                            id="pcs_inner1_box_paking"
                            label="PCS/INNER BOX 1"
                        />
                        <InputNumber
                            id="pcs_inner2_box_paking"
                            label="PCS/INNER BOX 2"
                        />
                    </div>
                    <div className="form-row">
                        <InputNumber id="pcs_ctn_paking" label="PCS/CTN" />
                    </div>

                    <div className="form-row">
                        <InputNumber id="ctn_packing_size_l" label="L(CM)" />
                        <InputNumber id="ctn_packing_size_w" label="W(CM)" />
                        <InputNumber id="ctn_packing_size_h" label="H(CM)" />
                    </div>
                    <div className="form-row">
                        <InputNumber id="cbm" label="CBM" />
                        <InputNumber id="n_w_ctn" label="N.W. (CTN) kgs" />
                    </div>

                    <div className="form-row">
                        <InputNumber id="g_w_ctn" label="G.W. (CTN) kgs" />
                        <InputNumber id="total_ctn" label="TOTAL CTN" />
                    </div>

                    <div className="form-row">
                        <InputNumber
                            id="corregido_total_pcs"
                            label="CORREGIR TOTAL PCS"
                        />
                        <InputNumber id="total_cbm" label="TOTAL CBM" />
                    </div>

                    <div className="form-row">
                        <InputNumber id="total_n_w" label="TOTAL N.W. kgs" />
                        <InputNumber id="total_g_w" label="TOTAL G.W. Kgs" />
                    </div>

                    <div className="form-row">
                        <InputText id="linea" label="LINEA" />
                    </div>
                    <div className="form-row">
                        <InputText id="categoria" label="CATEGORIA" />
                        <InputText id="sub_categoria" label="SUB-CATEGORIA" />
                    </div>
                    <div className="form-row">
                        <InputText
                            id="permiso_sanitario"
                            label="PERMISO SANITARIO"
                        />
                        <InputText id="cpe" label="CPE" />
                    </div>
                </React.Fragment>
            )}

            {logisticsColumns && (
                <React.Fragment>
                    <div className="form-row">
                        <InputText
                            id="num_referencia_empaque"
                            label="NUM REFERENCIA EMPAQUE"
                        />
                    </div>
                    <div className="form-row">
                        <InputText id="u_m_unit" label="U/M UNIT" />
                        <InputText
                            id="codigo_de_barras_unit"
                            label="CÓDIGO DE BARRAS UNIT"
                        />
                    </div>
                    <div className="form-row">
                        <InputText id="u_m_inner_1" label="U/M INNER 1" />
                        <InputText
                            id="codigo_de_barras_inner_1"
                            label="CÓDIGO DE BARRAS INNER 1"
                        />
                    </div>
                    <div className="form-row">
                        <InputText id="u_m_inner_2" label="U/M INNER 2" />
                        <InputText
                            id="codigo_barra_inner_2"
                            label="CÓDIGO DE BARRAS INNER 2"
                        />
                    </div>
                    <div className="form-row">
                        <InputText id="u_m_outer" label="U/M OUTER" />
                        <InputText
                            id="codigo_de_barras_outer"
                            label="CÓDIGO DE BARRAS OUTER"
                        />
                    </div>
                    <div className="form-row">
                        <InputText
                            id="codigo_interno_asignado"
                            label="CÓDIGO INTERNO ASIGNADO"
                        />
                    </div>
                    <div className="form-row">
                        <InputText
                            id="descripcion_asignada_sistema"
                            label="DESCRIPCION ASIGNADA SISTEMA"
                        />
                    </div>
                </React.Fragment>
            )}
        </GenericFormModal>
    );
};

export default ProductFormModal;
