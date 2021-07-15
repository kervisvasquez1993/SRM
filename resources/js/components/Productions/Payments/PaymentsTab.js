import React, { useEffect } from "react";
import { AiFillCheckCircle, AiFillWarning } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../store/actions/modalActions";
import { getPayments } from "../../../store/actions/productionActions";
import {
    getPaymentsInfoFromProduction,
    getSum,
    roundMoneyAmount,
    useUser
} from "../../../utils";
import EmptyList from "../../Navigation/EmptyList";
import LoadingScreen from "../../Navigation/LoadingScreen";
import LargeCreateButton from "../../Widgets/LargeCreateButton";
import SmallCard from "../../Widgets/SmallCard";
import PaymentModal, { emptyPayment } from "./PaymentModal";
import PaymentRow from "./PaymentRow";

const PaymentsTab = ({ production }) => {
    const user = useUser();
    const dispatch = useDispatch();
    // @ts-ignore
    const payments = useSelector(state => state.production.payments);
    const arePaymentsLoading = useSelector(
        // @ts-ignore
        state => state.production.arePaymentsLoading
    );
    // @ts-ignore
    const modal = useSelector(store => store.modal);

    const {
        totalToPay,
        totalPaid,
        paidPercentage,
        prepayment,
        prepaymentPercentage,
        remainingPayment,
        remainingPercentage
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
                ),
                onClose: () => dispatch(openModal({ ...modal }))
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
                        <div className="resume-card-body resume-card-body-4">
                            <SmallCard
                                label="Total a Pagar"
                                materialIcon="account_balance_wallet"
                                backgroundClass="bg-success"
                            >
                                {totalToPay}
                            </SmallCard>

                            <SmallCard
                                label="Pago Restante"
                                materialIcon="production_quantity_limits"
                                backgroundClass="bg-danger"
                            >
                                {remainingPayment} ({remainingPercentage}%)
                            </SmallCard>

                            <SmallCard
                                label="Pago Anticipado"
                                materialIcon="savings"
                                backgroundClass="bg-info"
                            >
                                {prepayment > 0
                                    ? `${prepayment} (${prepaymentPercentage} %)`
                                    : 0}
                            </SmallCard>

                            <SmallCard
                                label="Total Pagado"
                                materialIcon="attach_money"
                                backgroundClass="bg-primary"
                            >
                                {totalPaid > 0
                                    ? `${totalPaid} (${paidPercentage}%)`
                                    : 0}
                            </SmallCard>
                        </div>
                        {paidPercentage >= 100 && (
                            <div className="text-success d-flex align-items-center flex-column mt-4 mb-2">
                                <AiFillCheckCircle className="icon-large mb-2" />
                                <p className="h4 text-center">
                                    La compra se ha pagado en su totalidad
                                </p>
                            </div>
                        )}

                        {paidPercentage > 100 && (
                            <div className="text-warning d-flex align-items-center flex-column mt-4 mb-2">
                                <AiFillWarning className="icon-large mb-2" />
                                <p className="h4 text-center">
                                    ¡Se ha pagado un{" "}
                                    {roundMoneyAmount(paidPercentage - 100)}% de
                                    más!
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="card py-5 px-3">
                        {payments.length === 0 && <EmptyList />}

                        {(user.rol === "coordinador" ||
                            user.rol === "logistica") && (
                            <LargeCreateButton onClick={handleCreate} />
                        )}

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
                                                {user.rol === "coordinador" && (
                                                    <th scope="col text-center">
                                                        Acciones
                                                    </th>
                                                )}
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
                                                    {roundMoneyAmount(
                                                        getSum(
                                                            payments,
                                                            "monto"
                                                        )
                                                    )}
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
