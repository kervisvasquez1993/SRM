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
    // @ts-ignore
    const isOpen = useSelector(store => store.modal.isOpen);
    // @ts-ignore
    const title = useSelector(store => store.modal.title);
    // @ts-ignore
    const body = useSelector(store => store.modal.body);
    // @ts-ignore
    const onClose = useSelector(store => store.modal.onClose);

    const handleClose = () => {
        dispatch(closeModal());
    };

    useEffect(() => {
        if (!isOpen) {
            if (onClose) {
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
        // Detectar si se hace click muy cerca de la barra de scroll
        if (e.clientX + 10 >= e.target.clientWidth) {
            return;
        }

        // Si no se está en un dispositivo con pantalla tactil
        if (!isTouchDevice()) {
            console.log("click brakcgroubsdx");
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
                style={isOpen ? { display: "block" } : { display: "none" }}
                onPointerDown={clickBackground}
            >
                <div
                    className="modal-dialog modal-primary modal-lg modal-xl modal-fullscreen-xl-down"
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

            {isOpen && (
                <div
                    className="modal-backdrop fade show"
                    onPointerDown={clickBackground}
                ></div>
            )}
        </React.Fragment>
    );
};

export default Modal;
