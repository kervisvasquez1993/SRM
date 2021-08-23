import React, { useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdAddCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { confirmDelete } from "../../appText";
import {
    deleteComparision,
    updateComparisionRows
} from "../../store/actions/comparatorActions";
import { extractStringAfter, extractStringBetween } from "../../utils";
import ComparatorRow from "./ComparatorRow";
import { openModal } from "../../store/actions/modalActions";
import AddComparisionModal from "./ComparisonFormModal";

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

export default ({ negotiations, comparision, comparisonIndex }) => {
    const dispatch = useDispatch();

    // const [state, setState] = useState([]);
    const state = comparision.rows;

    useEffect(() => {
        const newState = [...state];

        // Create a new row if it doesn't exist
        if (state.length === 0) {
            newState.push({
                id: v4(),
                columns: comparision.productIds.map(idList =>
                    idList.map(id => {
                        return { id };
                    })
                )
            });
        }

        if (state.length > 0) {
            const newProducts = comparision.productIds.flat();

            // Delete products that doesn't exit anymore in the new list
            for (const row of state) {
                for (const column of row.columns) {
                    for (const product of [...column]) {
                        if (!newProducts.includes(product.id)) {
                            column.splice(column.indexOf(product.id), 1);
                        }
                    }
                }
            }

            // // Add new products that weren't there
            for (const [
                colIndex,
                colProducts
            ] of comparision.productIds.entries()) {
                for (const newProductId of colProducts) {
                    let toAdd = true;

                    for (const row of state) {
                        for (const column of row.columns) {
                            for (const product of column) {
                                if (product.id === newProductId) {
                                    toAdd = false;
                                    break;
                                }
                            }
                        }
                    }

                    if (toAdd) {
                        state[state.length - 1].columns[colIndex].push({
                            id: newProductId
                        });
                    }
                }
            }
        }

        console.log(newState);

        dispatch(updateComparisionRows(comparision.id, newState));
    }, [comparision.productIds]);

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
                const newState = reorder(
                    state,
                    source.index,
                    destination.index
                );

                // setState(items);
                dispatch(updateComparisionRows(comparision.id, newState));
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

            // setState(newState);
            dispatch(updateComparisionRows(comparision.id, newState));
        }
    };

    const deleteRow = rowIndex => {
        const newState = [...state];
        newState.splice(rowIndex, 1);

        dispatch(updateComparisionRows(comparision.id, newState));
    };

    const addEmptyRow = () => {
        const newState = [
            ...state,
            {
                id: v4(),
                columns: Array.from(Array(negotiations.length), () => [])
            }
        ];

        dispatch(updateComparisionRows(comparision.id, newState));
    };

    const handleDelete = () => {
        if (confirm(confirmDelete)) {
            dispatch(deleteComparision(comparision.id));
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
                                                    colSpan={7}
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
                                                    <th className="product-name">
                                                        SUPPLIER CODE
                                                    </th>
                                                    <th className="product-name">
                                                        SUPPLIER NAME
                                                    </th>
                                                    <th className="product-attribute-column product-description-header">
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
                                                    <th className="product-name">
                                                        Imagen
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
                                        {...{ row, rowIndex, comparisonIndex }}
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
                                        onClick={addEmptyRow}
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
