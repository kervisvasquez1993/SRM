import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import {
    closeModal,
    removeModalCloseCallback
} from "../../store/actions/modalActions";
import { isTouchDevice } from "../../utils";

const Modal = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(store => store.modal.isOpen);
    const title = useSelector(store => store.modal.title);
    const body = useSelector(store => store.modal.body);
    const onClose = useSelector(store => store.modal.onClose);

    const handleClose = () => {
        console.log("cerrar");
        dispatch(closeModal());
    };

    useEffect(() => {
        if (!isOpen) {
            console.log("se cerro el modal");
            if (onClose) {
                console.log("abrir de nuevo");
                onClose();
                dispatch(removeModalCloseCallback());
            }
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = e => {
            if (e.keyCode === 27) {
                handleClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    if (!isOpen) {
        return null;
    }

    const stopPropagation = e => {
        e.stopPropagation();
    };

    const clickBackground = e => {
        if (!isTouchDevice()) {
            e.preventDefault();
            e.stopPropagation();
            handleClose();
        }
    };

    return (
        <React.Fragment>
            {isOpen && (
                <Helmet>
                    <body className="modal-open" />
                </Helmet>
            )}
            <div
                className={"modal fade" + (isOpen ? "show" : "")}
                id="abrirmodal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="myModalLabel"
                style={isOpen ? { display: "block" } : { display: "none" }}
                aria-hidden="true"
                onPointerDown={clickBackground}
            >
                <div
                    className="modal-dialog modal-primary modal-lg"
                    role="document"
                    onPointerDown={stopPropagation}
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{title}</h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={handleClose}
                            >
                                <span
                                    aria-hidden="true"
                                    className="icon-medium"
                                >
                                    ×
                                </span>
                            </button>
                        </div>
                        {body}
                    </div>
                </div>
            </div>
            {isOpen && <div className="modal-backdrop fade show"></div>}
        </React.Fragment>
    );
};

export default Modal;
