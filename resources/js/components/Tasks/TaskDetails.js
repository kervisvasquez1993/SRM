import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { openModal } from "../../store/actions/modalActions";
import { getTask } from "../../store/actions/taskActions";
import {
    dateToString,
    getDaysToFinishTask,
    getRemainingDaysToFinishTask,
    getColorsForTask
} from "../../utils";
import LoadingScreen from "../Navigation/LoadingScreen";
import TaskSupplierList from "../Suppliers/TaskSupplierList";
import TaskFormModal from "./TaskFormModal";

const TaskDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    // @ts-ignore
    const user = useSelector(state => state.auth.user);
    // @ts-ignore
    const task = useSelector(state => state.task.current);
    // @ts-ignore
    const { id } = useParams();

    if (
        !(
            user.rol === "coordinador" ||
            user.rol === "observador" ||
            user.rol === "comprador" ||
            user.rol === "logistica"
        ) ||
        user.rol === "artes"
    ) {
        return <Redirect to="/home" />;
    }

    useEffect(() => {
        document.querySelector("#wrapper").scrollTo(0, 0);
        dispatch(getTask(id));
    }, []);

    if (!task) {
        return <LoadingScreen />;
    }

    if (user.rol === "comprador" && task.usuario.id != user.id) {
        return <Redirect to="/home" />;
    }

    const handleEdit = () => {
        const taskToEdit = {
            ...task,
            user_id: task.usuario.id
        };

        dispatch(
            openModal({
                title: "Editar Tarea",
                body: <TaskFormModal task={taskToEdit} isEditor={true} />
            })
        );
    };

    const { text, background } = getColorsForTask(task);

    return (
        <div className="container-fluid fade-in">
            <Helmet>
                <title>{`${task.nombre} - ${process.env.MIX_APP_NAME}`}</title>
            </Helmet>

            <div className="mr-auto text-center py-4">
                <h1 className="h2">Tarea : {task.nombre}</h1>
            </div>

            <div className={`card task-card ${text} ${background}`}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-6 mb-3">
                            <strong>Persona a cargo :</strong>
                            <span className="ml-4 d-inline-flex align-items-center">
                                <i className="material-icons">person</i>
                                {task.usuario.name}
                            </span>
                        </div>

                        <div className="col-lg-6 mb-3">
                            <strong>Fecha de Finalizacion :</strong>{" "}
                            {dateToString(new Date(task.fecha_fin))}
                        </div>
                    </div>

                    <div className="row">
                        {background === "bg-danger" ? (
                            <React.Fragment>
                                <div className="d-flex justify-content-center w-100 h5 my-2">
                                    <i className="material-icons mr-1">
                                        warning
                                    </i>
                                    Esta tarea expiró
                                </div>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <div className="detalle col-lg-6 mb-3">
                                    <strong>Días Totales :</strong>{" "}
                                    {getDaysToFinishTask(task)}
                                </div>

                                <div className="detalle col-lg-6 mb-3">
                                    <strong>Días Restantes :</strong>{" "}
                                    {getRemainingDaysToFinishTask(task)}
                                </div>
                            </React.Fragment>
                        )}
                    </div>
                </div>
            </div>

            <div
                className="py-2 text-justify rich-text"
                dangerouslySetInnerHTML={{ __html: task.descripcion }}
            ></div>

            {(user.rol === "coordinador" || user.rol === "comprador") && (
                <div className="mr-auto text-center py-2 mb-5">
                    <button
                        className="btn btn-outline-warning btn-round ml-1"
                        onClick={handleEdit}
                    >
                        <span className="material-icons">edit</span>
                        Editar
                    </button>
                </div>
            )}

            {false && (
                <div className="alert alert-success text-center mb-5">
                    Esta empresa actualmente mantiene una negociación
                </div>
            )}

            <TaskSupplierList />
        </div>
    );
};

export default TaskDetails;
