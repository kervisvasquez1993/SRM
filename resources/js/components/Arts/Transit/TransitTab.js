import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../store/actions/modalActions";
import { getProductionIncidents } from "../../../store/actions/productionActions";
import EmptyList from "../../Navigation/EmptyList";
import LoadingScreen from "../../Navigation/LoadingScreen";
import { emptyIncident } from "../../Productions/ProductionStart/ProductionStartIncidentModal";

import TransitCard from "./TransitCard";
import TransitModal from "./TransitModal";

const TransitTab = ({ production }) => {
    const dispatch = useDispatch();
    const incidents = useSelector(state => state.production.incidents);
    const areIncidentsLoading = useSelector(
        state => state.production.areIncidentsLoading
    );

    useEffect(() => {
        dispatch(getProductionIncidents("incidencias_transito", production.id));
    }, []);

    const handleCreate = () => {
        dispatch(
            openModal({
                title: "Agregar Incidencia",
                body: (
                    <TransitModal
                        formData={emptyIncident}
                        isEditor={false}
                        production={production}
                    />
                )
            })
        );
    };

    return (
        <React.Fragment>
            <div className="mr-auto text-center py-2">
                <h3 className="h2">Incidencias de Transito Nacionalización</h3>
            </div>

            {areIncidentsLoading ? (
                <LoadingScreen />
            ) : (
                <React.Fragment>
                    {incidents.length === 0 && <EmptyList />}

                    <div className="text-center">
                        <button
                            className="btn btn-lg btn-success btn-round mb-4"
                            onClick={handleCreate}
                        >
                            <span className="material-icons">add</span>
                            Agregar
                        </button>
                    </div>

                    {incidents.length > 0 &&
                        incidents.map((item, index) => {
                            return (
                                <TransitCard
                                    key={index}
                                    data={item}
                                    production={production}
                                />
                            );
                        })}
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default TransitTab;
