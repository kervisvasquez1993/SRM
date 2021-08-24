import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { apiURL } from "../App";
import axios from "axios";
import LoadingScreen from "../Navigation/LoadingScreen";
import UserDraggableTasks from "./UserDraggableTasks";

function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`${apiURL}/draggable_task`);

            let items = response.data.data;

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

            {groups.map(group => (
                <UserDraggableTasks tasks={group.tasks} key={group.user.id} />
            ))}
        </React.Fragment>
    );
}

export default Home;
