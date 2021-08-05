import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LargeCreateButton from "../Widgets/LargeCreateButton";
import { openModal } from "../../store/actions/modalActions";
import ProductFormModal, { emptyProduct } from "./ProductFormModal";
import { useDropzone } from "react-dropzone";
import { BsCloudDownload, BsUpload } from "react-icons/bs";
import { uploadProductForNegotiation } from "../../store/actions/productActions";
import LoadingSpinner from "../Navigation/LoadingSpinner";

const CreateProductModal = ({ negotiation }) => {
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

    // @ts-ignore
    const isUploading = useSelector(state => state.product.isUploadingFile);

    const canAddSingleProduct = false;

    const handleCreate = () => {
        dispatch(
            openModal({
                title: "Agregar Productos",
                body: (
                    <ProductFormModal
                        product={emptyProduct}
                        pivotId={negotiation.id}
                    />
                )
            })
        );
    };

    const handleImport = e => {
        e.preventDefault();
        dispatch(uploadProductForNegotiation(negotiation.id, acceptedFiles[0]));
        acceptedFiles.length = 0;
    };

    return (
        <div className="modal-body d-flex flex-column align-items-center pb-5">
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
                className="btn btn-lg btn-success btn-round mb-4"
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

            <a className="btn btn-info" href="/templates/productos.xlsx">
                Descargar Plantilla
                <BsCloudDownload className="ml-2 icon-normal" />
            </a>

            {canAddSingleProduct && (
                <React.Fragment>
                    <hr className="my-5 w-100" />
                    <h3 className="">Agregar producto sin excel</h3>
                    <LargeCreateButton onClick={handleCreate} />
                </React.Fragment>
            )}
        </div>
    );
};

export default CreateProductModal;
