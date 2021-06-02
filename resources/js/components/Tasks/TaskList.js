import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { openModal } from "../../store/actions/modalActions";
import { closeTasks, getTasks } from "../../store/actions/taskActions";
import TaskCard from "./TaskCard";
import TaskModal, { emptyTask } from "./TaskModal";

const TaskList = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const tasks = useSelector(state => state.task.tasks);

    useEffect(() => {
        dispatch(getTasks());
    }, []);

    const handleCreate = () => {
        dispatch(
            openModal({
                title: "Agregar Tarea",
                body: <TaskModal task={emptyTask} />
            })
        );
    };

    return (
        <React.Fragment>
            <h1 className="text-center mb-5">Tareas</h1>

            {user.rol === "coordinador" && (
                <div className="container text-center">
                    <button
                        className="btn btn-lg btn-outline-primary btn-round"
                        onClick={handleCreate}
                    >
                        <i className="fa fa-plus fa-2x"></i>&nbsp;&nbsp;Agregar
                        Tarea
                    </button>
                </div>
            )}
            <div className="d-flex flex-column-reverse">
            {tasks.map(task => {
                return <TaskCard key={task.id} task={task} />;
            })}
            </div>
            
        </React.Fragment>
    );
};

export default TaskList;
