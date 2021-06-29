import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/actions/modalActions";
import { getTasks } from "../../store/actions/taskActions";
import FilterGroup from "../Filters/FilterGroup";
import TaskCard from "./TaskCard";
import TaskModal, { emptyTask } from "./TaskModal";
import SliderFilter from "../Filters/SliderFilter";
import { getDaysToFinishTask } from "../../utils";
import { Redirect } from "react-router-dom";
import LoadingScreen from "../Navigation/LoadingScreen";
import { Helmet } from "react-helmet-async";
import GenericFilter from "../Filters/GenericFilter";

const cardCreator = item => {
    return <TaskCard key={item.id} task={item} />;
};

const isTaskCompleted = task => {
    return task.completada;
};

const isTaskExpired = task => {
    const timeToFinish = new Date(task.fecha_fin) - new Date();
    return !isTaskCompleted(task) && timeToFinish < 0;
};

const isTaskInNegotiation = task => {
    return (
        !isTaskCompleted(task) && !isTaskExpired(task) && task.tiene_negociacion
    );
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

const TaskList = ({ myTasks = false }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const tasks = useSelector(state => state.task.tasks);
    const isLoadingList = useSelector(state => state.task.isLoadingList);

    const [postFilterLists, setPostFilterLists] = useState([]);

    if (
        (!myTasks &&
            !(user.rol === "coordinador" || user.rol === "observador")) ||
        user.rol === "artes"
    ) {
        return <Redirect to="/home" />;
    }

    useEffect(() => {
        dispatch(getTasks(myTasks));
    }, []);

    const handleCreate = () => {
        dispatch(
            openModal({
                title: "Agregar Tarea",
                body: <TaskModal task={emptyTask} />
            })
        );
    };

    const getMaxDays = useCallback(() => {
        if ("user" in postFilterLists) {
            const dias = postFilterLists["user"].map(task =>
                getDaysToFinishTask(task)
            );

            return Math.max(...dias, 0);
        }

        return 1;
    }, [postFilterLists]);

    const getMinDays = useCallback(() => {
        if ("user" in postFilterLists) {
            const dias = postFilterLists["user"].map(task =>
                isTaskExpired(task) || isTaskCompleted(task)
                    ? Infinity
                    : getDaysToFinishTask(task)
            );

            return Math.max(Math.min(...dias));
        }
        return 0;
    }, [postFilterLists]);

    const minDays = getMinDays();
    const maxDays = getMaxDays();

    const filterConfig = [
        {
            name: "status",
            type: "checkbox",
            label: "Estado",
            values: [
                {
                    id: "notInNegotiation",
                    label: "Sin negociación",
                    filter: (item, filters) =>
                        !(
                            filters["status"]["notInNegotiation"] === false &&
                            isTaskNotInNegotiation(item)
                        ),
                    filterPopulator: item => isTaskNotInNegotiation(item)
                },
                {
                    id: "inNegotiation",
                    label: "En negociación",
                    filter: (item, filters) =>
                        !(
                            filters["status"]["inNegotiation"] === false &&
                            isTaskInNegotiation(item)
                        ),
                    filterPopulator: item => isTaskInNegotiation(item)
                },
                {
                    id: "expired",
                    label: "Vencida",
                    filter: (item, filters) =>
                        !(
                            filters["status"]["expired"] === false &&
                            isTaskExpired(item)
                        ),
                    filterPopulator: item => isTaskExpired(item)
                },
                {
                    id: "completed",
                    label: "Completada",
                    defaultValue: false,
                    filter: (item, filters) =>
                        !(
                            filters["status"]["completed"] === false &&
                            isTaskCompleted(item)
                        ),
                    filterPopulator: item => isTaskCompleted(item)
                }
            ]
        },
        {
            name: "user",
            type: "checkbox",
            label: "Usuario",
            useAccordion: true,
            values: item => item.usuario.name,
            filter: (item, filters) => filters.user[item.usuario.name],
            counterFilter: (item, id) => item.usuario.name === id
        },
        {
            name: "time",
            label: "Tiempo de expiración",
            useAccordion: true,
            type: "slider",
            filter: (item, filterValue) =>
                true,
            sliderLabelText: " días",
            sliderMin: minDays,
            sliderMax: maxDays,
            defaultValue: maxDays,
            sliderReverse: true
        }
    ];

    const populatorConfig = [
        {
            header: "Sin negociación :",
            filterPopulator: item => isTaskNotInNegotiation(item),
            populator: cardCreator
        },
        {
            header: "En negociación :",
            filterPopulator: item => isTaskInNegotiation(item),
            populator: cardCreator
        },
        {
            header: "Tareas Vencidas :",
            filterPopulator: item => isTaskExpired(item),
            populator: cardCreator
        },
        {
            header: "Tareas Completadas :",
            filterPopulator: item => isTaskCompleted(item),
            populator: cardCreator
        }
    ];

    const helmet = (
        <Helmet>
            <title>{`Tareas - ${process.env.MIX_APP_NAME}`}</title>
        </Helmet>
    );

    if (isLoadingList) {
        return <LoadingScreen>{helmet}</LoadingScreen>;
    }

    return (
        <React.Fragment>
            {helmet}

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

            <GenericFilter
                config={filterConfig}
                unfilteredData={tasks}
                populatorConfig={populatorConfig}
                setPostFilterLists={setPostFilterLists}
            ></GenericFilter>
        </React.Fragment>
    );
};

export default TaskList;
