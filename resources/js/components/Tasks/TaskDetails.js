import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { openModal } from "../../store/actions/modalActions";
import { editTask, getTask } from "../../store/actions/taskActions";
import { dateToString, dayInSeconds } from "../../utils";
import LoadingScreen from "../Navigation/LoadingScreen";
import ProviderCard from "../Providers/ProviderCard";
import TaskModal from "./TaskModal";

const TaskDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.auth.user);
    const task = useSelector(state => state.task.task);
    const { id } = useParams();

    const handleGoBack = () => {
        history.goBack();
    };

    useEffect(() => {
        document.body.scrollTo(0, 0);
        dispatch(getTask(id));
    }, []);

    if (!task) {
        return <LoadingScreen />;
    }

    const handleEdit = () => {
        const taskToEdit = {
            id: task.id,
            nombre: task.nombre,
            user_id: task.usuario.id,
            fecha_fin: task.fecha_fin.split(" ")[0],
            descripcion: task.descripcion
        };

        dispatch(
            openModal({
                title: "Editar Tarea",
                body: <TaskModal task={taskToEdit} isEditor={true} />
            })
        );
    };

    return (
        <div className="container-fluid fade-in">
            <div className="container-fluid d-flex justify-content-between mb-4">
                <div className="">
                    <Link
                        to="/home"
                        className="btn btn-outline-primary btn-round"
                        onClick={handleGoBack}
                    >
                        <span className="material-icons mr-2">
                            keyboard_backspace
                        </span>
                        Atras
                    </Link>
                </div>
            </div>

            <div className="mr-auto text-center py-4">
                <h1 className="h2">Tarea : {task.nombre}</h1>
            </div>

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
                <div className="detalle col-lg-6 mb-3">
                    <strong>Días Totales :</strong>{" "}
                    {Math.round(
                        (new Date(task.fecha_fin) - new Date(task.created_at)) /
                            dayInSeconds
                    )}
                </div>

                <div className="detalle col-lg-6 mb-3">
                    <strong>Días Restantes :</strong>{" "}
                    {Math.round(
                        (new Date(task.fecha_fin) - new Date()) / dayInSeconds
                    )}
                </div>
            </div>

            <div className="py-2 text-justify keep-line-breaks">
                {task.descripcion}
            </div>

            <div className="mr-auto text-center py-2 mb-5">
                <button
                    className="btn btn-outline-warning btn-round ml-1"
                    onClick={handleEdit}
                >
                    <span className="material-icons">edit</span>
                    Editar
                </button>
            </div>

            {false && (
                <div className="alert alert-success text-center mb-5">
                    Esta empresa actualmente mantiene una negociación
                </div>
            )}

            <div className="mr-auto text-center">
                <h2 className="py-4">Empresas Asociadas</h2>

                <button className="btn btn-lg btn-outline-primary btn-round">
                    Agregar Empresa
                </button>
            </div>

            <ProviderCard />
            <ProviderCard />
            <ProviderCard />
            <ProviderCard />
            <ProviderCard />
        </div>
    );
};

export default TaskDetails;
