import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { openModal } from "../../store/actions/modalActions";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";

const TaskList = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get("api/tarea").then(response => {
            setTasks([...response.data.data]);
        });
    }, []);

    const handleCreate = () => {
        dispatch(openModal({
            title: "Agregar Tarea",
            body: <TaskModal/>
        }));
    }

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

            {
                tasks.map(task => {
                    return (
                        <TaskCard key={task.id} {...task} />
                    )
                })
            }
        </React.Fragment>
    );
};

export default TaskList;
