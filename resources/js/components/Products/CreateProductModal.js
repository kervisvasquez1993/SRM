import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LargeCreateButton from "../Widgets/LargeCreateButton";
import { openModal } from "../../store/actions/modalActions";
import ProductFormModal, { emptyProduct } from "./ProductFormModal";
import { useDropzone } from "react-dropzone";
import { BsUpload } from "react-icons/bs";
import { uploadProductForNegotiation } from "../../store/actions/productActions";
import LoadingSpinner from "../Navigation/LoadingSpinner";

const CreateProductModal = ({ pivotId }) => {
    const dispatch = useDispatch();

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
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
    };

    return (
        <div className="modal-body">
            <h3 className="text-center">Agregar Excel</h3>
            <p>Puede usar esta opción para subir un archivo excel:</p>

            <div {...getRootProps({ className: "dropzone rounded mx-5 mb-2" })}>
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
