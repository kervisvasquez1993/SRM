import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteIncident } from "../../../store/actions/incidentActions";
import { openModal } from "../../../store/actions/modalActions";
import { dateToShortString } from "../../../utils";
import SeeMoreText from "../../UI/SeeMoreText";
import IncidentModal from "./IncidentModal";

const IncidentCard = ({ stateName, url1, url2, incident }) => {
    const dispatch = useDispatch();

    const modal = useSelector(store => store.modal);

    const handleEdit = () => {
        dispatch(
            openModal({
                title: "Editar Incidencia",
                body: (
                    <IncidentModal
                        stateName={stateName}
                        url1={url1}
                        url2={url2}
                        formData={incident}
                        isEditor={true}
                    />
                ),
                onClose: () =>
                    dispatch(openModal({ ...modal, defaultTab: url2 }))
            })
        );
    };

    const handleDelete = () => {
        dispatch(deleteIncident(url2, incident.id));
    };

    return (
        <div className={`card shadow-lg my-4 fade-in`}>
            <div className="card-body pb-0">
                <h5 className="card-title font-weight-bold">
                    {incident.titulo}
                </h5>
                <hr />
                <p className="card-text keep-line-breaks">
                    <SeeMoreText maxLength={200}>
                        {incident.descripcion}
                    </SeeMoreText>
                </p>
            </div>

            <div className="card-footer">
                <div className="d-flex justify-content-between align-items-center w-100 flex-wrap">
                    <div className="d-flex">
                        <i className="material-icons mr-1">access_time</i>
                        Fecha :{" "}
                        <strong>
                            {dateToShortString(new Date(incident.created_at))}
                        </strong>
                    </div>

                    <div className="d-flex bt-sm justify-content-start">
                        <button
                            className="btn btn-success btn-circle"
                            type="button"
                            onClick={handleEdit}
                        >
                            <span className="material-icons">edit</span>
                        </button>
                        <button
                            className="btn bt-sm btn-danger btn-circle"
                            type="button"
                            onClick={handleDelete}
                        >
                            <span className="material-icons">clear</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IncidentCard;
