import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { FaGripVertical } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { deleteRow } from "../../store/actions/comparatorActions";
import ComparatorColumn from "./ComparatorColumn";

export default ({ row, rowIndex, comparisonIndex }) => {
    const dispatch = useDispatch();
    const { columns } = row;

    let hasItems = columns.some(column => column.length > 0);

    const handleDelete = () => {
        dispatch(deleteRow(row));
    };

    return (
        <Draggable draggableId={`row-${row.id}`} index={rowIndex}>
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
                    <div className="drag-button-width">
                        <FaGripVertical className="icon" />
                        {!hasItems && (
                            <RiDeleteBin2Fill
                                className="icon text-danger"
                                onClick={handleDelete}
                            />
                        )}
                    </div>

                    <div className="d-flex w-100">
                        {columns.map((column, colIndex) => {
                            return (
                                <ComparatorColumn
                                    {...{
                                        rowIndex,
                                        column,
                                        colIndex,
                                        comparisonIndex
                                    }}
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
