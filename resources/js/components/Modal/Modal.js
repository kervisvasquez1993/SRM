import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, removeModalCloseCallback } from "../../store/actions/modalActions";

const Modal = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(store => store.modal.isOpen);
    const title = useSelector(store => store.modal.title);
    const body = useSelector(store => store.modal.body);
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

    if (!isOpen) {
        return null;
    }

    const stopPropagation = e => {
        e.stopPropagation();
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
                tabIndex="-1"
                role="dialog"
                aria-labelledby="myModalLabel"
                style={isOpen ? { display: "block" } : { display: "none" }}
                aria-hidden="true"
                onPointerDown={handleClose}
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
                                <span aria-hidden="true">×</span>
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
