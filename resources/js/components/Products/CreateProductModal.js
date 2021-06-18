import React from "react";
import { useDispatch } from "react-redux";
import LargeCreateButton from "../Widgets/LargeCreateButton";
import { openModal } from "../../store/actions/modalActions";
import ProductFormModal, { emptyProduct } from "./ProductFormModal";

const CreateProductModal = ({ pivotId }) => {
    const dispatch = useDispatch();

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
    };

    return (
        <div className="modal-body">
            <h3 className="text-center">Agregar Excel</h3>
            <p>Puede usar esta opción para subir un archivo excel:</p>
            <LargeCreateButton onClick={handleImport} />
            <hr className="my-5" />
            <h3 className="text-center">Agregar Producto Nuevo</h3>
            <p>O puede crear un producto totalmente desde cero:</p>
            <LargeCreateButton onClick={handleCreate} />
        </div>
    );
};

export default CreateProductModal;
