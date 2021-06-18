import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import IncidentModal from "./IncidentModal";
import IncidentCard from "./IncidentCard";
import { emptyIncident, getIncidents } from "../../store/actions/incidentActions";
import { openModal } from "../../store/actions/modalActions";
import EmptyList from "../Navigation/EmptyList";
import LoadingScreen from "../Navigation/LoadingScreen";
import LargeCreateButton from "../Widgets/LargeCreateButton";

const IncidentsTab = ({ stateName, url1, url2, title }) => {
    const dispatch = useDispatch();

    const parent = useSelector(state => state[stateName].current);
    const incidents = useSelector(state => state.incident.incidents);
    const modal = useSelector(store => store.modal);

    const areIncidentsLoading = useSelector(
        state => state.incident.areIncidentsLoading
    );

    useEffect(() => {
        dispatch(getIncidents(url1, url2, parent.id));
    }, []);

    const handleCreate = () => {
        dispatch(
            openModal({
                title: "Agregar Incidencia",
                body: (
                    <IncidentModal
                        stateName={stateName}
                        url1={url1}
                        url2={url2}
                        formData={emptyIncident}
                        isEditor={false}
                    />
                ),
                defaultTab: url2,
                onClose: () =>
                    dispatch(openModal({ ...modal, defaultTab: url2 }))
            })
        );
    };

    return (
        <React.Fragment>
            <div className="mr-auto text-center py-2">
                <h3 className="h2">{title}</h3>
            </div>

            {areIncidentsLoading ? (
                <LoadingScreen />
            ) : (
                <React.Fragment>
                    {incidents.length === 0 && <EmptyList />}

                    <LargeCreateButton onClick={handleCreate} />
                    <div className="d-flex flex-column-reverse">
                        {incidents.length > 0 &&
                            incidents.map((item, index) => {
                                return (
                                    <IncidentCard
                                        key={item.id}
                                        stateName={stateName}
                                        url1={url1}
                                        url2={url2}
                                        incident={item}
                                    />
                                );
                            })}
                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default IncidentsTab;
