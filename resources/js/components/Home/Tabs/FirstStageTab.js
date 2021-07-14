import React from "react";
import TaskTab from "../../Tasks/TaskTab";
import ProviderList from "./ProviderList";

const FirstStageTab = ({ task }) => {
    return (
        <React.Fragment>
            <TaskTab
                task={{ ...task, id: task.tarea_id }}
                user={task.usuario}
            />

            {task.column === 0 && (
                <React.Fragment>
                    <hr className="my-5" />
                    <h3 className="text-center">Empresas Asociadas</h3>
                    <ProviderList taskId={task.tarea_id} />
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default FirstStageTab;
