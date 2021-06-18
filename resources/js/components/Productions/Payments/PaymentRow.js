import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../../store/actions/modalActions";
import { deletePayment } from "../../../store/actions/productionActions";
import { dateToShortString, useUser } from "../../../utils";
import PaymentModal from "./PaymentModal";

const PaymentRow = ({ index, payment, production }) => {
    const user = useUser();
    const dispatch = useDispatch();

    const handleEdit = product => {
        /*
        dispatch(
            openModal({
                title: "Editar Pago",
                body: (
                    <PaymentModal
                        payment={payment}
                        production={production}
                        isEditor={true}
                    />
                )
            })
        );
        */
        dispatch(
            openModal({
                title: "Agregar Pago",
                body: (
                    <PaymentModal
                        formData={payment}
                        isEditor={true}
                        production={production}
                    />
                )
            })
        );
    };

    const handleDelete = product => {
        dispatch(deletePayment(payment.id));
    };

    return (
        <tr key={payment.id} className="fade-in">
            {/* <EditableInput
                isTableCell={true}
                id="titulo"
                data={paymentData}
                setData={setPaymentData}
            /> */}
            {/* <EditableInput
                isTableCell={true}
                id="monto"
                data={paymentData}
                setData={setPaymentData}
            /> */}
            <th scope="row">{index}</th>
            <td>{payment.titulo}</td>
            <td>{payment.tipo}</td>
            <td>{payment.user.name}</td>
            <td>{dateToShortString(new Date(payment.fecha))}</td>
            <td>{payment.monto}</td>
            {user.rol === "coordinador" && (
                <td className="text-right">
                    <div className="d-flex justify-content-start">
                        <button
                            className="btn btn-success btn-circle ml-3"
                            type="button"
                            onClick={() => handleEdit(payment)}
                        >
                            <span className="material-icons">edit</span>
                        </button>
                        {payment.tipo != "Pago Anticipado" && (
                            <button
                                className="btn btn-danger btn-circle"
                                type="button"
                                onClick={() => handleDelete(payment)}
                            >
                                <span className="material-icons">clear</span>
                            </button>
                        )}
                    </div>
                </td>
            )}
        </tr>
    );
};

export default PaymentRow;
