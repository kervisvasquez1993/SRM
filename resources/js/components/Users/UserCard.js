import { capitalize } from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openArtModal, updateArt } from "../../store/actions/artActions";
import { dateToString } from "../../utils";

const UserCard = ({ name, email, created_at, rol }) => {
    return (
        <div className="card fade-in my-2 py-2">
            <div className="card-header pb-0">
                <h2 className="h4 text-center d-flex">
                    <span className="material-icons mr-2">person</span>
                    {name}
                </h2>
            </div>

            <div className="card-body pt-0">
                <p className="card-text">
                    <small className="card-text text-muted">
                        {capitalize(rol)}
                    </small>
                </p>

                <p className="card-text d-flex align-items-center mb-0">
                    <span className="material-icons mr-2 md-18">email</span>
                    <small className="text-muted">{email}</small>
                </p>

                <p className="card-text d-flex align-items-center">
                    <span className="material-icons mr-2 md-18">
                        calendar_today
                    </span>
                    <small className="text-muted">
                        Creado el {dateToString(new Date(created_at))}
                    </small>
                </p>
            </div>
        </div>
    );
};

export default UserCard;
