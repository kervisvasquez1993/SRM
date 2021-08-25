import axios from "axios";
import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { BsFillPersonFill } from "react-icons/bs";
import { useUser } from "../../utils";
import { apiURL } from "../App";
import EmptyList from "../Navigation/EmptyList";
import DraggableTaskCard from "./DraggableTaskCard";

const reorder = (list, startIndex, endestinationDroppableIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endestinationDroppableIndex, 0, removed);

    return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

export default ({ tasks, user, index }) => {
    const loggedUser = useUser();
    const [state, setState] = useState([]);
    const [disabledDroppables, setDisabledDroppables] = useState([]);
    const [invalidDrop, setInvalidDrop] = useState(false);

    useEffect(() => {
        const items = [...tasks];

        // Si el usuario es un comprador solo se le mostraran las tareas de él
        const newState = [[], [], [], [], []];
        newState.forEach((column, columnIndex) => {
            const tasks = items.filter(item => item.column === columnIndex);
            const sortedTasks = _.sortBy(tasks, "row");

            sortedTasks.forEach(item =>
                newState[columnIndex].push({
                    id: item.id,
                    content: item.id,
                    data: item
                })
            );
        });

        setState(newState);
    }, []);

    const findTask = useCallback(
        source => state[+source.droppableId][source.index].data,
        [state]
    );

    const onDragEnd = useCallback(
        result => {
            const { source, destination } = result;

            // setDisabledDroppable(false);
            setDisabledDroppables([]);
            setInvalidDrop(false);

            // Se solto afuera de una columna
            if (!destination) {
                return;
            }

            // Obtener los IDs de la columna fuente y la columna destino
            const sourceDroppableInd = +source.droppableId;
            const destinationDroppableInd = +destination.droppableId;

            // Informar al servidor del movimiento que se hizo
            const movedTask = state[sourceDroppableInd][source.index].data;
            const column = +destination.droppableId;
            const row = +destination.index;
            movedTask.column = column;
            movedTask.row = row;
            axios.put(`${apiURL}/draggable_task/${movedTask.id}`, {
                column,
                row
            });

            // Si se suelta en la misma columna
            if (sourceDroppableInd === destinationDroppableInd) {
                const items = reorder(
                    state[sourceDroppableInd],
                    source.index,
                    destination.index
                );

                const newState = [...state];
                newState[sourceDroppableInd] = items;
                setState(newState);
            } else {
                // Si se suelta en otra columna
                const result = move(
                    state[sourceDroppableInd],
                    state[destinationDroppableInd],
                    source,
                    destination
                );

                // Crear el nuevo estado
                const newState = [...state];
                newState[sourceDroppableInd] = result[sourceDroppableInd];
                newState[destinationDroppableInd] =
                    result[destinationDroppableInd];
                setState(newState);
            }
        },
        [state]
    );

    const onDragStart = useCallback(
        result => {
            const { source } = result;

            // La lista de columnas a bloquear
            const toDisable = [];

            // La tarea asociada al card que se va a arrastrar
            const data = findTask(source);
            const tieneProductos = data.tiene_productos;
            const negociacion_seleccionada = data.negociacion_seleccionada;
            const arte =
                negociacion_seleccionada && negociacion_seleccionada.arte;

            const produccion_transito =
                negociacion_seleccionada &&
                negociacion_seleccionada.produccion_transito;

            const recepcion_reclamo_devolucion =
                produccion_transito &&
                produccion_transito.recepcion_reclamo_devolucion;

            //      Se debe bloquear determinadas columnas dependiendo de la tarea que se está arrastrando

            // Bloquear la columna 2 cuando la tarea no tiene negociaciones
            if (!tieneProductos) {
                toDisable.push(1, 2, 3, 4);
            }

            // Bloquear la columna 3 cuando la tarea no ha iniciado arte
            if (!arte) {
                toDisable.push(2);
            }

            // Bloquear la columna 3 cuando la tarea no ha iniciado produccion
            if (!produccion_transito) {
                toDisable.push(3);
            }

            // Bloquear etapa 5 si no se ha iniciado reclamos y devoluciones
            if (!recepcion_reclamo_devolucion) {
                toDisable.push(4);
            }

            setDisabledDroppables(toDisable);
        },
        [findTask]
    );

    const onDragUpdate = useCallback(result => {
        const { destination } = result;

        setInvalidDrop(!destination);
    }, []);

    const getTitle = index => {
        switch (index) {
            case 1:
                return "Selección de proveedor";
            case 2:
                return "Elaboración de Artes";
            case 3:
                return "Producción y Tránsito";
            case 4:
                return "Recepción, Reclamos y Devoluciones";

            default:
                return "Búsqueda de proveedores";
        }
    };

    return (
        <div>

            <h2 className="user-title">
                <BsFillPersonFill /> Tareas de {user.name}
            </h2>

            <div
                style={{ display: "flex" }}
                className="draggable-task-container ignore-swipe mb-2"
            >
                <DragDropContext
                    onDragEnd={onDragEnd}
                    onDragUpdate={onDragUpdate}
                    onDragStart={onDragStart}
                >
                    {state.map((el, ind) => (
                        <div className="droppable-column-parent" key={ind}>
                            <div className="title-container">
                                <h2 className="stage-index h4">
                                    Etapa {ind + 1}
                                </h2>
                                <h2 className="stage-name h4">
                                    {getTitle(ind)}
                                </h2>
                            </div>

                            <hr />

                            <Droppable
                                key={ind}
                                droppableId={`${ind}`}
                                isDropDisabled={disabledDroppables.includes(
                                    ind
                                )}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className={`droppable-column ${snapshot.isDraggingOver &&
                                            "drag-over"}`}
                                    >
                                        {el.length === 0 && (
                                            <EmptyList
                                                message="Sin tareas"
                                                className="no-result d-flex justify-content-center align-items-center my-5 mx-3"
                                            />
                                        )}
                                        {el.map((item, index) => {
                                            const isMine =
                                                item.data.tarea.usuario.id ===
                                                loggedUser.id;

                                            return (
                                                <Draggable
                                                    key={item.id}
                                                    draggableId={`${item.id}`}
                                                    index={index}
                                                    isDragDisabled={!isMine}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={
                                                                provided
                                                                    .draggableProps
                                                                    .style
                                                            }
                                                            className={`draggable-card ${(snapshot.isDragging ||
                                                                snapshot.draggingOver) &&
                                                                "dragging"}`}
                                                        >
                                                            <DraggableTaskCard
                                                                draggableTask={
                                                                    item
                                                                }
                                                                column={ind}
                                                                invalidDrop={
                                                                    invalidDrop
                                                                }
                                                                snapshot={
                                                                    snapshot
                                                                }
                                                            />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            );
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))}
                </DragDropContext>
            </div>
        </div>
    );
};
