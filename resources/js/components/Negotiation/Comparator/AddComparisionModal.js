import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addComparision,
    editComparision
} from "../../../store/actions/comparatorActions";
import InputText from "../../Form/InputText";
import GenericFormModal from "../../Table/GenericFormModal";

export default ({ formData, isEditor = false }) => {
    const dispatch = useDispatch();
    // @ts-ignore
    const negotiations = useSelector(state => state.comparator.negotiations);

    const [productIds, setProductIds] = useState(() => {
        if (isEditor) {
            return formData.productIds;
        }

        return Array.from({ length: negotiations.length }, (v, i) => []);
    });

    const onSubmit = data => {
        const { productName } = data;

        if (productName) {
            const comparision = {
                productName,
                productIds
            };

            if (isEditor) {
                dispatch(editComparision(comparision, formData.productName));
            } else {
                dispatch(addComparision(comparision));
            }
        }
    };

    const handleChange = (e, negotiationIndex, value) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        const newValues = [...productIds];

        const list = newValues[negotiationIndex];

        // if (newValues[negotiationIndex] === value) {
        //     newValues[negotiationIndex] = null;
        // } else {
        //     newValues[negotiationIndex] = value;
        // }
        if (list.includes(value)) {
            list.splice(list.indexOf(value), 1);
        } else {
            list.push(value);
        }

        setProductIds(newValues);
    };

    const stopPropagation = e => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <GenericFormModal
            formData={formData}
            storeName="production"
            onSubmit={onSubmit}
            submitButtonText="Agregar"
        >
            <div className="form-row">
                <InputText id="productName" label="Nombre" />
            </div>

            <p className="mt-5">
                Escoga un producto de las siguientes listas:{" "}
            </p>

            <div className="px-4">
                {negotiations.map((negotiation, negotiationIndex) => {
                    return (
                        <div key={negotiation.id}>
                            <h2 className="h3">
                                {negotiation.proveedor.nombre}
                            </h2>

                            <div className="table-responsive">
                                <table className="table table-sm table-hover fade-in py-0 text-center">
                                    <thead>
                                        <tr>
                                            <th scope="col">SUPPLIER NAME</th>
                                            <th scope="col">DESCRIPTION</th>
                                            <th scope="col">TOTAL PCS</th>
                                            <th scope="col">Unit Price</th>
                                            <th scope="col">Total USD</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {negotiation.productos.map(producto => {
                                            return (
                                                <tr
                                                    key={producto.id}
                                                    onClick={() =>
                                                        handleChange(
                                                            null,
                                                            negotiationIndex,
                                                            producto.id
                                                        )
                                                    }
                                                >
                                                    <td>
                                                        <div className="d-flex">
                                                            <div className="form-check form-check-radio">
                                                                <div className="form-check">
                                                                    <label className="form-check-label">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type="checkbox"
                                                                            value=""
                                                                            checked={productIds[
                                                                                negotiationIndex
                                                                            ].includes(
                                                                                producto.id
                                                                            )}
                                                                            onClick={
                                                                                stopPropagation
                                                                            }
                                                                            readOnly
                                                                        />

                                                                        <span className="form-check-sign">
                                                                            <span className="check"></span>
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="w-100">
                                                                {
                                                                    producto.product_name_supplier
                                                                }
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {producto.description}
                                                    </td>
                                                    <td>
                                                        {producto.total_pcs}
                                                    </td>
                                                    <td>
                                                        {producto.unit_price}
                                                    </td>
                                                    <td>
                                                        {producto.total_usd}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    );
                })}
            </div>
        </GenericFormModal>
    );
};
