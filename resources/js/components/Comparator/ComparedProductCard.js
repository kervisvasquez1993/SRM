import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { updateCell } from "../../store/actions/comparatorActions";
// import { deleteCell, updateCell } from "../../store/actions/comparatorActions";
import { amazonS3Url } from "../App";

const white = "ffffff";
const green = "7dc472";
const yellow = "ede977";

export default ({ data, index }) => {
    const dispatch = useDispatch();

    // @ts-ignore
    const products = useSelector(state => state.comparator.products);
    const product = products.find(product => product.id == data.id);

    const handleClick = () => {
        const newData = { ...data.cell };

        switch (newData.color) {
            case white:
                newData.color = green;
                break;
            case green:
                newData.color = yellow;
                break;
            case yellow:
                newData.color = white;
                break;
            default:
                newData.color = green;
                break;
        }

        dispatch(updateCell(newData));
    };
    
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
                    onClick={handleClick}
                >
                    <table className="table table-sm table-bordered py-0 text-center comparision-table">
                        <tbody
                            style={{
                                backgroundColor: `#${data.cell.color}`
                            }}
                        >
                            {product && (
                                <tr>
                                    <td className="product-name">
                                        {product.product_code_supplier}
                                    </td>
                                    <td className="product-name">
                                        {product.product_name_supplier}
                                    </td>
                                    <td className="product-description">
                                        <div className="product-description-text">
                                            {product.description}
                                        </div>
                                    </td>
                                    <td>{product.total_pcs}</td>
                                    <td>{product.unit_price}$</td>
                                    <td>{product.total_usd}$</td>
                                    <td className="product-image-parent product-name">
                                        {product.imagen && (
                                            <img
                                                className="product-image"
                                                src={
                                                    amazonS3Url + product.imagen
                                                }
                                            />
                                        )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </Draggable>
    );
};
