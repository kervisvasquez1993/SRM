import React from "react";
import FooterMessage from "../../Widgets/Modal/FooterMessage";
import TabButton from "../../Widgets/TabButton";
import TabContent from "../../Widgets/TabContent";
import Tabs from "../../Widgets/Tabs";
import ArtStageTab from "./ArtStageTab";
import ClaimStageTab from "./ClaimStageTab";
import FirstStageFooter from "./FirstStageFooter";
import FirstStageTab from "./FirstStageTab";
import NegotiationStageTab from "./NegotiationStageTab";
import ProductionStageTab from "./ProductionStageTab";

const DraggableTaskModal = ({ draggableTask, defaultTab }) => {
    const task = draggableTask.task;

    return (
        <React.Fragment>
            <div className="modal-body py-5">
                <Tabs defaultTab={defaultTab}>
                    <ul
                        className="nav nav-pills d-flex flex-column flex-lg-row justify-content-center mb-4"
                        role="tablist"
                    >
                        <TabButton name={0}>
                            <i className="material-icons">task</i>
                            Etapa 1 - Busqueda de Proveedor
                        </TabButton>

                        {task.column > 0 && (
                            <TabButton name={1}>
                                <i className="material-icons">business</i>
                                Etapa 2 - Selección de Proveedor
                            </TabButton>
                        )}

                        {task.column > 1 && (
                            <TabButton name={2}>
                                <i className="material-icons">inventory_2</i>
                                Etapa 3 - Elaboración de Artes
                            </TabButton>
                        )}

                        {task.column > 2 && (
                            <TabButton name={3}>
                                <i className="material-icons">receipt_long</i>
                                Etapa 4 - Producción y Transito
                            </TabButton>
                        )}

                        {task.column > 3 && (
                            <TabButton name={4}>
                                <i className="material-icons">receipt_long</i>
                                Etapa 5 - Reclamos y Devoluciones
                            </TabButton>
                        )}
                    </ul>

                    <TabContent name={0}>
                        <FirstStageTab task={task} />
                    </TabContent>

                    {task.column > 0 && (
                        <TabContent name={1}>
                            <NegotiationStageTab taskId={task.tarea_id} />
                        </TabContent>
                    )}

                    {task.column > 1 && (
                        <TabContent name={2}>
                            <ArtStageTab art={task.arte_iniciada} />
                        </TabContent>
                    )}

                    {task.column > 2 && (
                        <TabContent name={3}>
                            <ProductionStageTab
                                productionId={task.produccion_iniciada.id}
                            />
                        </TabContent>
                    )}

                    {task.column > 3 && (
                        <TabContent name={4}>
                            <ClaimStageTab
                                claim={
                                    task.produccion_iniciada
                                        .recepcion_reclamo_devolucion
                                }
                            />
                        </TabContent>
                    )}
                </Tabs>
            </div>

            <FirstStageFooter task={task} />
        </React.Fragment>
    );
};

export default DraggableTaskModal;
