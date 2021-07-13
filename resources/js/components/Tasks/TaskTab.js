import React from "react";
import { BiLink } from "react-icons/bi";
import { Link } from "react-router-dom";
import { dateToString } from "../../utils";

const TaskTab = ({ task, user = null }) => {
    console.log(task);
    return (
        <React.Fragment>
            <ul className="list-group">
                <li className="list-group-item">
                    <h3>{task.nombre} </h3>
                </li>

                <li className="list-group-item">
                    <div
                        className="card-text rich-text"
                        dangerouslySetInnerHTML={{ __html: task.descripcion }}
                    ></div>
                </li>

                {user && (
                    <li className="list-group-item">
                        <div className="d-flex align-items-center">
                            <span className="material-icons">person</span>
                            <p className="my-0">
                                <strong>Persona a cargo : </strong>

                                {user.name}
                            </p>
                        </div>
                    </li>
                )}

                <li className="list-group-item">
                    <div className="d-flex align-items-center">
                        <span className="material-icons md-18 mr-1">
                            access_time
                        </span>
                        <p className="my-0">
                            <strong>Fecha de Finalizacion : </strong>
                            {dateToString(new Date(task.fecha_fin))}
                        </p>
                    </div>
                </li>

                {task.cantidad_proveedores != undefined && (
                    <li className="list-group-item">
                        <div className="d-flex align-items-center">
                            <span className="material-icons md-18 mr-1">
                                business
                            </span>
                            <p className="my-0">
                                <strong>Empresas agregadas : </strong>
                                {task.cantidad_proveedores}
                            </p>
                        </div>
                    </li>
                )}
            </ul>

            <div className="text-center my-3">
                <Link
                    to={`/tasks/${task.id}`}
                    className="btn btn-info btn-round"
                >
                    Ver Detalles
                    <BiLink className="icon-normal ml-2" />
                </Link>
            </div>
        </React.Fragment>
    );
};

export default TaskTab;
