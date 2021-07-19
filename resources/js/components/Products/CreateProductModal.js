import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LargeCreateButton from "../Widgets/LargeCreateButton";
import { openModal } from "../../store/actions/modalActions";
import ProductFormModal, { emptyProduct } from "./ProductFormModal";
import { useDropzone } from "react-dropzone";
import { BsCloudDownload, BsUpload } from "react-icons/bs";
import { uploadProductForNegotiation } from "../../store/actions/productActions";
import LoadingSpinner from "../Navigation/LoadingSpinner";

const CreateProductModal = ({ pivotId }) => {
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

    const isUploading = useSelector(state => state.product.isUploadingFile);

    const handleCreate = () => {
        dispatch(
            openModal({
                title: "Agregar Producto",
                body: (
                    <ProductFormModal
                        product={emptyProduct}
                        pivotId={pivotId}
                    />
                )
            })
        );
    };

    const handleImport = e => {
        e.preventDefault();
        dispatch(uploadProductForNegotiation(pivotId, acceptedFiles[0]));
        acceptedFiles.length = 0;
    };

    return (
        <div className="modal-body">
            <h3 className="text-center">Agregar Excel</h3>

            <p>Puede descargar la plantilla desde aquí: </p>

            <div className="text-center mb-4">
                <a
                    className="btn btn-info"
                    href="/templates/productos.xlsx"
                >
                    Descargar Plantilla
                    <BsCloudDownload className="ml-2 icon-normal" />
                </a>
            </div>

            <p>
                Si ya tiene un documento Excel, puede agregarlo usando la
                siguiente caja:
            </p>

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

            <div className="text-center">
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
            </div>

            <hr className="mb-5" />
            <h3 className="text-center">Agregar Producto Nuevo</h3>
            <p>O puede crear un producto totalmente desde cero:</p>
            <LargeCreateButton onClick={handleCreate} />
        </div>
    );
};

export default CreateProductModal;
