import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
    addComparision,
    editComparision
} from "../../../store/actions/comparatorActions";
import InputText from "../../Form/InputText";
import GenericFormModal from "../../Table/GenericFormModal";

export default ({ negotiations, formData, isEditor = false }) => {
    const dispatch = useDispatch();

    const [productIds, setProductIds] = useState(() => {
        if (isEditor) {
            return formData.productIds;
        }

        return Array.from({ length: negotiations.length }, (v, i) => null);
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

        console.log(negotiationIndex, value);

        const newValues = [...productIds];

        if (newValues[negotiationIndex] === value) {
            newValues[negotiationIndex] = null;
        } else {
            newValues[negotiationIndex] = value;
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
                                            <th scope="col">PRODUCT NAME</th>
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
                                                        <div className="form-check form-check-radio">
                                                            <label className="form-check-label">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name={
                                                                        negotiation.id
                                                                    }
                                                                    id={
                                                                        producto.id
                                                                    }
                                                                    value={
                                                                        producto.id
                                                                    }
                                                                    checked={
                                                                        productIds[
                                                                            negotiationIndex
                                                                        ] ==
                                                                        producto.id
                                                                    }
                                                                    onClick={
                                                                        stopPropagation
                                                                    }
                                                                    readOnly
                                                                />
                                                                {
                                                                    producto.product_name_customer
                                                                }
                                                                <span className="circle">
                                                                    <span className="check"></span>
                                                                </span>
                                                            </label>
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
