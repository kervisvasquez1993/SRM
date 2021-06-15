import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPayments } from "../../store/actions/productionActions";
import { dateToShortString, getSum } from "../../utils";
import EmptyList from "../Navigation/EmptyList";

const PaymentsTab = ({ production }) => {
    const dispatch = useDispatch();
    const payments = useSelector(state => state.production.payments);

    useEffect(() => {
        dispatch(getPayments(production.id));
    }, []);

    const handleCreate = () => {
        // dispatch(
        //     openModal({
        //         title: "Agregar Producto",
        //         body: <ProductModal product={emptyProduct} pivotId={id} />
        //     })
        // );
    };

    const handleEdit = product => {
        // dispatch(
        //     openModal({
        //         title: "Editar Producto",
        //         body: (
        //             <ProductModal
        //                 product={product}
        //                 pivotId={id}
        //                 isEditor={true}
        //             />
        //         )
        //     })
        // );
    };

    const handleDelete = product => {
        // dispatch(deleteProduct(product));
    };

    return (
        <React.Fragment>
            <div className="mr-auto text-center py-2">
                <h3 className="h2">Pagos</h3>
            </div>

            {payments.length === 0 && <EmptyList />}

            <div className="text-center">
                <button
                    className="btn btn-lg btn-success btn-round mb-4"
                    onClick={handleCreate}
                >
                    <span className="material-icons">add</span>
                    Agregar
                </button>
            </div>

            {payments.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-sm table-hover table-bordered fade-in">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Titulo</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Usuario</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">Monto</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => {
                                return (
                                    <tr key={payment.id} className={`fade-in ${index === 0 ? "bg-info" : ""}`}>
                                        <th scope="row">{payment.titulo}</th>
                                        <td>{payment.tipo}</td>
                                        <td>{payment.user_id}</td>
                                        <td>
                                            {dateToShortString(
                                                new Date(payment.created_at)
                                            )}
                                        </td>
                                        <td>{payment.monto}</td>
                                        <td>
                                            <div className="d-flex justify-content-end">
                                                <button
                                                    className="btn btn-success btn-circle ml-3"
                                                    type="button"
                                                    onClick={() =>
                                                        handleEdit(payment)
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
                                                        handleDelete(payment)
                                                    }
                                                >
                                                    <span className="material-icons">
                                                        clear
                                                    </span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            <tr>
                                <th scope="row" colSpan="4">
                                    Total
                                </th>
                                <td>{getSum(payments, "monto")}</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </React.Fragment>
    );
};

export default PaymentsTab;
