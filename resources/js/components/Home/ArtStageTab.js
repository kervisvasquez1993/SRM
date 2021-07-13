import React from "react";
import { BiLink } from "react-icons/bi";
import { Link } from "react-router-dom";
import { categories, dictOptions } from "../Arts/ArtCard";
import EmptyList from "../Navigation/EmptyList";

const ArtStageTab = ({ art }) => {
    return (
        <React.Fragment>
            <h3 className="text-center">Artes</h3>

            {art ? (
                <React.Fragment>
                    <ul className="list-group">
                        {categories.map(({ value, label }) => {
                            return (
                                <li className="list-group-item" key={value}>
                                    <p className="mb-0">
                                        {label} {dictOptions[art[value]]}
                                    </p>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="text-center my-3">
                        <Link
                            to={`/arts?id=${art.id}`}
                            className="btn btn-info btn-round"
                        >
                            Ver Detalles
                            <BiLink className="icon-normal ml-2" />
                        </Link>
                    </div>
                </React.Fragment>
            ) : (
                <EmptyList message="No se ha iniciado arte" />
            )}
        </React.Fragment>
    );
};

export default ArtStageTab;
