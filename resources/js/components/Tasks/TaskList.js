import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/actions/modalActions";
import { clearTaskList, getTasks } from "../../store/actions/taskActions";
import CheckboxFilter from "../Filters/CheckboxFilter";
import Filter from "../Filters/Filter";
import FilterGroup from "../Filters/FilterGroup";
import TaskCard from "./TaskCard";
import TaskModal, { emptyTask } from "./TaskModal";
import { apiURL } from "../App";
import SliderFilter from "../Filters/SliderFilter";
import { getDaysToFinishTask } from "../../utils";
import { Redirect } from "react-router-dom";
import EmptyList from "../Navigation/EmptyList";
import LoadingScreen from "../Navigation/LoadingScreen";
import { getUsers } from "../../store/actions/userActions";

const TaskList = ({ myTasks = false }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const tasks = useSelector(state => state.task.tasks);
    const users = useSelector(state => state.user.users);

    const [filteredTasks, setFilteredTasks] = useState([...tasks]);
    const [filterDays, setFilterDays] = useState(0);
    const filter = useRef(null);

    if (
        (!myTasks &&
            !(user.rol === "coordinador" || user.rol === "observador")) ||
        user.rol === "artes"
    ) {
        return <Redirect to="/home" />;
    }

    useEffect(() => {
        dispatch(getTasks(myTasks));
        dispatch(getUsers())

        return () => {
            dispatch(clearTaskList());
        };
    }, []);

    useEffect(() => {
        applyFilter(filter.current);
    }, [tasks]);

    const handleCreate = () => {
        dispatch(
            openModal({
                title: "Agregar Tarea",
                body: <TaskModal task={emptyTask} />
            })
        );
    };

    const applyFilter = filter => {
        const newTasks = tasks.filter(task => {
            let render = true;

            // Si la tarea le pertenece a un usuario seleccionado
            if ("user" in filter && !filter.user[task.usuario.id]) {
                render = false;
            }

            //Verificar si la tarea esta expirada
            const timeToFinish = new Date(task.fecha_fin) - new Date();
            if (
                "state" in filter &&
                !filter.state.expired &&
                timeToFinish < 0
            ) {
                render = false;
            }

            if ("time" in filter) {
                setFilterDays(filter.time.days);
            }

            if (
                "time" in filter &&
                getDaysToFinishTask(task) > filter.time.days
            ) {
                render = false;
            }

            return render;
        });

        setFilteredTasks(newTasks);
    };

    const countExpired = () => {
        return tasks.filter(task => {
            const timeToFinish = new Date(task.fecha_fin) - new Date();
            return timeToFinish < 0;
        }).length;
    };

    const countByUserId = id => {
        return tasks.filter(task => task.usuario.id === id).length;
    };

    const getMaxDays = () => {
        const dias = tasks.map(task => {
            return getDaysToFinishTask(task);
        });

        return Math.max(...dias, 0);
    };

    const getMinDays = () => {
        const dias = tasks.map(task => {
            return getDaysToFinishTask(task);
        });

        return Math.max(Math.min(...dias, 0), 1);
    };

    const maxDays = getMaxDays();

    return (
        <React.Fragment>
            <h1 className="text-center my-5">
                {myTasks ? "Mis Tareas" : "Tareas"}
            </h1>

            {!myTasks && user.rol === "coordinador" && (
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

            <Filter onUpdate={applyFilter} useRef={filter}>
                <div className="px-3 row mb-4">
                    {!myTasks && (
                        <FilterGroup name="user" text="Usuario:">
                            {users.map((user, index) => {
                                const count = countByUserId(user.id);

                                if (count === 0) {
                                    return;
                                }

                                return (
                                    <CheckboxFilter
                                        key={index}
                                        id={user.id}
                                        text={`${user.name} (${count})`}
                                    />
                                );
                            })}
                        </FilterGroup>
                    )}

                    <FilterGroup name="state" text="Estado:">
                        <CheckboxFilter
                            id="expired"
                            text={`Expirados (${countExpired()})`}
                        />
                    </FilterGroup>
                    {tasks.length > 0 && maxDays > 1 && (
                        <FilterGroup name="time" text="Tiempo de expiración:">
                            <SliderFilter
                                id="days"
                                key={maxDays}
                                text={`${filterDays} días`}
                                min={getMinDays()}
                                max={maxDays}
                                defaultValue={maxDays}
                                step="1"
                                reversed
                            />
                        </FilterGroup>
                    )}
                </div>
            </Filter>

            {filteredTasks.length > 0 ? (
                <div className="d-flex flex-column-reverse">
                    {filteredTasks.map(task => {
                        return <TaskCard key={task.id} task={task} />;
                    })}
                </div>
            ) : (
                <EmptyList />
            )}
        </React.Fragment>
    );
};

export default TaskList;
