import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import { openModal } from "../../store/actions/modalActions";
import {
    deleteProduct,
    getProductsFromNegotiation
} from "../../store/actions/productActions";
import { apiURL } from "../App";
import LoadingScreen from "../Navigation/LoadingScreen";
import ProductModal, { emptyProduct } from "../Products/ProductModal";

import Error from "../Navigation/Error";
import EmptyList from "../Navigation/EmptyList";
import PurchaseOrderList from "./PurchaseOrderList";
import { getSum } from "../../utils";
import PoCode from "./PoCode";
import { getNegotiation } from "../../store/actions/negotiationActions";

const ProviderPurchase = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    const user = useSelector(state => state.auth.user);
    const products = useSelector(state => state.product.products);
    const negotiation = useSelector(state => state.negotiation.negotiation);
    const negotiationError = useSelector(
        state => state.negotiation.negotiationError
    );

    if (
        !(
            user.rol === "coordinador" ||
            user.rol === "observador" ||
            user.rol === "comprador"
        )
    ) {
        return <Redirect to="/home" />;
    }

    useEffect(() => {
        document.querySelector("#wrapper").scrollTo(0, 0);

        dispatch(getNegotiation(id));
        dispatch(getProductsFromNegotiation(id));
    }, []);

    if (negotiationError) {
        return <Error />;
    }

    if (!negotiation) {
        return <LoadingScreen />;
    }

    if (user.rol === "comprador" && user.id != negotiation.usuario.id) {
        return <Redirect to="/home" />;
    }

    const isMine = user.id == negotiation.usuario.id;

    const handleGoBack = () => {
        history.goBack();
    };

    const handleCreate = () => {
        dispatch(
            openModal({
                title: "Agregar Producto",
                body: <ProductModal product={emptyProduct} pivotId={id} />
            })
        );
    };

    const handleEdit = product => {
        dispatch(
            openModal({
                title: "Editar Producto",
                body: (
                    <ProductModal
                        product={product}
                        pivotId={id}
                        isEditor={true}
                    />
                )
            })
        );
    };

    const handleDelete = product => {
        dispatch(deleteProduct(product));
    };

    return (
        <div className="container-fluid fade-in">
            <div className="container-fluid d-flex justify-content-between mb-4">
                <div>
                    <Link
                        to="/home"
                        className="btn btn-outline-primary btn-round"
                        onClick={handleGoBack}
                    >
                        <span className="material-icons mr-2">
                            keyboard_backspace
                        </span>
                        Atras
                    </Link>
                </div>
            </div>

            <PoCode pivot={negotiation} />

            <PurchaseOrderList negotiation={negotiation} />

            <div className="mr-auto text-center py-4">
                <h1 className="h2">Productos</h1>
            </div>

            {isMine && (
                <div className="text-center">
                    <button
                        className="btn btn-lg btn-success btn-round mb-4"
                        onClick={handleCreate}
                    >
                        <span className="material-icons">add</span>
                        Agregar
                    </button>
                </div>
            )}

            {products.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-sm table-hover table-bordered fade-in">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Marca</th>
                                <th scope="col">Código</th>
                                <th scope="col">Código HS</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Vida útil (meses)</th>
                                <th scope="col">Total de piezas</th>
                                <th scope="col">Piezas empaque unitario</th>
                                <th scope="col">Piezas empaque interno</th>
                                <th scope="col">Piezas carton (cm)</th>
                                <th scope="col">Largo Carton (cm)</th>
                                <th scope="col">Alto Carton (cm)</th>
                                <th scope="col">Ancho Carton (cm)</th>
                                <th scope="col">CBM</th>
                                <th scope="col">Peso Neto (kg)</th>
                                <th scope="col">Peso Bruto (kg)</th>
                                <th scope="col">Total CBM</th>
                                <th scope="col">Total Peso Neto (kg)</th>
                                <th scope="col">Total Peso Bruto (kg)</th>
                                <th scope="col">Total CTN</th>
                                <th scope="col">Corregido Total PCS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => {
                                return (
                                    <tr key={product.id} className="fade-in">
                                        <th scope="row">
                                            {product.product_name}
                                        </th>
                                        <td>{product.brand}</td>
                                        <td>{product.product_code}</td>
                                        <td>{product.hs_code}</td>
                                        <td>{product.description}</td>
                                        <td>{product.shelf_life}</td>
                                        <td>{product.total_pcs}</td>
                                        <td>{product.pcs_unit}</td>
                                        <td>{product.pcs_inner_box}</td>
                                        <td>{product.pcs_ctn}</td>
                                        <td>{product.ctn_packing_size_l}</td>
                                        <td>{product.ctn_packing_size_h}</td>
                                        <td>{product.ctn_packing_size_w}</td>
                                        <td>{product.cbm}</td>
                                        <td>{product.n_w_ctn}</td>
                                        <td>{product.g_w_ctn}</td>
                                        <td>{product.total_cbm}</td>
                                        <td>{product.total_n_w}</td>
                                        <td>{product.total_g_w}</td>
                                        <td>{product.total_ctn}</td>
                                        <td className="text-right">
                                            <div className="d-inline-flex align-items-center">
                                                {product.corregido_total_pcs}
                                                {isMine && (
                                                    <div className="d-inline-flex justify-content-end flex-grow-1">
                                                        <button
                                                            className="btn btn-success btn-circle ml-3"
                                                            type="button"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    product
                                                                )
                                                            }
                                                        >
                                                            <span className="material-icons">
                                                                edit
                                                            </span>
                                                        </button>
                                                        <button
                                                            className="btn btn-danger btn-circle"
                                                            type="button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    product
                                                                )
                                                            }
                                                        >
                                                            <span className="material-icons">
                                                                clear
                                                            </span>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            <tr>
                                <th scope="row" colSpan="16">
                                    Total
                                </th>
                                <td>{getSum(products, "total_cbm")}</td>
                                <td>{getSum(products, "total_n_w")}</td>
                                <td>{getSum(products, "total_g_w")}</td>
                                <td>{getSum(products, "total_ctn")}</td>
                                <td>{getSum(products, "total_pcs")}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <EmptyList />
            )}
        </div>
    );
};

export default ProviderPurchase;
