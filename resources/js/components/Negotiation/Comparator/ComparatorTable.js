import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaGripVertical } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import {
    extractStringAfter,
    extractStringBetween,
    extractToken
} from "../../../utils";

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

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
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250
});

const extractIndices = id => {
    return [
        Number(extractStringBetween(id, "row-", "-col")),
        Number(extractStringAfter(id, "col-"))
    ];
};

export default () => {
    const columnCount = 4;

    const fakeColumns = Array.from(Array(columnCount), () => []);
    fakeColumns[0] = [
        {
            id: "1",
            content: "item",
            type: "1"
        },
        {
            id: "2",
            content: "item",
            type: "1"
        },
        {
            id: "3",
            content: "item",
            type: "1"
        }
    ];

    fakeColumns[1] = [
        {
            id: `4`,
            content: `item`,
            type: "2"
        },
        {
            id: `5`,
            content: `item`,
            type: "2"
        }
    ];

    fakeColumns[2] = [
        {
            id: `6`,
            content: `item 3`,
            type: "3"
        }
    ];

    fakeColumns[3] = [
        {
            id: `7`,
            content: `item 4`,
            type: "4"
        }
    ];

    const [state, setState] = useState([
        {
            id: "row-1",
            type: "row-container",
            columns: [...fakeColumns]
        }
    ]);

    function onDragEnd(result) {
        const { source, destination, type } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        const sourceDropableId = source.droppableId;
        const destinationDropableId = destination.droppableId;

        if (type === "rowsParent") {
            console.log(result);
            console.log(sourceDropableId, destinationDropableId);

            if (sourceDropableId === destinationDropableId) {
                const items = reorder(state, source.index, destination.index);

                setState(items);
            }
        } else {
            const [sourceRow, sourceColumn] = extractIndices(sourceDropableId);
            const [destinationRow, destinationColumn] = extractIndices(
                destinationDropableId
            );

            const newState = [...state];

            // Remove the item from the source
            const [removed] = newState[sourceRow].columns[sourceColumn].splice(source.index, 1);

            // Add the item to the destination column
            newState[destinationRow].columns[destinationColumn].splice(destination.index, 0, removed);

            setState(newState);
        }
    }

    return (
        <div>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable
                        droppableId={"rowsParent"}
                        type={"rowsParent"}
                        direction={"vertical"}
                    >
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                // @ts-ignore
                                style={{ flexGrow: "1" }}
                                {...provided.droppableProps}
                            >
                                {state.map((row, rowIndex) => {
                                    return (
                                        <Draggable
                                            key={row.id}
                                            draggableId={row.id}
                                            index={rowIndex}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    style={{
                                                        ...getItemStyle(
                                                            snapshot.isDragging,
                                                            provided
                                                                .draggableProps
                                                                .style
                                                        ),
                                                        display: "flex"
                                                    }}
                                                >
                                                    <span
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <FaGripVertical></FaGripVertical>
                                                    </span>

                                                    {row.id}

                                                    {row.columns.map(
                                                        (column, colIndex) => {
                                                            const id = `row-${rowIndex}-col-${colIndex}`;

                                                            return (
                                                                <Droppable
                                                                    key={id}
                                                                    droppableId={
                                                                        id
                                                                    }
                                                                    direction={
                                                                        "vertical"
                                                                    }
                                                                    type={colIndex.toString()}
                                                                >
                                                                    {(
                                                                        provided,
                                                                        snapshot
                                                                    ) => (
                                                                        <div
                                                                            ref={
                                                                                provided.innerRef
                                                                            }
                                                                            style={getListStyle(
                                                                                snapshot.isDraggingOver
                                                                            )}
                                                                            {...provided.droppableProps}
                                                                        >
                                                                            {id}
                                                                            {column.map(
                                                                                (
                                                                                    product,
                                                                                    productIndex
                                                                                ) => (
                                                                                    <Draggable
                                                                                        key={
                                                                                            product.id
                                                                                        }
                                                                                        draggableId={
                                                                                            product.id
                                                                                        }
                                                                                        index={
                                                                                            productIndex
                                                                                        }
                                                                                    >
                                                                                        {(
                                                                                            provided,
                                                                                            snapshot
                                                                                        ) => (
                                                                                            <div
                                                                                                ref={
                                                                                                    provided.innerRef
                                                                                                }
                                                                                                {...provided.draggableProps}
                                                                                                {...provided.dragHandleProps}
                                                                                                style={getItemStyle(
                                                                                                    snapshot.isDragging,
                                                                                                    provided
                                                                                                        .draggableProps
                                                                                                        .style
                                                                                                )}
                                                                                            >
                                                                                                <div>
                                                                                                    {
                                                                                                        product.content
                                                                                                    }
                                                                                                </div>
                                                                                            </div>
                                                                                        )}
                                                                                    </Draggable>
                                                                                )
                                                                            )}
                                                                            {
                                                                                provided.placeholder
                                                                            }
                                                                        </div>
                                                                    )}
                                                                </Droppable>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                <button
                    className="btn btn-success mb-4"
                    onClick={() => {
                        setState([
                            ...state,
                            {
                                id: `row-${state.length + 1}`,
                                type: "row-container",
                                columns: Array.from(
                                    Array(columnCount),
                                    () => []
                                )
                            }
                        ]);
                    }}
                >
                    <MdAddCircle className="mr-2" />
                    Agregar Fila
                </button>
            </div>
        </div>
    );
};

// import React, { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// const reorder = (list, startIndex, endIndex) => {
//     const result = Array.from(list);
//     const [removed] = result.splice(startIndex, 1);
//     result.splice(endIndex, 0, removed);

//     return result;
// };

// /**
//  * Moves an item from one list to another list.
//  */
// const move = (source, destination, droppableSource, droppableDestination) => {
//     const sourceClone = Array.from(source);
//     const destClone = Array.from(destination);
//     const [removed] = sourceClone.splice(droppableSource.index, 1);

//     destClone.splice(droppableDestination.index, 0, removed);

//     const result = {};
//     result[droppableSource.droppableId] = sourceClone;
//     result[droppableDestination.droppableId] = destClone;

//     return result;
// };
// const grid = 8;

// const getItemStyle = (isDragging, draggableStyle) => ({
//     // some basic styles to make the items look a bit nicer
//     userSelect: "none",
//     padding: grid * 2,
//     margin: `0 0 ${grid}px 0`,

//     // change background colour if dragging
//     background: isDragging ? "lightgreen" : "grey",

//     // styles we need to apply on draggables
//     ...draggableStyle
// });
// const getListStyle = isDraggingOver => ({
//     background: isDraggingOver ? "lightblue" : "lightgrey",
//     padding: grid,
//     width: 250
// });

// export default () => {
//     const [state, setState] = useState([
//         [
//             {
//                 id: "1",
//                 content: "item",
//                 type: "1"
//             },
//             {
//                 id: "2",
//                 content: "item",
//                 type: "1"
//             },
//             {
//                 id: "3",
//                 content: "item",
//                 type: "1"
//             }
//         ],
//         [
//             {
//                 id: `4`,
//                 content: `item`,
//                 type: "2"
//             },
//             {
//                 id: `5`,
//                 content: `item`,
//                 type: "2"
//             }
//         ],
//         [
//             {
//                 id: `6`,
//                 content: `item 3`,
//                 type: "3"
//             }
//         ],
//         [
//             {
//                 id: `7`,
//                 content: `item 4`,
//                 type: "4"
//             }
//         ]
//     ]);

//     function onDragEnd(result) {
//         const { source, destination } = result;

//         // dropped outside the list
//         if (!destination) {
//             return;
//         }

//         const sourceDropableId = +source.droppableId;
//         const destinationDropableId = +destination.droppableId;

//         if (sourceDropableId === destinationDropableId) {
//             const items = reorder(
//                 state[sourceDropableId],
//                 source.index,
//                 destination.index
//             );

//             const newState = [...state];
//             newState[sourceDropableId] = items;
//             setState(newState);
//         }

//         // if (sourceDropableId === destinationDropableId) {
//         //     const items = reorder(state[sourceDropableId], source.index, destination.index);
//         //     const newState = [...state];
//         //     newState[sourceDropableId] = items;
//         //     setState(newState);
//         // } else {
//         //     const result = move(state[sourceDropableId], state[destinationDropableId], source, destination);
//         //     const newState = [...state];
//         //     newState[sourceDropableId] = result[sourceDropableId];
//         //     newState[destinationDropableId] = result[destinationDropableId];

//         //     setState(newState);
//         // }
//     }

//     return (
//         <div>
//             <div style={{ display: "flex" }}>
//                 <DragDropContext onDragEnd={onDragEnd}>
//                     {state.map((column, colIndex) => {
//                         return (
//                             <Droppable
//                                 key={colIndex}
//                                 droppableId={`${colIndex}`}
//                                 type={colIndex.toString()}
//                             >
//                                 {(provided, snapshot) => (
//                                     <div
//                                         ref={provided.innerRef}
//                                         style={getListStyle(
//                                             snapshot.isDraggingOver
//                                         )}
//                                         {...provided.droppableProps}
//                                     >
//                                         {column.map((item, index) => (
//                                             <Draggable
//                                                 key={item.id}
//                                                 draggableId={item.id}
//                                                 index={index}
//                                             >
//                                                 {(provided, snapshot) => (
//                                                     <div
//                                                         ref={provided.innerRef}
//                                                         {...provided.draggableProps}
//                                                         {...provided.dragHandleProps}
//                                                         style={getItemStyle(
//                                                             snapshot.isDragging,
//                                                             provided
//                                                                 .draggableProps
//                                                                 .style
//                                                         )}
//                                                     >
//                                                         <div>
//                                                             {item.content}
//                                                         </div>
//                                                     </div>
//                                                 )}
//                                             </Draggable>
//                                         ))}
//                                         {provided.placeholder}
//                                     </div>
//                                 )}
//                             </Droppable>
//                         );
//                     })}
//                 </DragDropContext>
//             </div>
//         </div>
//     );
// };
