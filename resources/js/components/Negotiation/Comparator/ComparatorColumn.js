import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import ComparedProductCard from "./ComparedProductCard";

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

export default ({ rowIndex, colIndex, column }) => {
    const id = `row-${rowIndex}-col-${colIndex}`;

    return (
        <Droppable
            droppableId={id}
            direction={"vertical"}
            type={colIndex.toString()}
        >
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`column-dropable ${snapshot.isDraggingOver &&
                        "drag-over"}`}
                >
                    {column.map((productId, productIndex) => (
                        <ComparedProductCard
                            productId={productId}
                            index={productIndex}
                            key={productId}
                        />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};
