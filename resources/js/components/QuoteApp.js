import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

export default function QuoteApp() {
    const [state, setState] = useState([
        [
            {
                id: 0,
                content: `item 1`
            },
            {
                id: 1,
                content: `item 2`
            }
        ],
        [
            {
                id: 2,
                content: `item 3`
            },
            {
                id: 3,
                content: `item 4`
            }
        ],
        [
            {
                id: 4,
                content: `item 5`
            },
            {
                id: 5,
                content: `item 6`
            }
        ],
        [
            {
                id: 6,
                content: `item 7`
            },
            {
                id: 7,
                content: `item 8`
            }
        ],
        [
            {
                id: 8,
                content: `item 9`
            },
            {
                id: 9,
                content: `item 10`
            }
        ]
    ]);

    function onDragEnd(result) {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        // Obtene los IDs de la columna fuente y la columna destino
        const sourceDroppableInd = +source.droppableId;
        const destinationDroppableInd = +destination.droppableId;

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
                        <Droppable key={ind} droppableId={`${ind}`}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={`ignore-swipe droppable-column ${snapshot.isDraggingOver &&
                                        "drag-over"}`}
                                >
                                    <h2 className="text-center ignore-swipe">
                                        Etapa {ind + 1}
                                    </h2>
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
                                                        provided.draggableProps
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
                    ))}
                </DragDropContext>
            </div>
        </React.Fragment>
    );
}
