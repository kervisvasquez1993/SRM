import React from "react";
import { useDispatch } from "react-redux";
import { dateToShortString } from "../../../utils";

const titleStyle = { width: "16.666%" };

const PaymentRow = ({ payment }) => {
    const dispatch = useDispatch();

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
                <div className="d-flex justify-content-end">
                    <button
                        className="btn btn-success btn-circle ml-3"
                        type="button"
                        onClick={() => handleEdit(payment)}
                    >
                        <span className="material-icons">edit</span>
                    </button>
                    <button
                        className="btn btn-danger btn-circle"
                        type="button"
                        onClick={() => handleDelete(payment)}
                    >
                        <span className="material-icons">clear</span>
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default PaymentRow;
