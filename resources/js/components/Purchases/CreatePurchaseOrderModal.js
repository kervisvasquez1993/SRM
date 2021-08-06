import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LargeCreateButton from "../Widgets/LargeCreateButton";
import { openModal } from "../../store/actions/modalActions";
import { useDropzone } from "react-dropzone";
import { BsCloudDownload, BsUpload } from "react-icons/bs";
import LoadingSpinner from "../Navigation/LoadingSpinner";
import PurchaseOrderModal, { emptyPurchase } from "./PurchaseOrderModal";
import { uploadPurchaseOrders } from "../../store/actions/purchaseOrderActions";

const CreatePurchaseOrderModal = ({ pivotId }) => {
    const dispatch = useDispatch();

    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive
    } = useDropzone({
        maxFiles: 1,
        accept: ".xlsx"
    });

    const isUploading = useSelector(
        // @ts-ignore
        state => state.purchaseOrder.isUploadingFile
    );

    const handleCreate = () => {
        dispatch(
            openModal({
                title: "Agregar Orden de Compra",
                body: (
                    <PurchaseOrderModal
                        purchase={emptyPurchase}
                        pivotId={pivotId}
                    />
                )
            })
        );
    };

    const handleImport = e => {
        e.preventDefault();
        dispatch(uploadPurchaseOrders(pivotId, acceptedFiles[0]));
        acceptedFiles.length = 0;
    };

    return (
        <div className="modal-body d-flex flex-column align-items-center ">
            <h3 className="mb-5">Importar Excel</h3>

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
                        {acceptedFiles[0].name} - {acceptedFiles[0].size} bytes
                    </div>
                ) : (
                    <span>Arrastre un archivo excel o haga clic aquí</span>
                )}
            </div>

            <button
                className="btn btn-lg btn-success btn-round mb-5"
                onClick={handleImport}
                disabled={acceptedFiles.length == 0 || isUploading}
            >
                {isUploading ? (
                    <LoadingSpinner />
                ) : (
                    <React.Fragment>
                        "Subir Archivo"
                        <BsUpload className="ml-2 icon-normal" />
                    </React.Fragment>
                )}
            </button>

            <p>Puede descargar una plantilla usando el siguiente botón:</p>

            <a className="btn btn-info" href="/templates/ordenes_compra.xlsx">
                Descargar Plantilla
                <BsCloudDownload className="ml-2 icon-normal" />
            </a>

            {/* <hr className="mb-5" />
            <h3 className="text-center">Agregar Orden Nueva</h3>
            <p>O puede crear una orden de compra totalmente desde cero:</p>
            <LargeCreateButton onClick={handleCreate} /> */}
        </div>
    );
};

export default CreatePurchaseOrderModal;
