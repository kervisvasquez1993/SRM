import React from "react";
import { BsPersonFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { confirmDelete } from "../../../appText";
import { deleteProductClaim } from "../../../store/actions/claimActions";
import { openModal } from "../../../store/actions/modalActions";
import { dateToShortString, useUser } from "../../../utils";
import { apiURL } from "../../App";
import GenericFileList from "../../Files/GenericFileList";
import ProductClaimModal from "./ProductClaimModal";

const ProductClaimCard = ({ data }) => {
    const dispatch = useDispatch();
    const user = useUser();

    const handleEdit = () => {
        dispatch(
            openModal({
                title: "Editar Reclamo",
                body: <ProductClaimModal formData={data} isEditor={true} />
            })
        );
    };

    const handleDelete = () => {
        if (confirm(confirmDelete)) {
            dispatch(deleteProductClaim(data.id));
        }
    };

    const url = `${apiURL}/reclamo/${data.id}/archivo`;

    return (
        <div className={`card shadow-md my-2 fade-in`}>
            <div className="card-body pb-0">
                <h5 className="card-title font-weight-bold">{data.titulo}</h5>
                <hr />
                <div
                    className="card-text rich-text"
                    dangerouslySetInnerHTML={{
                        __html: data.descripcion
                    }}
                ></div>

                <GenericFileList
                    id={data.id}
                    getUrl={url}
                    uploadUrl={url}
                    deleteUrl={url}
                    hideDropzone={user.rol != "almacen"}
                    allowEditing={user.rol === "almacen"}
                />
            </div>

            <div className="card-footer">
                <div className="d-flex justify-content-between align-items-center w-100 flex-wrap">
                    <div className="d-flex flex-wrap">
                        <div className="d-flex align-items-center mr-4 mb-1">
                            <BsPersonFill className="icon-normal mr-1" />
                            <strong>{data.usuario.name}</strong>
                        </div>

                        <div className="d-flex">
                            <i className="material-icons mr-1">access_time</i>
                            <p className="m-0">
                                Fecha :{" "}
                                <strong>
                                    {dateToShortString(
                                        new Date(data.created_at)
                                    )}
                                </strong>
                            </p>
                        </div>
                    </div>
                    {user.id === data.user_login && (
                        <div className="d-flex bt-sm justify-content-end flex-grow-1">
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductClaimCard;
