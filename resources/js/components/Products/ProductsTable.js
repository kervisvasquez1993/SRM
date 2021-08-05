import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/actions/modalActions";
import {
    deleteProduct,
    getProductsFromNegotiation
} from "../../store/actions/productActions";
import { getSum, roundMoneyAmount } from "../../utils";
import EmptyList from "../Navigation/EmptyList";
import LoadingScreen from "../Navigation/LoadingScreen";
import LargeCreateButton from "../Widgets/LargeCreateButton";
import ProductsResume from "../Widgets/ProductsResume";
import CreateProductModal from "./CreateProductModal";
import ProductFormModal from "./ProductFormModal";

const ProductsTable = ({ allowEditing = false, showCreateButton = false }) => {
    const dispatch = useDispatch();

    // @ts-ignore
    const user = useSelector(state => state.auth.user);
    // @ts-ignore
    const products = useSelector(state => state.product.products);
    // @ts-ignore
    const isLoadingList = useSelector(state => state.product.isLoadingList);
    // @ts-ignore
    const negotiation = useSelector(state => state.negotiation.negotiation);

    const isMine = user.id == negotiation.usuario.id;

    useEffect(() => {
        dispatch(getProductsFromNegotiation(negotiation.id));
    }, []);

    if (isLoadingList) {
        return <LoadingScreen />;
    }

    const handleCreate = () => {
        dispatch(
            openModal({
                title: "Agregar Producto",
                body: <CreateProductModal negotiation={negotiation} />
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
                        pivotId={negotiation.id}
                        isEditor={true}
                    />
                )
            })
        );
    };

    const handleDelete = product => {
        if (confirm("¿Está seguro?")) {
            dispatch(deleteProduct(product));
        }
    };

    return (
        <React.Fragment>
            <h2 className="h2 pb-4 text-center">Productos</h2>

            {products.length === 0 && (
                <EmptyList message="Aún no se ha cargado ningún producto." />
            )}

            {isMine && showCreateButton && (
                <LargeCreateButton onClick={handleCreate} />
            )}

            {products.length > 0 && (
                <div className="table-responsive table-text mb-5">
                    <table className="table table-sm table-hover table-bordered fade-in py-0 text-center">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col" colSpan={3}></th>

                                <th scope="col" colSpan={2}>
                                    SUPPLIER
                                </th>

                                <th scope="col" colSpan={3}>
                                    CUSTOMER
                                </th>

                                <th scope="col" colSpan={5}></th>

                                <th scope="col" colSpan={3}>
                                    PACKING QUANTITY
                                </th>

                                <th scope="col" colSpan={11}></th>
                            </tr>
                            <tr>
                                <th scope="col" rowSpan={2}>
                                    N°
                                </th>
                                <th scope="col" rowSpan={2}>
                                    HS CODE
                                </th>
                                <th scope="col" rowSpan={2}>
                                    PRODUCT CODE
                                </th>
                                <th scope="col" rowSpan={2}>
                                    PRODUCT NAME
                                </th>
                                <th scope="col" rowSpan={2}>
                                    BRAND
                                </th>
                                <th scope="col" rowSpan={2}>
                                    SUB-BRAND
                                </th>
                                <th scope="col" rowSpan={2}>
                                    PRODUCT NAME
                                </th>
                                <th scope="col" rowSpan={2}>
                                    DESCRIPTION
                                </th>
                                <th scope="col" rowSpan={2}>
                                    SHELF LIFE (Month*)
                                </th>
                                <th scope="col" rowSpan={2}>
                                    TOTAL PCS
                                </th>
                                <th scope="col" rowSpan={2}>
                                    Unit Price
                                </th>
                                <th scope="col" rowSpan={2}>
                                    Total USD
                                </th>
                                <th scope="col">UNIT</th>
                                <th scope="col">INNER</th>
                                <th scope="col">OUTER</th>
                                <th scope="col" colSpan={4}>
                                    CTN PACKING SIZE
                                </th>
                                <th scope="col" rowSpan={2}>
                                    N.W. (CTN) kgs
                                </th>
                                <th scope="col" rowSpan={2}>
                                    G.W. (CTN) kgs
                                </th>
                                <th scope="col" rowSpan={2}>
                                    TOTAL CTN
                                </th>
                                <th scope="col" rowSpan={2}>
                                    CORREGIR TOTAL PCS
                                </th>
                                <th scope="col" rowSpan={2}>
                                    TOTAL CBM
                                </th>
                                <th scope="col" rowSpan={2}>
                                    TOTAL N.W. kgs
                                </th>
                                <th scope="col" rowSpan={2}>
                                    TOTAL G.W. Kgs
                                </th>
                            </tr>
                            <tr>
                                <th scope="col">PCS/UNIT</th>
                                <th scope="col">PCS/INNER BOX</th>
                                <th scope="col">PCS/CTN</th>
                                <th scope="col">L(CM)</th>
                                <th scope="col">W(CM)</th>
                                <th scope="col">H(CM)</th>
                                <th scope="col">CBM</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => {
                                return (
                                    <tr key={product.id} className="fade-in">
                                        <th scope="row">{index + 1}</th>
                                        <td>{product.hs_code}</td>
                                        <td>{product.product_code_supplier}</td>
                                        <td>{product.product_name_supplier}</td>
                                        <td>{product.brand_customer}</td>
                                        <td>{product.sub_brand_customer}</td>
                                        <td>{product.product_name_customer}</td>
                                        <td>{product.description}</td>
                                        <td>{product.shelf_life}</td>
                                        <td>{product.total_pcs}</td>
                                        <td>{product.unit_price}</td>
                                        <td>{product.total_usd}</td>
                                        <td>{product.pcs_unit_packing}</td>
                                        <td>{product.pcs_inner_box_paking}</td>
                                        <td>{product.pcs_ctn_paking}</td>
                                        <td>{product.ctn_packing_size_l}</td>
                                        <td>{product.ctn_packing_size_w}</td>
                                        <td>{product.ctn_packing_size_h}</td>
                                        <td>{product.cbm}</td>
                                        <td>{product.n_w_ctn}</td>
                                        <td>{product.g_w_ctn}</td>
                                        <td>{Math.ceil(product.total_ctn)}</td>
                                        <td>
                                            {roundMoneyAmount(
                                                product.corregido_total_pcs
                                            )}
                                        </td>
                                        <td>
                                            {roundMoneyAmount(
                                                product.total_cbm
                                            )}
                                        </td>
                                        <td>
                                            {roundMoneyAmount(
                                                roundMoneyAmount(
                                                    product.total_n_w
                                                )
                                            )}
                                        </td>
                                        <td
                                            className={
                                                isMine && allowEditing
                                                    ? "text-left"
                                                    : ""
                                            }
                                        >
                                            <div className="d-inline-flex align-items-center">
                                                {roundMoneyAmount(
                                                    product.total_g_w
                                                )}
                                                {isMine && allowEditing && (
                                                    <div className="d-inline-flex justify-content-end flex-grow-1">
                                                        <button
                                                            className="btn btn-success btn-circle ml-3 btn-sm"
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
                                                            className="btn btn-danger btn-circle btn-sm"
                                                            type="button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    product
                                                                )
                                                            }
                                                        >
                                                            <span className="material-icons icon-normal">
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
                                    colSpan="21"
                                >
                                    Total
                                </th>
                                <td>
                                    {Math.ceil(getSum(products, "total_ctn"))}
                                </td>
                                <td>
                                    {roundMoneyAmount(
                                        getSum(products, "corregido_total_pcs")
                                    )}
                                </td>
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
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            <ProductsResume products={products} />
        </React.Fragment>
    );
};

export default ProductsTable;
