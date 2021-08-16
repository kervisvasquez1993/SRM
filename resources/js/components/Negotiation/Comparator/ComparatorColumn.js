import React from "react";
import { Droppable } from "react-beautiful-dnd";
import ComparedProductCard from "./ComparedProductCard";

export default ({ rowIndex, colIndex, column, comparisonIndex }) => {
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
                    {column.map((product, productIndex) => (
                        <ComparedProductCard
                            data={product}
                            index={productIndex}
                            key={product.id}
                            rowIndex={rowIndex}
                            colIndex={colIndex}
                            comparisonIndex={comparisonIndex}
                        />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};
