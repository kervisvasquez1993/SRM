import React from "react";
import { useDispatch } from "react-redux";
import {
    createPayment,
    editPayment
} from "../../../store/actions/productionActions";
import InputDate from "../../Form/InputDate";
import InputNumber from "../../Form/InputNumber";
import InputText from "../../Form/InputText";
import GenericFormModal from "../../Table/GenericFormModal";
import { useDropzone } from "react-dropzone";

export const emptyPayment = {
    titulo: "",
    fecha: "",
    monto: ""
};

const PaymentModal = ({ production, formData, isEditor }) => {
    const dispatch = useDispatch();

    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive
    } = useDropzone({
        maxFiles: 1
    });

    const onSubmit = data => {
        let formData = new FormData();
        formData.append("archivo_factura", acceptedFiles[0]);
        Object.keys(data).forEach(key => formData.append(key, data[key]));

        if (isEditor) {
            dispatch(editPayment(formData));
        } else {
            dispatch(createPayment(production, formData));
        }
    };

    return (
        <GenericFormModal
            formData={formData}
            storeName="production"
            isEditor={isEditor}
            onSubmit={onSubmit}
        >
            <InputText id="titulo" label="Titulo" />
            <InputDate id="fecha" label="Fecha" />
            <InputNumber id="monto" label="Monto" />

            {formData.url_archivo_factura ? (
                <React.Fragment>
                    <p className="my-5">
                        Este pago cuenta con un archivo de factura:{" "}
                        <a
                            href={`https://srmdnamics-laravel-file.s3.us-east-2.amazonaws.com/${formData.url_archivo_factura}`}
                            target="_blank"
                            download="factura"
                        >
                            Descargar
                        </a>
                    </p>

                    <p>Si lo desea, puede remplazar el archivo anterior:</p>
                </React.Fragment>
            ) : null}
            <div className="d-flex justify-content-center">
                <div
                    {...getRootProps({
                        className: `dropzone rounded mx-5 mb-2 ${
                            isDragActive ? "drag-active" : ""
                        }`
                    })}
                >
                    <input name="import" {...getInputProps()} />
                    {acceptedFiles.length > 0 ? (
                        <div>
                            {acceptedFiles[0].name} - {acceptedFiles[0].size}{" "}
                            bytes
                        </div>
                    ) : (
                        <span>Arrastre un archivo excel o haga clic aquí</span>
                    )}
                </div>
            </div>
        </GenericFormModal>
    );
};

export default PaymentModal;
