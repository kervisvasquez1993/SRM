import React from "react";
import { Droppable } from "react-beautiful-dnd";
import ComparedProductCard from "./ComparedProductCard";

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
