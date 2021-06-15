import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../../store/actions/modalActions";
import { deleteProductionIncident } from "../../../store/actions/productionActions";
import { dateToShortString } from "../../../utils";
import IncidentCard from "../../Incidents/IncidentCard";
import SeeMoreText from "../../UI/SeeMoreText";
import ProductionEndModal from "./ProductionEndModal";

const titleStyle = { width: "16.666%" };

const ProductionEndCard = ({ data, production }) => {
    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch(
            openModal({
                title: "Editar Incidencia",
                body: (
                    <ProductionEndModal
                        formData={data}
                        isEditor={true}
                        production={production}
                    />
                )
            })
        );
    };

    const handleDelete = () => {
        dispatch(deleteProductionIncident("fin_produccion", data.id));
    };

    return (
        <IncidentCard
            data={data}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
};

export default ProductionEndCard;
