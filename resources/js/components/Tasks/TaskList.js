import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/actions/modalActions";
import { clearTaskList, getTasks } from "../../store/actions/taskActions";
import CheckboxFilter from "../Filters/CheckboxFilter";
import Filter from "../Filters/Filter";
import FilterGroup from "../Filters/FilterGroup";
import TaskCard from "./TaskCard";
import TaskModal, { emptyTask } from "./TaskModal";
import SliderFilter from "../Filters/SliderFilter";
import { getDaysToFinishTask } from "../../utils";
import { Redirect } from "react-router-dom";
import EmptyList from "../Navigation/EmptyList";
import LoadingScreen from "../Navigation/LoadingScreen";

const TaskList = ({ myTasks = false }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const tasks = useSelector(state => state.task.tasks);
    const isLoadingList = useSelector(state => state.task.isLoadingList);

    const [filtered, setFilteredTasks] = useState([...tasks]);
    const [filterDays, setFilterDays] = useState(1);
    const filter = useRef(null);

    const [filteredAfterStatus, setfilteredAfterStatus] = useState([]);
    const [filteredAfterUsers, setfilteredAfterUsers] = useState([]);

    if (
        (!myTasks &&
            !(user.rol === "coordinador" || user.rol === "observador")) ||
        user.rol === "artes"
    ) {
        return <Redirect to="/home" />;
    }

    useEffect(() => {
        dispatch(getTasks(myTasks));

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

    const isTaskExpired = task => {
        const timeToFinish = new Date(task.fecha_fin) - new Date();
        return timeToFinish < 0 && !task.completada;
    };

    const isTaskCompleted = task => {
        return task.completada;
    };

    // const isTaskInProgress = task => {
    //     return !isTaskCompleted(task) && !isTaskExpired(task);
    // };

    const isTaskNotInNegotiation = task => {
        return (
            !isTaskCompleted(task) &&
            !isTaskExpired(task) &&
            !task.tiene_negociacion
        );
    };

    const isTaskInNegotiation = task => {
        return (
            !isTaskCompleted(task) &&
            !isTaskExpired(task) &&
            task.tiene_negociacion
        );
    };

    const countCompleted = () => {
        return tasks.filter(task => isTaskCompleted(task)).length;
    };

    // const countInProgress = () => {
    //     return tasks.filter(task => isTaskInProgress(task)).length;
    // };

    const countNotInNegotiation = () => {
        return tasks.filter(task => isTaskNotInNegotiation(task)).length;
    };

    const countInNegotiation = () => {
        return tasks.filter(task => isTaskInNegotiation(task)).length;
    };

    const countExpired = () => {
        return tasks.filter(task => isTaskExpired(task)).length;
    };

    const countByUserName = name => {
        return filteredAfterStatus.filter(task => task.usuario.name === name)
            .length;
    };

    const getMaxDays = () => {
        const dias = filteredAfterUsers.map(task => {
            return getDaysToFinishTask(task);
        });

        return Math.max(...dias, 0);
    };

    const getMinDays = () => {
        const dias = filteredAfterUsers.map(task =>
            isTaskExpired(task) || isTaskCompleted(task)
                ? Infinity
                : getDaysToFinishTask(task)
        );

        return Math.max(Math.min(...dias));
    };

    const applyFilter = filter => {
        if (filter === null) {
            return;
        }

        let list = [...tasks];

        // Filter by status
        list = list.filter(task => {
            if ("state" in filter) {
                if (!filter.state.expired && isTaskExpired(task)) {
                    return false;
                }

                if (!filter.state.completed && isTaskCompleted(task)) {
                    return false;
                }

                // if (!filter.state.progress && isTaskInProgress(task))
                //     return false;
                if (
                    !filter.state.notInNegotiation &&
                    isTaskNotInNegotiation(task)
                ) {
                    return false;
                }

                if (!filter.state.inNegotiation && isTaskInNegotiation(task)) {
                    return false;
                }
            }

            return true;
        });

        setfilteredAfterStatus(list);

        // Filter by user
        list = list.filter(
            task => !("user" in filter && !filter.user[task.usuario.name])
        );
        setfilteredAfterUsers(list);

        list.forEach(item => getDaysToFinishTask(item));

        // Filter by expiration days
        list = list.filter(
            task =>
                !(
                    "time" in filter &&
                    getDaysToFinishTask(task) > filter.time.days
                )
        );

        // Set the max days
        if ("time" in filter) {
            setFilterDays(filter.time.days);
        }

        setFilteredTasks(list);
    };

    const minDays = getMinDays();
    const maxDays = getMaxDays();

    //const inProgressTasks = filtered.filter(item => isTaskInProgress(item));
    const tasksNotInNegotiation = filtered.filter(item =>
        isTaskNotInNegotiation(item)
    );
    const tasksInNegotiation = filtered.filter(item =>
        isTaskInNegotiation(item)
    );
    const completedTasks = filtered.filter(item => isTaskCompleted(item));
    const expiredTasks = filtered.filter(item => isTaskExpired(item));

    let filteredUsers = new Set();
    filteredAfterStatus.forEach(item => filteredUsers.add(item.usuario.name));
    filteredUsers = [...filteredUsers].sort();

    if (isLoadingList) {
        return <LoadingScreen />;
    }

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
                    <FilterGroup name="state" text="Estado:">
                        <CheckboxFilter
                            id="notInNegotiation"
                            text={`Sin negociaciones (${countNotInNegotiation()})`}
                        />
                        <CheckboxFilter
                            id="inNegotiation"
                            text={`En negociación (${countInNegotiation()})`}
                        />
                        <CheckboxFilter
                            id="expired"
                            text={`Vencidas (${countExpired()})`}
                            defaultValue={true}
                        />
                        <CheckboxFilter
                            id="completed"
                            text={`Completadas (${countCompleted()})`}
                            defaultValue={false}
                        />
                    </FilterGroup>

                    {!myTasks && filteredUsers.length > 0 && (
                        <FilterGroup name="user" text="Usuario:">
                            {filteredUsers.map((user, index) => {
                                const count = countByUserName(user);

                                if (count === 0) {
                                    return;
                                }

                                return (
                                    <CheckboxFilter
                                        key={user}
                                        id={user}
                                        text={`${user} (${count})`}
                                    />
                                );
                            })}
                        </FilterGroup>
                    )}
                </div>

                {filteredAfterUsers.length > 1 && maxDays > 1 && maxDays != minDays && (
                    <div className="px-3 row mb-4">
                        <FilterGroup
                            name="time"
                            text="Tiempo de expiración:"
                            className="col-sm-6"
                        >
                            <SliderFilter
                                id="days"
                                key={maxDays}
                                text={`${filterDays} días`}
                                min={minDays}
                                max={maxDays}
                                defaultValue={maxDays}
                                step={1}
                                reversed
                            />
                        </FilterGroup>
                    </div>
                )}
            </Filter>

            {filtered.length > 0 ? (
                <React.Fragment>
                    {/* {inProgressTasks.length > 0 && (
                        <React.Fragment>
                            <h2 className="mt-4 h3">Tareas en progreso:</h2>
                            <hr className="mb-4" />
                            <div className="d-flex flex-column-reverse">
                                {inProgressTasks.map(item => {
                                    return (
                                        <TaskCard key={item.id} task={item} />
                                    );
                                })}
                            </div>
                        </React.Fragment>
                    )} */}

                    {tasksNotInNegotiation.length > 0 && (
                        <React.Fragment>
                            <h2 className="mt-4 h3">
                                Tareas sin negociaciones:
                            </h2>
                            <hr className="mb-4" />
                            <div className="d-flex flex-column-reverse">
                                {tasksNotInNegotiation.map(item => {
                                    return (
                                        <TaskCard key={item.id} task={item} />
                                    );
                                })}
                            </div>
                        </React.Fragment>
                    )}

                    {tasksInNegotiation.length > 0 && (
                        <React.Fragment>
                            <h2 className="mt-4 h3">Tareas en negociación:</h2>
                            <hr className="mb-4" />
                            <div className="d-flex flex-column-reverse">
                                {tasksInNegotiation.map(item => {
                                    return (
                                        <TaskCard key={item.id} task={item} />
                                    );
                                })}
                            </div>
                        </React.Fragment>
                    )}

                    {expiredTasks.length > 0 && (
                        <React.Fragment>
                            <h2 className="mt-4 h3">Tareas Vencidas:</h2>
                            <hr className="mb-4" />
                            <div className="d-flex flex-column-reverse">
                                {expiredTasks.map(item => {
                                    return (
                                        <TaskCard key={item.id} task={item} />
                                    );
                                })}
                            </div>
                        </React.Fragment>
                    )}

                    {completedTasks.length > 0 && (
                        <React.Fragment>
                            <h2 className="mt-4 h3">Tareas Completadas:</h2>
                            <hr className="mb-4" />
                            <div className="d-flex flex-column-reverse">
                                {completedTasks.map(item => {
                                    return (
                                        <TaskCard key={item.id} task={item} />
                                    );
                                })}
                            </div>
                        </React.Fragment>
                    )}

                    {/* <div className="d-flex flex-column-reverse">
                        {filtered.map(task => {
                            return <TaskCard key={task.id} task={task} />;
                        })}
                    </div> */}
                </React.Fragment>
            ) : (
                <EmptyList />
            )}
        </React.Fragment>
    );
};

export default TaskList;
