import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPayments } from "../../../store/actions/productionActions";
import { getSum } from "../../../utils";
import EmptyList from "../../Navigation/EmptyList";
import PaymentRow from "./PaymentRow";

const titleStyle = { width: "16.666%" };

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
                                <th scope="col" style={titleStyle}>
                                    Titulo
                                </th>
                                <th scope="col" style={titleStyle}>
                                    Tipo
                                </th>
                                <th scope="col" style={titleStyle}>
                                    Usuario
                                </th>
                                <th scope="col" style={titleStyle}>
                                    Fecha
                                </th>
                                <th scope="col" style={titleStyle}>
                                    Monto
                                </th>
                                <th scope="col" style={titleStyle}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => {
                                return <PaymentRow key={index} payment={payment} />
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
