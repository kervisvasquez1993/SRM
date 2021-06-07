import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { getProductsFromNegotiation } from "../../store/actions/productActions";

const ProviderPurchase = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    const products = useSelector(state => state.product.products);

    console.log(products);

    useEffect(() => {
        dispatch(getProductsFromNegotiation(id));
    }, []);

    const handleGoBack = () => {
        history.goBack();
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

            <div className="mr-auto text-center py-4">
                <h1 className="h2">Orden de Compra</h1>
            </div>

            <div className="mr-auto text-center py-4">
                <h1 className="h2">Productos</h1>
            </div>

            <div className="table-responsive">
                <table className="table table-sm table-hover table-bordered">
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
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => {
                            return (
                                <tr key={product.id}>
                                    <th scope="row">{product.product_name}</th>
                                    <td>{product.brand}</td>
                                    <td>{product.product_code}</td>
                                    <td>{product.hs_code}</td>
                                    <td>{product.description}</td>
                                    <td>{product.shelf_life}</td>
                                    <td>{product.total_pcs}</td>
                                    <td>{product.pcs_unit}</td>
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
                                    <td>{product.corregido_total_pcs}</td>
                                    <td className="d-flex">
                                        <button
                                            className="btn btn-success"
                                            type="button"
                                        >
                                            <span className="material-icons">
                                                edit
                                            </span>
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            type="button"
                                        >
                                            <span className="material-icons">
                                                edit
                                            </span>
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProviderPurchase;
