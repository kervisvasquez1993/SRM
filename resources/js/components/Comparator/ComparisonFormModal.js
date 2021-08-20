import React, { useState } from "react";
import { BiBorderNone } from "react-icons/bi";
import { MdSelectAll } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
    addComparision,
    editComparision
} from "../../store/actions/comparatorActions";
import InputText from "../Form/InputText";
import GenericFormModal from "../Table/GenericFormModal";

export default ({ formData, isEditor = false }) => {
    const dispatch = useDispatch();
    // @ts-ignore
    // const negotiations = useSelector(state => state.comparator.negotiations);
    const negotiations = useSelector(state => state.comparator.task)
        .negociaciones;

    const [productIds, setProductIds] = useState(() => {
        if (isEditor) {
            return formData.productIds;
        }

        return Array.from({ length: negotiations.length }, (v, i) => []);
    });

    const onSubmit = data => {
        if (data.productName) {
            const comparision = {
                ...data,
                productIds
            };

            if (isEditor) {
                dispatch(editComparision(comparision));
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

    const handleSelectAll = index => {
        const productos = negotiations[index].productos;

        const newProducts = [...productIds];
        newProducts[index] = productos.map(item => item.id);
        setProductIds(newProducts);
    };

    const handleUnselectAll = index => {
        const newProducts = [...productIds];
        newProducts[index] = [];
        setProductIds(newProducts);
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
                                            const checked =
                                                (productIds[negotiationIndex] &&
                                                    productIds[
                                                        negotiationIndex
                                                    ].includes(producto.id)) ||
                                                false;

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
                                                                            checked={
                                                                                checked
                                                                            }
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

                            <div>
                                <button
                                    className="btn btn-info mb-4"
                                    onClick={() =>
                                        handleSelectAll(negotiationIndex)
                                    }
                                    type="button"
                                >
                                    <MdSelectAll className="mr-2 icon-normal" />
                                    Seleccionar Todo
                                </button>
                                <button
                                    className="btn btn-danger mb-4"
                                    onClick={() =>
                                        handleUnselectAll(negotiationIndex)
                                    }
                                    type="button"
                                >
                                    <BiBorderNone className="mr-2 icon-normal" />
                                    Deseleccionar Todo
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </GenericFormModal>
    );
};
