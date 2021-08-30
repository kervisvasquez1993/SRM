import React, { useCallback, useState } from "react";
import { BiBorderNone } from "react-icons/bi";
import { MdSelectAll } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
    addComparison,
    updateComparison
} from "../../store/actions/comparatorActions";
import InputText from "../Form/InputText";
import EmptyList from "../Navigation/EmptyList";
import GenericFormModal from "../Table/GenericFormModal";

export default ({ taskId, comparison, isEditor = false }) => {
    const dispatch = useDispatch();

    // @ts-ignore
    const suppliers = useSelector(state => state.comparator.suppliers);
    // @ts-ignore
    const products = useSelector(state => state.comparator.products);

    // const negotiations = useSelector(state => state.comparator.task)
    //     .negociaciones;

    // const [productIds, setProductIds] = useState(() => {
    //     if (isEditor) {
    //         return formData.productIds;
    //     }

    //     return Array.from({ length: negotiations.length }, (v, i) => []);
    // });

    const [checkedProducts, setCheckedProducts] = useState(() => {
        if (isEditor) {
            // return formData.productIds;
            return {};
        }

        // return Array.from({ length: negotiations.length }, (v, i) => []);
        return {};
    });

    const getProductsFromSupplier = useCallback(
        supplier => {
            return products.filter(
                item => item.pivot_tarea_proveeder_id === supplier.pivot.id
            );
        },
        [products]
    );

    const onSubmit = data => {
        // if (data.productName) {
        //     const comparision = {
        //         ...data,
        //         productIds
        //     };
        //     if (isEditor) {
        //         dispatch(editComparision(comparision));
        //     } else {
        //         dispatch(addComparision(comparision));
        //     }
        // }

        if (data.nombre) {
            const comparison = {
                ...data,
                checkedProducts
            };

            if (isEditor) {
                dispatch(updateComparison(comparison));
            } else {
                console.log(taskId);
                dispatch(addComparison(taskId, comparison));
            }
        }
    };

    const handleChange = (e, supplierId, productId) => {
        // if (e) {
        //     e.preventDefault();
        //     e.stopPropagation();
        // }
        // const newValues = [...productIds];
        // const list = newValues[negotiationIndex];
        // if (list.includes(value)) {
        //     list.splice(list.indexOf(value), 1);
        // } else {
        //     list.push(value);
        // }
        // setProductIds(newValues);

        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        const newChecked = { ...checkedProducts };

        let list = newChecked[supplierId] || [];

        if (list.includes(productId)) {
            list = list.filter(item => item != productId);
        } else {
            list = [...list, productId];
        }

        setCheckedProducts({ ...checkedProducts, [supplierId]: list });
    };

    const stopPropagation = e => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleSelectAll = supplier => {
        // const productos = negotiations[index].productos;
        // const newProducts = [...productIds];
        // newProducts[index] = productos.map(item => item.id);
        // setProductIds(newProducts);

        const products = getProductsFromSupplier(supplier);
        const checked = products.map(item => item.id);

        setCheckedProducts({
            ...checkedProducts,
            [supplier.id]: checked
        });
    };

    const handleUnselectAll = supplier => {
        // const newProducts = [...productIds];
        // newProducts[index] = [];
        // setProductIds(newProducts);

        setCheckedProducts({
            ...checkedProducts,
            [supplier.id]: []
        });
    };

    return (
        <GenericFormModal
            formData={comparison}
            storeName="production"
            onSubmit={onSubmit}
            submitButtonText="Agregar"
        >
            <div className="form-row">
                <InputText id="nombre" label="Nombre" />
            </div>

            <p className="mt-5">
                Escoga un producto de las siguientes listas:{" "}
            </p>

            <div className="px-4">
                {suppliers.map((supplier, supplierIndex) => {
                    const supplierProducts = getProductsFromSupplier(supplier);

                    //const
                    return (
                        <div key={supplier.id}>
                            <h2 className="h3">{supplier.nombre}</h2>

                            {supplierProducts.length > 0 ? (
                                <React.Fragment>
                                    <div className="table-responsive">
                                        <table className="table table-sm table-hover fade-in py-0 text-center">
                                            <thead>
                                                <tr>
                                                    <th scope="col">
                                                        SUPPLIER CODE
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        style={{
                                                            width: "20%",
                                                            minWidth: "120px"
                                                        }}
                                                    >
                                                        SUPPLIER NAME
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        style={{
                                                            width: "50%",
                                                            minWidth: "150px"
                                                        }}
                                                    >
                                                        DESCRIPTION
                                                    </th>
                                                    <th scope="col">
                                                        TOTAL PCS
                                                    </th>
                                                    <th scope="col">
                                                        Unit Price
                                                    </th>
                                                    <th scope="col">
                                                        Total USD
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {supplierProducts.map(
                                                    product => {
                                                        const checked =
                                                            (checkedProducts[
                                                                supplier.id
                                                            ] &&
                                                                checkedProducts[
                                                                    supplier.id
                                                                ].includes(
                                                                    product.id
                                                                )) ||
                                                            false;

                                                        return (
                                                            <tr
                                                                key={product.id}
                                                                onClick={() =>
                                                                    handleChange(
                                                                        null,
                                                                        supplier.id,
                                                                        product.id
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
                                                                                product.product_code_supplier
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    {
                                                                        product.product_name_supplier
                                                                    }
                                                                </td>
                                                                <td
                                                                    className="keep-line-breaks"
                                                                    style={{
                                                                        textAlign:
                                                                            "left"
                                                                    }}
                                                                >
                                                                    {
                                                                        product.description
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        product.total_pcs
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        product.unit_price
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        product.total_usd
                                                                    }
                                                                </td>
                                                            </tr>
                                                        );
                                                    }
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div>
                                        <button
                                            className="btn btn-info mb-4"
                                            onClick={() =>
                                                handleSelectAll(supplier)
                                            }
                                            type="button"
                                        >
                                            <MdSelectAll className="mr-2 icon-normal" />
                                            Seleccionar Todo
                                        </button>
                                        <button
                                            className="btn btn-danger mb-4"
                                            onClick={() =>
                                                handleUnselectAll(supplier)
                                            }
                                            type="button"
                                        >
                                            <BiBorderNone className="mr-2 icon-normal" />
                                            Deseleccionar Todo
                                        </button>
                                    </div>
                                </React.Fragment>
                            ) : (
                                <EmptyList message="Esta empresa no tiene productos agregados" />
                            )}
                        </div>
                    );
                })}
            </div>
        </GenericFormModal>
    );
};
