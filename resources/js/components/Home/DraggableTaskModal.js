import React from "react";
import { useDispatch } from "react-redux";
import TaskTab from "../Tasks/TaskTab";
import TabButton from "../Widgets/TabButton";
import TabContent from "../Widgets/TabContent";
import Tabs from "../Widgets/Tabs";

const DraggableTaskModal = ({ draggableTask, defaultTab }) => {
    const dispatch = useDispatch();

    const task = draggableTask.task;

    return (
        <div className="modal-body">
            <Tabs defaultTab={defaultTab}>
                <ul
                    className="nav nav-pills d-flex flex-column flex-lg-row justify-content-center mb-4"
                    role="tablist"
                >
                    <TabButton name={0}>
                        <i className="material-icons">task</i>
                        Etapa 1 - Negociación
                    </TabButton>

                    <TabButton name={1}>
                        <i className="material-icons">business</i>
                        Etapa 2 - Negociación
                    </TabButton>

                    <TabButton name={2}>
                        <i className="material-icons">inventory_2</i>
                        Etapa 3 - Artes
                    </TabButton>

                    <TabButton name={3}>
                        <i className="material-icons">receipt_long</i>
                        Etapa 4 - Producción
                    </TabButton>

                    <TabButton name={4}>
                        <i className="material-icons">receipt_long</i>
                        Etapa 5 - Reclamos y Devoluciones
                    </TabButton>
                </ul>

                <div className="tab-content tab-space p-2">
                    <TabContent name={0}>
                        <TaskTab task={task} user={task.usuario} />
                    </TabContent>
                </div>
            </Tabs>
        </div>
    );
};

export default DraggableTaskModal;
