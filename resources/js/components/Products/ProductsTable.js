import axios from "axios";
import React, { useEffect } from "react";
import { FaFileImport } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { openModal } from "../../store/actions/modalActions";
import {
    deleteProduct,
    getProductsFromNegotiation
} from "../../store/actions/productActions";
import { getSum, roundMoneyAmount } from "../../utils";
import { Channel } from "../../utils/Echo";
import { amazonS3Url, apiURL } from "../App";
import { startDownloadingFile } from "../FileDownloader";
import EmptyList from "../Navigation/EmptyList";
import LoadingScreen from "../Navigation/LoadingScreen";
import ProductsResume from "../Widgets/ProductsResume";
import CreateProductModal from "./CreateProductModal";
import ProductFormModal from "./ProductFormModal";

const ProductsTable = ({
    allowEditing = false,
    allowDeletion = false,
    showCreateButton = false,
    allowExcel = true,
    canAddSingleProduct = false,
    editableOnlyByOwner = true,
    buyerColumns = true,
    logisticsColumns = false
}) => {
    const dispatch = useDispatch();

    // @ts-ignore
    const user = useSelector(state => state.auth.user);
    // @ts-ignore
    const products = useSelector(state => state.product.products);
    // @ts-ignore
    const isLoadingList = useSelector(state => state.product.isLoadingList);
    // @ts-ignore
    const negotiation = useSelector(state => state.negotiation.negotiation);

    const isMine = editableOnlyByOwner
        ? user.id == negotiation.usuario.id
        : true;

    useEffect(() => {
        dispatch(getProductsFromNegotiation(negotiation.id));
    }, []);

    useEffect(() => {
        // Escuchar para recarga los productos cuando se terminan de importar
        Channel.listen("ExitoSubiendoArchivoEvent", e => {
            if (e.data.negociacion_id == negotiation.id) {
                dispatch(getProductsFromNegotiation(negotiation.id));
            }
        });

        return () => {
            Channel.stopListening("ExitoSubiendoArchivoEvent");
        };
    }, []);

    const exportProducts = async () => {
        // axios({
        //     url: `${apiURL}/negociacion/${negotiation.id}/exportar_productos`,
        //     method: "GET",
        //     responseType: "blob" // Important
        // }).then(response => {
        //     fileDownload(response.data, "Productos.xlsx");
        // });
        startDownloadingFile(() =>
            axios.get(
                `${apiURL}/negociacion/${negotiation.id}/exportar_productos`
            )
        );
    };

    if (isLoadingList) {
        return <LoadingScreen />;
    }

    const handleCreate = () => {
        dispatch(
            openModal({
                title: "Agregar Producto",
                body: (
                    <CreateProductModal
                        negotiation={negotiation}
                        allowExcel={allowExcel}
                        canAddSingleProduct={canAddSingleProduct}
                    />
                )
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
                        firstColumns={logisticsColumns ? false : true}
                        buyerColumns={buyerColumns}
                        logisticsColumns={logisticsColumns}
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
            <div className="py-4"></div>

            {products.length === 0 && (
                <React.Fragment>
                    <EmptyList message="Aún no se ha cargado ningún producto." />
                    <div className="py-3"></div>
                </React.Fragment>
            )}

            <div
                className={`w-100 ${
                    products.length === 0 ? "text-center" : ""
                }`}
            >
                {products.length > 0 && (
                    <button
                        className="btn btn-info mb-4"
                        onClick={exportProducts}
                    >
                        <FaFileImport className="mr-2" />
                        Exportar
                    </button>
                )}

                {isMine && showCreateButton && (
                    <button
                        className={`btn btn-success mb-4 ${
                            products.length === 0 ? "btn-lg" : ""
                        }`}
                        onClick={handleCreate}
                    >
                        <FaFileImport className="mr-2" />
                        Importar
                    </button>
                )}
            </div>

            {products.length > 0 && (
                <div className="table-responsive table-text mb-5">
                    <table className="table table-sm table-hover table-bordered fade-in py-0 text-center product-table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col" colSpan={2}></th>

                                <th scope="col" colSpan={2}>
                                    SUPPLIER
                                </th>

                                <th scope="col" colSpan={3}>
                                    CUSTOMER
                                </th>

                                <th scope="col" colSpan={3}></th>

                                {buyerColumns && (
                                    <React.Fragment>
                                        <th scope="col" colSpan={3}></th>
                                        <th scope="col" colSpan={4}>
                                            PACKING QUANTITY
                                        </th>
                                        <th scope="col" colSpan={11}></th>
                                    </React.Fragment>
                                )}

                                <th scope="col" colSpan={5}></th>

                                {logisticsColumns && (
                                    <th scope="col" colSpan={11}></th>
                                )}

                                {(allowEditing || allowDeletion) && (
                                    <th scope="col" rowSpan={3}>
                                        Acciones
                                    </th>
                                )}
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
                                    Imagen
                                </th>
                                <th scope="col" rowSpan={2}>
                                    SHELF LIFE (Month*)
                                </th>

                                {buyerColumns === true && (
                                    <React.Fragment>
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
                                        <th scope="col">INNER 1</th>
                                        <th scope="col">INNER 2</th>
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
                                    </React.Fragment>
                                )}

                                <th scope="col" rowSpan={2}>
                                    LINEA
                                </th>
                                <th scope="col" rowSpan={2}>
                                    CATEGORIA
                                </th>
                                <th scope="col" rowSpan={2}>
                                    SUB-CATEGORIA
                                </th>
                                <th scope="col" rowSpan={2}>
                                    PERMISO SANITARIO
                                </th>
                                <th scope="col" rowSpan={2}>
                                    CPE
                                </th>

                                {logisticsColumns === true && (
                                    <React.Fragment>
                                        <th scope="col" rowSpan={2}>
                                            NUM REFERENCIA EMPAQUE
                                        </th>
                                        <th scope="col" rowSpan={2}>
                                            U/M UNIT
                                        </th>
                                        <th scope="col" rowSpan={2}>
                                            CÓDIGO DE BARRAS UNIT
                                        </th>
                                        <th scope="col" rowSpan={2}>
                                            U/M INNER 1
                                        </th>
                                        <th scope="col" rowSpan={2}>
                                            CÓDIGO DE BARRAS INNER 1
                                        </th>
                                        <th scope="col" rowSpan={2}>
                                            U/M INNER 2
                                        </th>
                                        <th scope="col" rowSpan={2}>
                                            CÓDIGO DE BARRAS INNER 2
                                        </th>
                                        <th scope="col" rowSpan={2}>
                                            U/M OUTER
                                        </th>
                                        <th scope="col" rowSpan={2}>
                                            CÓDIGO DE BARRAS OUTER
                                        </th>
                                        <th scope="col" rowSpan={2}>
                                            CÓDIGO INTERNO ASIGNADO
                                        </th>
                                        <th scope="col" rowSpan={2}>
                                            DESCRIPCION ASIGNADA SISTEMA
                                        </th>
                                    </React.Fragment>
                                )}
                            </tr>
                            <tr>
                                {buyerColumns && (
                                    <React.Fragment>
                                        <th scope="col">PCS/UNIT</th>
                                        <th scope="col">PCS/INNER BOX 1</th>
                                        <th scope="col">PCS/INNER BOX 2</th>
                                        <th scope="col">PCS/CTN</th>
                                        <th scope="col">L(CM)</th>
                                        <th scope="col">W(CM)</th>
                                        <th scope="col">H(CM)</th>
                                        <th scope="col">CBM</th>
                                    </React.Fragment>
                                )}
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
                                        <td className="description-cell">
                                            {product.description}
                                        </td>
                                        <td className="image-cell-parent">
                                            {product.imagen && (
                                                <img
                                                    className="image-cell"
                                                    src={
                                                        amazonS3Url +
                                                        product.imagen
                                                    }
                                                />
                                            )}
                                        </td>
                                        <td>{product.shelf_life}</td>
                                        {buyerColumns && (
                                            <React.Fragment>
                                                <td>{product.total_pcs}</td>
                                                <td>{product.unit_price}</td>
                                                <td>{product.total_usd}</td>
                                                <td>
                                                    {product.pcs_unit_packing}
                                                </td>
                                                <td>
                                                    {
                                                        product.pcs_inner1_box_paking
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        product.pcs_inner2_box_paking
                                                    }
                                                </td>
                                                <td>
                                                    {product.pcs_ctn_paking}
                                                </td>
                                                <td>
                                                    {product.ctn_packing_size_l}
                                                </td>
                                                <td>
                                                    {product.ctn_packing_size_w}
                                                </td>
                                                <td>
                                                    {product.ctn_packing_size_h}
                                                </td>
                                                <td>{product.cbm}</td>
                                                <td>{product.n_w_ctn}</td>
                                                <td>{product.g_w_ctn}</td>
                                                <td>
                                                    {Math.ceil(
                                                        product.total_ctn
                                                    )}
                                                </td>
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
                                                <td>
                                                    {roundMoneyAmount(
                                                        product.total_g_w
                                                    )}
                                                </td>
                                            </React.Fragment>
                                        )}

                                        <td>{product.linea}</td>
                                        <td>{product.categoria}</td>
                                        <td>{product.sub_categoria}</td>
                                        <td>{product.permiso_sanitario}</td>
                                        <td>{product.cpe}</td>

                                        {logisticsColumns && (
                                            <React.Fragment>
                                                <td>
                                                    {
                                                        product.num_referencia_empaque
                                                    }
                                                </td>
                                                <td>{product.u_m_unit}</td>
                                                <td>
                                                    {
                                                        product.codigo_de_barras_unit
                                                    }
                                                </td>
                                                <td>{product.u_m_inner_1}</td>
                                                <td>
                                                    {
                                                        product.codigo_de_barras_inner_1
                                                    }
                                                </td>
                                                <td>{product.u_m_inner_2}</td>
                                                <td>
                                                    {
                                                        product.codigo_barra_inner_2
                                                    }
                                                </td>
                                                <td>{product.u_m_outer}</td>
                                                <td>
                                                    {
                                                        product.codigo_de_barras_outer
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        product.codigo_interno_asignado
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        product.descripcion_asignada_sistema
                                                    }
                                                </td>
                                            </React.Fragment>
                                        )}

                                        {(allowEditing || allowDeletion) && (
                                            <td>
                                                <div className="d-inline-flex justify-content-end flex-grow-1">
                                                    {allowEditing && (
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
                                                    )}

                                                    {allowDeletion && (
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
                                                    )}
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                );
                            })}
                            {buyerColumns && (
                                <tr>
                                    <th
                                        scope="row"
                                        // @ts-ignore
                                        colSpan="21"
                                    >
                                        Total
                                    </th>

                                    <React.Fragment>
                                        <td>
                                            {Math.ceil(
                                                getSum(products, "total_ctn")
                                            )}
                                        </td>
                                        <td>
                                            {roundMoneyAmount(
                                                getSum(
                                                    products,
                                                    "corregido_total_pcs"
                                                )
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
                                        {(allowEditing || allowDeletion) && (
                                            <td></td>
                                        )}
                                    </React.Fragment>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            <ProductsResume products={products} />
        </React.Fragment>
    );
};

export default ProductsTable;
