import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { FaGripVertical } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import ComparatorColumn from "./ComparatorColumn";

export default ({ row, rowIndex, deleteRow, comparisonIndex }) => {
    let isEmpty = true;

    for (let column of row.columns) {
        if (column.length > 0) {
            isEmpty = false;
            break;
        }
    }

    return (
        <Draggable draggableId={row.id} index={rowIndex}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={provided.draggableProps.style}
                    className={`comparision-draggable ${
                        snapshot.isDragging ? "isDragging" : ""
                    }`}

                    {...provided.dragHandleProps}
                >
                    <div
                        
                        className="drag-button-width"
                    >
                        <FaGripVertical className="icon" />
                        {isEmpty && <RiDeleteBin2Fill className="icon text-danger" onClick={() => deleteRow(rowIndex)} />}
                    </div>

                    <div className="d-flex w-100">
                        {row.columns.map((column, colIndex) => {
                            return (
                                <ComparatorColumn
                                    {...{ rowIndex, column, colIndex, comparisonIndex }}
                                    key={colIndex}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </Draggable>
    );
};
