import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/actions/modalActions";
import Accordion from "../UI/Accordion";
import NegotiationModal from "./NegotiationModal";

const NegotiationCard = ({ negotiation }) => {
    const dispatch = useDispatch();
    const { tarea, proveedor } = negotiation;

    const handleOpen = () => {
        dispatch(
            openModal({
                title: proveedor.nombre,
                body: <NegotiationModal negotiation={negotiation} />
            })
        );
    };

    return (
        <div className="card fade-in" onClick={handleOpen}>
            <div className="card-header ">
                <div className="row">
                    <div className="col-sm">Tarea: {tarea.nombre}</div>
                    <div className="col-sm">Proveedor: {proveedor.nombre}</div>
                </div>
                <hr />
            </div>

            <div className="card-footer">
                <div className="d-flex justify-content-end w-100 mt-2">
                    <button className="btn btn-sm btn-info btn-round">
                        Ver Detalles
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NegotiationCard;
