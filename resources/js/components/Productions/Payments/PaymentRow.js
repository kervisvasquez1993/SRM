import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../../store/actions/modalActions";
import { deletePayment } from "../../../store/actions/productionActions";
import { dateToShortString, stringToDateIgnoringTime } from "../../../utils";
import PaymentModal from "./PaymentModal";

const titleStyle = { width: "16.666%" };

const PaymentRow = ({ payment, production }) => {
    const dispatch = useDispatch();

    const handleEdit = product => {
        console.log(payment);
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
    };

    const handleDelete = product => {
        dispatch(deletePayment(payment.id));
    };

    return (
        <tr
            key={payment.id}
            className={`fade-in ${
                payment.tipo === "Pago Anticipado" ? "bg-info" : ""
            }`}
            style={titleStyle}
        >
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
            <td style={titleStyle}>{payment.titulo}</td>
            <td style={titleStyle}>{payment.tipo}</td>
            <td style={titleStyle}>{payment.user_id}</td>
            <td style={titleStyle}>
                {dateToShortString(new Date(payment.fecha))}
            </td>
            <td style={titleStyle}>{payment.monto}</td>
            <td style={titleStyle}>
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
        </tr>
    );
};

export default PaymentRow;
