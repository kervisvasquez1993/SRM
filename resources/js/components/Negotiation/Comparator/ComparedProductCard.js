import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";

export default ({ data, index }) => {
    // @ts-ignore
    const products = useSelector(state => state.comparator.products);
    const product = products.find(product => product.id == data.id);

    return (
        <Draggable draggableId={`${data.id}`} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={provided.draggableProps.style}
                    className={`product-draggable ${
                        snapshot.isDragging ? "isDragging" : ""
                    }`}
                >
                    <table className="table table-sm table-bordered py-0 text-center bg-white comparision-table">
                        <tbody>
                            <tr>
                                <td>{product.product_name_supplier}</td>
                                <td>{product.description}</td>
                                <td>{product.total_pcs}</td>
                                <td>{product.unit_price}$</td>
                                <td>{product.total_usd}$</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </Draggable>
    );
};
