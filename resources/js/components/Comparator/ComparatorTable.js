import React, { useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdAddCircle, MdDone, MdTouchApp } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { confirmDelete } from "../../appText";
import {
    createRow,
    deleteComparison,
    moveCell,
    moveRow,
    updateComparisionRows
} from "../../store/actions/comparatorActions";
import { extractStringAfter, extractStringBetween } from "../../utils";
import { openModal } from "../../store/actions/modalActions";
import { selectNegotiation } from "../../store/actions/negotiationActions";
import ComparisonFormModal from "./ComparisonFormModal";
import { useParams } from "react-router-dom";
import ComparatorRow from "./ComparatorRow";
import axios from "axios";
import { apiURL } from "../App";

export const extractComparatorCellIndices = id => {
    return [
        Number(extractStringBetween(id, "row-", "-col")),
        Number(extractStringAfter(id, "col-"))
    ];
};

export default ({ comparison, comparisonIndex }) => {
    const dispatch = useDispatch();

    // @ts-ignore
    const { id: taskId } = useParams();

    const state = comparison.state;
    // @ts-ignore
    const suppliers = useSelector(state => state.comparator.suppliers);
    const selectedNegotiation = suppliers.find(item => item.pivot.seleccionado);

    // useEffect(() => {
    //     const newState = [...state];

    //     //Create a new row if it doesn't exist
    //     if (state.length === 0) {
    //         newState.push({
    //             id: v4(),
    //             columns: comparision.productIds.map(idList =>
    //                 idList.map(id => {
    //                     return { id };
    //                 })
    //             )
    //         });
    //     }

    //     if (state.length > 0) {
    //         const newProducts = comparision.productIds.flat();

    //         // Delete products that doesn't exit anymore in the new list
    //         for (const row of state) {
    //             for (const column of row.columns) {
    //                 for (const product of [...column]) {
    //                     if (!newProducts.includes(product.id)) {
    //                         column.splice(column.indexOf(product.id), 1);
    //                     }
    //                 }
    //             }
    //         }

    //         // // Add new products that weren't there
    //         for (const [
    //             colIndex,
    //             colProducts
    //         ] of comparision.productIds.entries()) {
    //             for (const newProductId of colProducts) {
    //                 let toAdd = true;

    //                 for (const row of state) {
    //                     for (const column of row.columns) {
    //                         for (const product of column) {
    //                             if (product.id === newProductId) {
    //                                 toAdd = false;
    //                                 break;
    //                             }
    //                         }
    //                     }
    //                 }

    //                 if (toAdd) {
    //                     state[state.length - 1].columns[colIndex].push({
    //                         id: newProductId
    //                     });
    //                 }
    //             }
    //         }
    //     }

    //     console.log(newState);

    //     dispatch(updateComparisionRows(comparision.id, newState));
    // }, [comparison.productIds]);

    useEffect(() => {
        return;
        const newState = [...state];

        //Create a new row if it doesn't exist
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
    }, [comparison.state]);

    const onDragEnd = result => {
        const { source, destination, type } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        const sourceDropableId = source.droppableId;
        const destinationDropableId = destination.droppableId;

        // Mover una fila o mover una celda
        if (type === "rowsParent") {
            if (sourceDropableId === destinationDropableId) {
                // La acción se encarga de informar al servidor y el reducer se
                // encarga de reordenar las filas
                const row = comparison.filas[source.index];
                dispatch(moveRow(row, result));
            }
        } else {
            // const [sourceRow] = extractComparatorCellIndices(sourceDropableId);
            // const [destinationRow] = extractComparatorCellIndices(
            //     destinationDropableId
            // );

            // Extraer coordenadas de la celda origen
            const [sourceRowIndex] = extractComparatorCellIndices(
                source.droppableId
            );

            // Extraer coordenadas de la celda destino
            const [destinationRowIndex] = extractComparatorCellIndices(
                destination.droppableId
            );

            // Celda a mover
            const sourceCell =
                comparison.filas[sourceRowIndex].celdas[source.index];

            // La id de la fila a donde se movera
            const destinationRowId = comparison.filas[destinationRowIndex].id;

            // Información para el servidor
            const newCell = {
                ...sourceCell,
                fila_id: destinationRowId,
                orden: destination.index
            };

            // Informar al server del movimiento que se hizo
            axios.put(`${apiURL}/comparacion_celda/${newCell.id}`, newCell);

            // Actualizar el estado de redux
            dispatch(moveCell(comparison, result));

            // const [sourceRow, sourceColumn] = extractIndices(sourceDropableId);
            // const [destinationRow, destinationColumn] = extractIndices(
            //     destinationDropableId
            // );

            // const newState = [...state];

            // // Remove the item from the source
            // const [removed] = newState[sourceRow].columns[sourceColumn].splice(
            //     source.index,
            //     1
            // );

            // // Add the item to the destination column
            // newState[destinationRow].columns[destinationColumn].splice(
            //     destination.index,
            //     0,
            //     removed
            // );

            // // setState(newState);
            // dispatch(updateComparisionRows(comparison.id, newState));
        }
    };

    const addEmptyRow = () => {
        // const newState = [
        //     ...state,
        //     {
        //         id: v4(),
        //         columns: Array.from(Array(suppliers.length), () => [])
        //     }
        // ];

        // dispatch(updateComparisionRows(comparison.id, newState));
        dispatch(createRow(comparison));
    };

    const handleDelete = () => {
        if (confirm(confirmDelete)) {
            dispatch(deleteComparison(comparison));
        }
    };

    const handleEdit = () => {
        dispatch(
            openModal({
                title: "Editar Comparación",
                body: (
                    <ComparisonFormModal
                        taskId={taskId}
                        comparison={comparison}
                        isEditor={true}
                    />
                )
            })
        );
    };

    const handleSelectNegotiation = negotiation => {
        if (confirm(confirmDelete)) {
            dispatch(selectNegotiation(negotiation));
        }
    };

    return (
        <div className="rows-parent">
            <h2 className="sticky-left">
                {comparison.nombre}{" "}
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
                                            {suppliers.map((item, index) => (
                                                <th
                                                    colSpan={7}
                                                    key={index}
                                                    className="provider-column"
                                                >
                                                    <div className="d-flex justify-content-between w-100">
                                                        <span className="flex-grow-1">
                                                            {item.nombre.toUpperCase()}

                                                            {selectedNegotiation ===
                                                                item && (
                                                                <MdDone className="icon-large text-success ml-2" />
                                                            )}
                                                        </span>

                                                        {!selectedNegotiation && (
                                                            <button
                                                                type="button"
                                                                className="btn btn-info btn-sm mr-2"
                                                                onClick={() =>
                                                                    handleSelectNegotiation(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                <MdTouchApp className="icon-normal mr-2" />
                                                                Seleccionar
                                                                empresa
                                                            </button>
                                                        )}
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>

                                        <tr>
                                            {suppliers.map((item, index) => (
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

                            {comparison.filas.map((row, rowIndex) => (
                                <ComparatorRow
                                    {...{ row, rowIndex, comparisonIndex }}
                                    key={row.id}
                                />
                            ))}

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
