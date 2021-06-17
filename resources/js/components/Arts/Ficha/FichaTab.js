import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emptyIncident, getIncidents } from "../../../store/actions/incidentActions";
import { openModal } from "../../../store/actions/modalActions";
import EmptyList from "../../Navigation/EmptyList";
import LoadingScreen from "../../Navigation/LoadingScreen";

import FichaModal from "./FichaModal";
import FichaCard from "./FichaCard";
import { openArtModal } from "../../../store/actions/artActions";
import LargeCreateButton from "../../UI/LargeCreateButton";

const FichaTab = () => {
    const dispatch = useDispatch();

    const art = useSelector(state => state.art.current);
    const incidents = useSelector(state => state.incident.incidents);
    const areIncidentsLoading = useSelector(
        state => state.incident.areIncidentsLoading
    );

    useEffect(() => {
        dispatch(getIncidents("arte", "ficha", art.id));
    }, []);

    const handleCreate = () => {
        dispatch(
            openModal({
                title: "Agregar Incidencia",
                body: (
                    <FichaModal
                        formData={emptyIncident}
                        isEditor={false}
                    />
                ),
                onClose: () => dispatch(openArtModal(art.id))
            })
        );
    };

    return (
        <React.Fragment>
            <div className="mr-auto text-center py-2">
                <h3 className="h2">Incidencias con Creación de Fichas</h3>
            </div>

            {areIncidentsLoading ? (
                <LoadingScreen />
            ) : (
                <React.Fragment>
                    {incidents.length === 0 && <EmptyList />}

                    <LargeCreateButton onClick={handleCreate} />

                    {incidents.length > 0 &&
                        incidents.map((item, index) => {
                            return (
                                <FichaCard
                                    key={index}
                                    incident={item}
                                />
                            );
                        })}
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default FichaTab;
