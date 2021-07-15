import React from "react";
import { BiLink } from "react-icons/bi";
import { Link } from "react-router-dom";
import { categories, dictOptions } from "../../Arts/ArtCard";
import EmptyList from "../../Navigation/EmptyList";

const Badge = ({
    children,
    background = "bg-primary",
    inheritSize = false
}) => {
    let style = {};

    if (inheritSize) {
        style["fontSize"] = "inherit";
    }

    return (
        <span className={`badge ${background}`} style={style}>
            {children}
        </span>
    );
};

const getColor = value => {
    if (value === "sin_inicializar") {
        return "bg-secondary";
    } else if (value === "en_proceso") {
        return "bg-primary";
    } else {
        return "bg-success";
    }
};

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
                                        <strong>{label}</strong>{" "}
                                        <Badge
                                            inheritSize
                                            background={getColor(art[value])}
                                        >
                                            {dictOptions[art[value]]}
                                        </Badge>
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
