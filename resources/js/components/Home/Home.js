import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { apiURL } from "../App";
import axios from "axios";
import _ from "lodash";

const reorder = (list, startIndex, endestinationDroppableIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endestinationDroppableIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
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

function Home() {
    // const [state, setState] = useState([
    //     [
    //         {
    //             id: 0,
    //             content: `item 1`
    //         },
    //         {
    //             id: 1,
    //             content: `item 2`
    //         }
    //     ],
    //     [
    //         {
    //             id: 2,
    //             content: `item 3`
    //         },
    //         {
    //             id: 3,
    //             content: `item 4`
    //         }
    //     ],
    //     [
    //         {
    //             id: 4,
    //             content: `item 5`
    //         },
    //         {
    //             id: 5,
    //             content: `item 6`
    //         }
    //     ],
    //     [
    //         {
    //             id: 6,
    //             content: `item 7`
    //         },
    //         {
    //             id: 7,
    //             content: `item 8`
    //         }
    //     ],
    //     [
    //         {
    //             id: 8,
    //             content: `item 9`
    //         },
    //         {
    //             id: 9,
    //             content: `item 10`
    //         }
    //     ]
    // ]);
    const [state, setState] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`${apiURL}/draggable_task`);

            const items = response.data;

            const newState = [[], [], [], []];
            newState.forEach((column, columnIndex) => {
                const tasks = items.filter(item => item.column === columnIndex);
                const sortedTasks = _.sortBy(tasks, "row");

                sortedTasks.forEach(item =>
                    newState[columnIndex].push({
                        id: item.id,
                        content: item.id,
                        task: item
                    })
                );
            });

            setState(newState);
        }

        fetchData();
    }, []);

    function onDragEnd(result) {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        // Obtener los IDs de la columna fuente y la columna destino
        const sourceDroppableInd = +source.droppableId;
        const destinationDroppableInd = +destination.droppableId;

        // Informar al servidor del movimiento que se hizo
        const movedTask = state[sourceDroppableInd][source.index].task;
        const column = +destination.droppableId;
        const row = +destination.index;
        axios.put(`${apiURL}/draggable_task/${movedTask.id}`, { column, row });

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
            newState[destinationDroppableInd] = result[destinationDroppableInd];
            setState(newState);
        }
    }

    return (
        <React.Fragment>
            <h1 className="text-center my-5">Tareas</h1>

            <div style={{ display: "flex" }}>
                <DragDropContext onDragEnd={onDragEnd}>
                    {state.map((el, ind) => (
                        <div className="droppable-column-parent" key={ind}>
                            <h2 className="text-center">Etapa {ind + 1}</h2>
                            <Droppable key={ind} droppableId={`${ind}`}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className={`ignore-swipe droppable-column ${snapshot.isDraggingOver &&
                                            "drag-over"}`}
                                    >
                                        {el.map((item, index) => (
                                            <Draggable
                                                key={item.id}
                                                draggableId={`${item.id}`}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={
                                                            provided
                                                                .draggableProps
                                                                .style
                                                        }
                                                        className={`ignore-swipe card draggable-card ${(snapshot.isDragging ||
                                                            snapshot.draggingOver) &&
                                                            "dragging"}`}
                                                    >
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent:
                                                                    "space-around"
                                                            }}
                                                            className="ignore-swipe"
                                                        >
                                                            {item.content}
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))}
                </DragDropContext>
            </div>
        </React.Fragment>
    );
}

export default Home;
