import React from "react";
import { useDispatch } from "react-redux";
import { IoMdAddCircle } from "react-icons/io";
import { openModal } from "../../store/actions/modalActions";
import ProductFormModal from "./ProductFormModal";

const ProviderModal = () => {
    const dispatch = useDispatch();

    const handleCreateNewProvider = () => {
        dispatch(
            openModal({
                title: "Agregar Producto",
                body: (
                    <ProductFormModal
                        provider={emptyProvider}
                        taskId={taskId}
                    />
                )
            })
        );
    };

    const handleAddProvider = e => {
        e.preventDefault();
    };

    return (
        <div className="modal-body">
            <h3 className="text-center">Agregar Exceñ</h3>
            <p>Puede usar esta opción para subir un archivo excel:</p>
            <form className="form-horizontal">
                <div className="form-row"></div>

                <div className="form-row justify-content-center">
                    <button
                        className="btn btn-success btn-round"
                        type="submit"
                        onClick={handleAddProvider}
                    >
                        <IoMdAddCircle className="mr-2" />
                        Agregar
                    </button>
                </div>
            </form>
            <hr className="my-5" />
            <h3 className="text-center">Agregar Producto Nuevo</h3>
            <p>O cree una empresa totalmente desde cero:</p>
            <div className="form-row justify-content-center">
                <button
                    className="btn btn-success btn-round"
                    type="submit"
                    onClick={handleCreateNewProvider}
                >
                    <IoMdAddCircle className="mr-2" />
                    Agregar Empresa Nueva
                </button>
            </div>
        </div>
    );
};

export default ProviderModal;
