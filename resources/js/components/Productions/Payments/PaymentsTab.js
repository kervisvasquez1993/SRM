import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../store/actions/modalActions";
import { getPayments } from "../../../store/actions/productionActions";
import { getPaymentsInfoFromProduction, getSum } from "../../../utils";
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

    const {
        totalToPay,
        totalPaid,
        paidPercentage,
        prepayment,
        prepaymentPercentage
    } = getPaymentsInfoFromProduction(production);

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

            {arePaymentsLoading ? (
                <LoadingScreen />
            ) : (
                <React.Fragment>
                    <div className="card p-4">
                        <div className="card-body d-lg-flex flex-wrap justify-content-around">
                            <div className="d-flex mb-3">
                                <div className="card-icon bg-success text-white mr-2">
                                    <span className="material-icons">
                                        account_balance_wallet
                                    </span>
                                </div>
                                <div className="mb">
                                    <p className="card-text font-weight-bold m-0 h5">
                                        {totalToPay}
                                    </p>
                                    <p className="card-title">Total a Pagar</p>
                                </div>
                            </div>

                            <div className="d-flex mb-3">
                                <div className="card-icon bg-primary text-white mr-2">
                                    <span className="material-icons">
                                        attach_money
                                    </span>
                                </div>
                                <div className="mb">
                                    <p className="card-text m-0 font-weight-bold h5">
                                        {totalPaid} ({paidPercentage}%)
                                    </p>
                                    <p className="card-title">Total Pagado</p>
                                </div>
                            </div>

                            <div className="d-flex mb-3">
                                <div className="card-icon bg-info text-white mr-2">
                                    <span className="material-icons">
                                        savings
                                    </span>
                                </div>
                                <div className="mb">
                                    <p className="card-text m-0 font-weight-bold h5">
                                        {prepayment} ({prepaymentPercentage}%)
                                    </p>
                                    <p className="card-title ">
                                        Pago Anticipado
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card py-5 px-3">
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
                            <React.Fragment>
                                <div className="table-responsive">
                                    <table className="table table-hover fade-in py-0">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col text-center">
                                                    Titulo
                                                </th>
                                                <th scope="col text-center">
                                                    Tipo
                                                </th>
                                                <th scope="col text-center">
                                                    Usuario
                                                </th>
                                                <th scope="col text-center">
                                                    Fecha
                                                </th>
                                                <th scope="col text-center">
                                                    Monto
                                                </th>
                                                <th scope="col text-center">
                                                    Acciones
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {payments.map((payment, index) => {
                                                return (
                                                    <PaymentRow
                                                        key={payment.id}
                                                        index={index + 1}
                                                        payment={payment}
                                                        production={production}
                                                    />
                                                );
                                            })}
                                            <tr>
                                                <th scope="row" colSpan={5}>
                                                    Total
                                                </th>
                                                <td>
                                                    {getSum(payments, "monto")}
                                                </td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </React.Fragment>
                        )}
                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default PaymentsTab;
