import React, { useEffect, useState } from "react";
import { apiURL } from "../App";
import axios from "axios";
import LoadingScreen from "../Navigation/LoadingScreen";
import UserDraggableTasks from "./UserDraggableTasks";
import { useUser } from "../../utils";

function Home() {
    const user = useUser();
    const [isLoading, setIsLoading] = useState(true);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`${apiURL}/draggable_task`);

            let items = response.data.data;

            // Agrupar las tareas por usuario
            const groups = items.reduce((result, task) => {
                let list = result.find(
                    item => item.user.id === task.usuario.id
                );

                if (!list) {
                    list = {
                        user: task.usuario,
                        tasks: []
                    };
                    result.push(list);
                }

                list.tasks.push(task);

                return result;
            }, []);

            // Ordenar las tareas para colocar al usuario de primer lugar
            groups.sort((x, y) => (x.user.id === user.id ? -1 : 1));

            setIsLoading(false);
            setGroups(groups);
        }

        fetchData();
    }, []);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <React.Fragment>
            <h1 className="text-center my-5">Inicio</h1>
            <div className="draggable-task-container">
                {groups.map((group, index) => {
                    return (
                        <UserDraggableTasks
                            tasks={group.tasks}
                            key={group.user.id}
                            index={index}
                            user={group.user}
                        />
                    );
                })}
            </div>
        </React.Fragment>
    );
}

export default Home;
