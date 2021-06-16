import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../../store/actions/modalActions";
import { deleteProductionIncident } from "../../../store/actions/productionActions";
import { dateToShortString } from "../../../utils";
import IncidentCard from "../../Incidents/IncidentCard";
import SeeMoreText from "../../UI/SeeMoreText";
import TransitModal from "./TransitModal";

const titleStyle = { width: "16.666%" };

const TransitCard = ({ data, production }) => {
    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch(
            openModal({
                title: "Editar Incidencia",
                body: (
                    <TransitModal
                        formData={data}
                        isEditor={true}
                        production={production}
                    />
                )
            })
        );
    };

    const handleDelete = () => {
        dispatch(deleteProductionIncident("incidencias_transito", data.id));
    };

    return (
        <IncidentCard
            data={data}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
};

export default TransitCard;
