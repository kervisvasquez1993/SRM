import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../store/actions/modalActions";
import { getPayments } from "../../../store/actions/productionActions";
import { getSum } from "../../../utils";
import EmptyList from "../../Navigation/EmptyList";
import LoadingScreen from "../../Navigation/LoadingScreen";
import PaymentModal, { emptyPayment } from "./PaymentModal";
import PaymentRow from "./PaymentRow";

const PaymentsTab = ({ production }) => {
    const dispatch = useDispatch();
    const payments = useSelector(state => state.production.payments);
    const arePaymentsLoading = useSelector(
        state => state.production.arePaymentsLoading
    );

    useEffect(() => {
        dispatch(getPayments(production.id));
    }, []);

    const handleCreate = () => {
        dispatch(
            openModal({
                title: "Agregar Pago",
                body: (
                    <PaymentModal
                        formData={emptyPayment}
                        isEditor={false}
                        production={production}
                    />
                )
            })
        );
    };

    return (
        <React.Fragment>
            <div className="mr-auto text-center py-2">
                <h3 className="h2">Pagos</h3>
            </div>

            <div className="text-center">
                <button
                    className="btn btn-lg btn-success btn-round mb-4"
                    onClick={handleCreate}
                >
                    <span className="material-icons">add</span>
                    Agregar
                </button>
            </div>

            {arePaymentsLoading ? (
                <LoadingScreen />
            ) : (
                <React.Fragment>
                    {payments.length === 0 && <EmptyList />}

                    {payments.length > 0 && (
                        <div className="table-responsive">
                            <table className="table table-sm table-hover table-bordered fade-in">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">
                                            Titulo
                                        </th>
                                        <th scope="col">
                                            Tipo
                                        </th>
                                        <th scope="col">
                                            Usuario
                                        </th>
                                        <th scope="col">
                                            Fecha
                                        </th>
                                        <th scope="col">
                                            Monto
                                        </th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments.map((payment, index) => {
                                        return (
                                            <PaymentRow
                                                key={index}
                                                payment={payment}
                                                production={production}
                                            />
                                        );
                                    })}
                                    <tr>
                                        <th scope="row" colSpan={4}>
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
            )}
        </React.Fragment>
    );
};

export default PaymentsTab;
