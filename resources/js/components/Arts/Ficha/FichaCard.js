import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openArtModal } from "../../../store/actions/artActions";
import { deleteIncident } from "../../../store/actions/incidentActions";
import { openModal } from "../../../store/actions/modalActions";
import IncidentCard from "../../Incidents/IncidentCard";
import FichaModal from "./FichaModal";

const FichaCard = ({ incident }) => {
    const dispatch = useDispatch();
    const art = useSelector(state => state.art.current);

    const handleEdit = () => {
        dispatch(
            openModal({
                title: "Editar Incidencia",
                body: (
                    <FichaModal
                        formData={incident}
                        isEditor={true}
                        art={art}
                    />
                ),
                onClose: () => dispatch(openArtModal(art.id))
            })
        );
    };

    const handleDelete = () => {
        dispatch(deleteIncident("ficha", incident.id));
    };

    return (
        <IncidentCard
            data={incident}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
};

export default FichaCard;
