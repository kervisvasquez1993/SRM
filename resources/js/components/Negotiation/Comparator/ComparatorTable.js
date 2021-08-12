import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdAddCircle } from "react-icons/md";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import { confirmDelete } from "../../../appText";
import { deleteComparision } from "../../../store/actions/comparatorActions";
import { extractStringAfter, extractStringBetween } from "../../../utils";
import ComparatorRow from "./ComparatorRow";
import { openModal } from "../../../store/actions/modalActions";
import AddComparisionModal from "./AddComparisionModal";

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const extractIndices = id => {
    return [
        Number(extractStringBetween(id, "row-", "-col")),
        Number(extractStringAfter(id, "col-"))
    ];
};

export default ({ negotiations, comparision }) => {
    const dispatch = useDispatch();

    const columnCount = negotiations.length;

    // const fakeColumns = Array.from(Array(columnCount), () => []);
    // fakeColumns[0] = [
    //     {
    //         id: "1",
    //         content: "item",
    //         type: "1"
    //     },
    //     {
    //         id: "2",
    //         content: "item",
    //         type: "1"
    //     },
    //     {
    //         id: "3",
    //         content: "item",
    //         type: "1"
    //     }
    // ];

    // fakeColumns[1] = [
    //     {
    //         id: `4`,
    //         content: `item`,
    //         type: "2"
    //     },
    //     {
    //         id: `5`,
    //         content: `item`,
    //         type: "2"
    //     }
    // ];

    // fakeColumns[2] = [
    //     {
    //         id: `6`,
    //         content: `item 3`,
    //         type: "3"
    //     }
    // ];

    // fakeColumns[3] = [
    //     {
    //         id: `7`,
    //         content: `item 4`,
    //         type: "4"
    //     }
    // ];

    // const [state, setState] = useState([
    //     {
    //         id: "row-1",
    //         type: "row-container",
    //         columns: [...fakeColumns]
    //     }
    // ]);

    const [state, setState] = useState(() => {
        const columns = comparision.productIds.map((list, columnIndex) => {
            return [
                ...list.map(productId => {
                    return {
                        id: `${productId}`,
                        content: `${productId}`,
                        type: `${columnIndex}`
                    };
                })
            ];
        });

        return [
            {
                id: v4(),
                type: "row-container",
                columns: columns
            }
        ];
    });

    const onDragEnd = result => {
        const { source, destination, type } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        const sourceDropableId = source.droppableId;
        const destinationDropableId = destination.droppableId;

        if (type === "rowsParent") {
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
            const [removed] = newState[sourceRow].columns[sourceColumn].splice(
                source.index,
                1
            );

            // Add the item to the destination column
            newState[destinationRow].columns[destinationColumn].splice(
                destination.index,
                0,
                removed
            );

            setState(newState);
        }
    };

    const deleteRow = rowIndex => {
        const newState = [...state];
        newState.splice(rowIndex, 1);
        setState(newState);
    };

    const handleDelete = () => {
        if (confirm(confirmDelete)) {
            dispatch(deleteComparision(comparision.productName));
        }
    };

    const handleEdit = () => {
        dispatch(
            openModal({
                title: "Editar Comparación",
                body: (
                    <AddComparisionModal
                        formData={comparision}
                        isEditor={true}
                    />
                )
            })
        );
    };

    return (
        <div className="rows-parent">
            <h2 className="sticky-left">
                {comparision.productName}{" "}
                <button className="btn btn-info mb-4" onClick={handleEdit}>
                    <BiEditAlt className="mr-2 icon-normal" />
                    Editar
                </button>
                <button className="btn btn-danger mb-4" onClick={handleDelete}>
                    <RiDeleteBin2Fill className="mr-2 icon-normal" />
                    Eliminar
                </button>
            </h2>

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
                            {...provided.droppableProps}
                            className={`comparision-dropable ignore-swipe ${snapshot.isDraggingOver &&
                                "drag-over"}`}
                        >
                            <div className="comparision-header-parent">
                                <div className="drag-button-width"></div>
                                <table className="comparision-table-header">
                                    <thead>
                                        <tr>
                                            {negotiations.map((item, index) => (
                                                <th
                                                    colSpan={5}
                                                    key={index}
                                                    className="provider-column"
                                                >
                                                    {item.proveedor.nombre}
                                                </th>
                                            ))}
                                        </tr>

                                        <tr>
                                            {negotiations.map((item, index) => (
                                                <React.Fragment key={index}>
                                                    <th className="product-attribute-column">
                                                        SUPPLIER NAME
                                                    </th>
                                                    <th className="product-attribute-column">
                                                        DESCRIPTION
                                                    </th>
                                                    <th className="product-attribute-column">
                                                        TOTAL PCS
                                                    </th>
                                                    <th className="product-attribute-column">
                                                        Unit Price
                                                    </th>
                                                    <th className="product-attribute-column">
                                                        Total USD
                                                    </th>
                                                </React.Fragment>
                                            ))}
                                        </tr>
                                    </thead>
                                </table>
                            </div>

                            {state.map((row, rowIndex) => {
                                return (
                                    <ComparatorRow
                                        {...{ row, rowIndex }}
                                        key={row.id}
                                        deleteRow={deleteRow}
                                    />
                                );
                            })}
                            {provided.placeholder}
                            <div className="add-row">
                                <span className="sticky-left">
                                    <button
                                        className="btn btn-success mb-4"
                                        onClick={() => {
                                            setState([
                                                ...state,
                                                {
                                                    id: `row-${v4()}`,
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
                                </span>
                            </div>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
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
