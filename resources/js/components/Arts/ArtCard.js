import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/actions/modalActions";
import ArtModal from "./ArtModal";

const ArtCard = ({ art }) => {
    const dispatch = useDispatch();

    const handleOpenManagement = () => {
        dispatch(
            openModal({
                title: art.proveedor,
                body: <ArtModal artId={art.id} />
            })
        );
    };

    return (
        <div
            className={`card my-2 fade-in py-2`}
            onClick={handleOpenManagement}
            style={{ cursor: "pointer" }}
        >
            <div className="card-header ">
                <div className="row">
                    <div className="col-sm h4 d-flex mb-3">
                        <p className="m-0">
                            <span className="material-icons mr-2">
                                business
                            </span>
                            Proveedor : <strong>{art.proveedor}</strong>
                        </p>
                    </div>
                    <div className="col-sm h4 d-flex">
                        <p className="m-0">
                            <span className="material-icons mr-2">task</span>
                            Tarea : <strong>{art.tarea}</strong>
                        </p>
                    </div>
                </div>
            </div>

            <div className="card-body py-0 my-0 ml-2"></div>

            <div className="card-footer">
                <div className="d-flex justify-content-end align-items-center w-100 flex-wrap">
                    <button className="btn btn-success btn-round">
                        Administrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ArtCard;
