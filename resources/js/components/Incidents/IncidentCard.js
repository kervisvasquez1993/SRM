import React from "react";
import { dateToShortString } from "../../utils";
import SeeMoreText from "../UI/SeeMoreText";

const titleStyle = { width: "16.666%" };

const IncidentCard = ({ data, handleEdit, handleDelete }) => {
    return (
        <div className={`card shadow-lg my-4 fade-in`}>
            <div className="card-body pb-0">
                <h5 className="card-title font-weight-bold">{data.titulo}</h5>
                <hr />
                <p className="card-text keep-line-breaks">
                    <SeeMoreText maxLength={200}>
                        {data.descripcion}
                    </SeeMoreText>
                </p>
            </div>

            <div className="card-footer">
                <div className="d-flex justify-content-between align-items-center w-100 flex-wrap">
                    <div className="d-flex">
                        <i className="material-icons mr-1">access_time</i>
                        Fecha :{" "}
                        <strong>
                            {dateToShortString(new Date(data.created_at))}
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
