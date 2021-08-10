import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { MdAddCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { ArrayParam, useQueryParam } from "use-query-params";
import { deleteComparision } from "../../../store/actions/comparatorActions";
import { openModal } from "../../../store/actions/modalActions";
import { getNegotiations } from "../../../store/actions/negotiationActions";
import LoadingScreen from "../../Navigation/LoadingScreen";
import AddComparisionModal from "./AddComparisionModal";

const fields = ["total_usd"];
const colors = ["green", "blue", "red", "bg-warning", "table-dark"];

const getColor = index => {
    return colors[index];
};

export default () => {
    const dispatch = useDispatch();

    // @ts-ignore
    const negotiations = useSelector(state => state.negotiation.negotiations);
    // @ts-ignore
    const isLoadingList = useSelector(state => state.negotiation.isLoadingList);

    const [selectedNegotiationsId] = useQueryParam("id", ArrayParam);
    const [selectedNegotiations, setSelectedNegotiations] = useState([]);
    const [products, setProducts] = useState([]);

    // @ts-ignore
    const comparisions = useSelector(state => state.comparator.comparisions);

    const helmet = (
        <Helmet>
            <title>{`Comparación de Empresas - ${process.env.MIX_APP_NAME}`}</title>
        </Helmet>
    );

    useEffect(() => {
        const selected = negotiations.filter(item =>
            selectedNegotiationsId.find(subitem => subitem == item.id)
        );

        setSelectedNegotiations(selected);
        setProducts(selected.map(item => item.productos).flat());
    }, [negotiations]);

    useEffect(() => {
        dispatch(getNegotiations({ productos: true }));
    }, []);

    const handleOpenModal = () => {
        dispatch(
            openModal({
                title: "Agregar Comparación",
                body: (
                    <AddComparisionModal
                        formData={{ productName: "Ejemplo", productIds: [] }}
                        negotiations={selectedNegotiations}
                    />
                )
            })
        );
    };

    const handleEdit = comparision => {
        dispatch(
            openModal({
                title: "Editar Comparación",
                body: (
                    <AddComparisionModal
                        formData={comparision}
                        negotiations={selectedNegotiations}
                        isEditor={true}
                    />
                )
            })
        );
    };

    const handleDelete = comparision => {
        dispatch(deleteComparision(comparision.productName));
    };

    if (isLoadingList) {
        return <LoadingScreen>{helmet}</LoadingScreen>;
    }

    return (
        <div>
            {helmet}
            <div className="table-responsive">
                <table className="table table-sm table-bordered fade-in py-0 text-center bg-white">
                    {comparisions.length > 0 && (
                        <thead>
                            <tr className="fw-bold">
                                <th scope="col" rowSpan={2}></th>

                                {selectedNegotiations.map((item, index) => {
                                    console.log(item);
                                    const background = getColor(index);

                                    return (
                                        <th
                                            key={item.id}
                                            scope="col"
                                            colSpan={5}
                                            className={background}
                                        >
                                            {item.proveedor.nombre}
                                        </th>
                                    );
                                })}

                                <th scope="col" rowSpan={2}></th>
                            </tr>

                            <tr className="fw-bold">
                                {selectedNegotiations.map((item, index) => {
                                    const background = getColor(index);

                                    return (
                                        <React.Fragment key={item.id}>
                                            <th className={background}>
                                                PRODUCT NAME
                                            </th>
                                            <th className={background}>
                                                DESCRIPTION
                                            </th>
                                            <th className={background}>
                                                TOTAL PCS
                                            </th>
                                            <th className={background}>
                                                Unit Price
                                            </th>
                                            <th className={background}>
                                                Total USD
                                            </th>
                                        </React.Fragment>
                                    );
                                })}
                            </tr>
                        </thead>
                    )}

                    <tbody>
                        {comparisions.map(comparision => {
                            const { productName } = comparision;

                            return (
                                <tr key={productName}>
                                    <td>{productName}</td>

                                    {comparision.productIds.map(
                                        (productId, index) => {
                                            const background = getColor(index);

                                            const product = products.find(
                                                item => item.id == productId
                                            );

                                            if (!product) {
                                                return (
                                                    <React.Fragment key={index}>
                                                        <td
                                                            colSpan={5}
                                                            className={
                                                                background
                                                            }
                                                        >
                                                            No tiene
                                                        </td>
                                                    </React.Fragment>
                                                );
                                            }

                                            return (
                                                <React.Fragment key={index}>
                                                    <td
                                                        className={`${background}`}
                                                    >
                                                        {
                                                            product.product_name_customer
                                                        }
                                                    </td>
                                                    <td
                                                        className={`${background}`}
                                                    >
                                                        {product.description}
                                                    </td>
                                                    <td
                                                        className={`${background}`}
                                                    >
                                                        {product.total_pcs}
                                                    </td>
                                                    <td
                                                        className={`${background}`}
                                                    >
                                                        {product.unit_price}
                                                    </td>
                                                    <td
                                                        className={`${background}`}
                                                    >
                                                        {product.total_usd}
                                                    </td>
                                                </React.Fragment>
                                            );
                                        }
                                    )}

                                    <td>
                                        <button
                                            className="btn btn-success btn-circle btn-sm"
                                            type="button"
                                            onClick={() =>
                                                handleEdit(comparision)
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
                                                handleDelete(comparision)
                                            }
                                        >
                                            <span className="material-icons icon-normal">
                                                clear
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        <tr>
                            <td colSpan={selectedNegotiations.length * 5 + 2}>
                                <button
                                    className="btn btn-success mb-4"
                                    onClick={handleOpenModal}
                                >
                                    <MdAddCircle className="mr-2" />
                                    Agregar Comparación
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
