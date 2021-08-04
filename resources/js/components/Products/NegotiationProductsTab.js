import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/actions/modalActions";
import {
    deleteProduct,
    getProductsFromNegotiation
} from "../../store/actions/productActions";
import ProductFormModal from "./ProductFormModal";
import EmptyList from "../Navigation/EmptyList";
import { getSum, roundMoneyAmount, useSimpleScrollToId } from "../../utils";
import { useParams } from "react-router-dom";
import LargeCreateButton from "../Widgets/LargeCreateButton";
import CreateProductModal from "./CreateProductModal";
import ProductsResume from "../Widgets/ProductsResume";
import LoadingScreen from "../Navigation/LoadingScreen";

const NegotiationProductsTab = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const { id } = useParams();
    // @ts-ignore
    const user = useSelector(state => state.auth.user);
    // @ts-ignore
    const products = useSelector(state => state.product.products);
    // @ts-ignore
    const isLoadingList = useSelector(state => state.product.isLoadingList);
    // @ts-ignore
    const negotiation = useSelector(state => state.negotiation.negotiation);

    const isMine = user.id == negotiation.usuario.id;

    const titleRef = useSimpleScrollToId("#products");

    useEffect(() => {
        dispatch(getProductsFromNegotiation(id));
    }, []);

    const handleCreate = () => {
        dispatch(
            openModal({
                title: "Agregar Producto",
                body: <CreateProductModal pivotId={id} />
            })
        );
    };

    const handleEdit = product => {
        dispatch(
            openModal({
                title: "Editar Producto",
                body: (
                    <ProductFormModal
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

    if (isLoadingList) {
        return <LoadingScreen />;
    }

    return (
        <div className="flex flex-column align-items-center">
            <h2 className="h2 pb-4 text-center">Productos</h2>

            {products.length === 0 && <EmptyList />}

            {isMine && <LargeCreateButton onClick={handleCreate} />}

            {products.length > 0 && (
                <div className="table-responsive table-text">
                    <table className="table table-sm table-hover table-bordered fade-in">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Nombre Original</th>
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
                                            {product.original_product_name}
                                        </th>
                                        <td>{product.product_name}</td>
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
                                        <td>
                                            {roundMoneyAmount(
                                                product.total_cbm
                                            )}
                                        </td>
                                        <td>
                                            {roundMoneyAmount(
                                                product.total_n_w
                                            )}
                                        </td>
                                        <td>
                                            {roundMoneyAmount(
                                                product.total_g_w
                                            )}
                                        </td>
                                        <td>
                                            {roundMoneyAmount(
                                                product.total_ctn
                                            )}
                                        </td>
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
                                <th
                                    scope="row"
                                    // @ts-ignore
                                    colSpan="17"
                                >
                                    Total
                                </th>
                                <td>
                                    {roundMoneyAmount(
                                        getSum(products, "total_cbm")
                                    )}
                                </td>
                                <td>
                                    {roundMoneyAmount(
                                        getSum(products, "total_n_w")
                                    )}
                                </td>
                                <td>
                                    {roundMoneyAmount(
                                        getSum(products, "total_g_w")
                                    )}
                                </td>
                                <td>
                                    {roundMoneyAmount(
                                        getSum(products, "total_ctn")
                                    )}
                                </td>
                                <td>
                                    {roundMoneyAmount(
                                        getSum(products, "corregido_total_pcs")
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            <ProductsResume products={products} />
        </div>
    );
};

export default NegotiationProductsTab;
