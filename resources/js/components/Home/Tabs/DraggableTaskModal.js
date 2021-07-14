import React from "react";
import TaskTab from "../../Tasks/TaskTab";
import TabButton from "../../Widgets/TabButton";
import TabContent from "../../Widgets/TabContent";
import Tabs from "../../Widgets/Tabs";
import ArtStageTab from "./ArtStageTab";
import ClaimStageTab from "./ClaimStageTab";
import NegotiationStageTab from "./NegotiationStageTab";
import ProductionStageTab from "./ProductionStageTab";

const DraggableTaskModal = ({ draggableTask, defaultTab }) => {
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

                    {task.column > 0 && (
                        <TabButton name={1}>
                            <i className="material-icons">business</i>
                            Etapa 2 - Negociación
                        </TabButton>
                    )}

                    {task.column > 1 && (
                        <TabButton name={2}>
                            <i className="material-icons">inventory_2</i>
                            Etapa 3 - Artes
                        </TabButton>
                    )}

                    {task.column > 2 && (
                        <TabButton name={3}>
                            <i className="material-icons">receipt_long</i>
                            Etapa 4 - Producción
                        </TabButton>
                    )}

                    {task.column > 3 && (
                        <TabButton name={4}>
                            <i className="material-icons">receipt_long</i>
                            Etapa 5 - Reclamos y Devoluciones
                        </TabButton>
                    )}
                </ul>

                <div className="tab-content tab-space p-2">
                    <TabContent name={0}>
                        <TaskTab
                            task={{ ...task, id: task.tarea_id }}
                            user={task.usuario}
                        />
                    </TabContent>

                    <TabContent name={1}>
                        <NegotiationStageTab taskId={task.tarea_id} />
                    </TabContent>

                    <TabContent name={2}>
                        <ArtStageTab art={task.arte_iniciada} />
                    </TabContent>

                    <TabContent name={3}>
                        <ProductionStageTab
                            production={task.produccion_iniciada}
                        />
                    </TabContent>

                    <TabContent name={4}>
                        <ClaimStageTab
                            claim={task.produccion_iniciada.recepcion_reclamo_devolucion}
                        />
                    </TabContent>
                </div>
            </Tabs>
        </div>
    );
};

export default DraggableTaskModal;
