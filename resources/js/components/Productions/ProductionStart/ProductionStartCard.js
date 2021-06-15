import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../../store/actions/modalActions";
import { deleteProductionIncident } from "../../../store/actions/productionActions";
import { dateToShortString } from "../../../utils";
import SeeMoreText from "../../UI/SeeMoreText";
import ProductionStartIncidentModal from "./ProductionStartIncidentModal";

const titleStyle = { width: "16.666%" };

const ProductionStartCard = ({ data, production }) => {
    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch(
            openModal({
                title: "Editar Incidencia",
                body: (
                    <ProductionStartIncidentModal
                        formData={data}
                        isEditor={true}
                        production={production}
                    />
                )
            })
        );
    };

    const handleDelete = () => {
        dispatch(deleteProductionIncident("inicio_produccion", data.id));
    };

    return (
        <div className={`card shadow-lg my-4 fade-in`}>
            <div className="card-body pb-0">
                <h5 className="card-title font-weight-bold">{data.titulo}</h5>
                <hr />
                <p className="card-text keep-line-breaks">
                    <SeeMoreText maxLength={200}>{data.descripcion}</SeeMoreText>
                </p>
            </div>

            <div className="card-footer">
                <div className="d-flex justify-content-between align-items-center w-100 flex-wrap">
                    <div className="d-flex">
                        <i className="material-icons mr-1">access_time</i>
                        Fecha :{" "}
                        <strong>
                            {dateToShortString(new Date(data.created_at))}
                        </strong>
                    </div>

                    <div className="d-flex bt-sm justify-content-start">
                        <button
                            className="btn btn-success btn-circle"
                            type="button"
                            onClick={handleEdit}
                        >
                            <span className="material-icons">edit</span>
                        </button>
                        <button
                            className="btn bt-sm btn-danger btn-circle"
                            type="button"
                            onClick={handleDelete}
                        >
                            <span className="material-icons">clear</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        // <tr
        //     key={data.id}
        //     className={`fade-in ${
        //         data.tipo === "Pago Anticipado" ? "bg-info" : ""
        //     }`}
        //     style={titleStyle}
        // >
        //     <td style={titleStyle}>{data.titulo}</td>
        //     <td style={titleStyle}>{data.descripcion}</td>
        //     <td style={titleStyle}>
        //         <div className="d-flex justify-content-start">
        //             <button
        //                 className="btn btn-success btn-circle ml-3"
        //                 type="button"
        //                 onClick={handleEdit}
        //             >
        //                 <span className="material-icons">edit</span>
        //             </button>
        //             {data.tipo != "Pago Anticipado" && (
        //                 <button
        //                     className="btn btn-danger btn-circle"
        //                     type="button"
        //                     onClick={handleDelete}
        //                 >
        //                     <span className="material-icons">clear</span>
        //                 </button>
        //             )}
        //         </div>
        //     </td>
        // </tr>
    );
};

export default ProductionStartCard;
