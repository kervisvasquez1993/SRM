import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArts } from "../../store/actions/artActions";
import GenericFilter from "../Filters/GenericFilter";
import ArtCard, { categories, options } from "./ArtCard";

const ArtList = () => {
    const dispatch = useDispatch();
    const arts = useSelector(state => state.art.list);

    useEffect(() => {
        dispatch(getArts());
    }, []);

    const filterConfig = categories.map(
        ({ value: categoryValue, label: categoryLabel }) => {
            return {
                name: categoryValue,
                type: "checkbox",
                label: categoryLabel,
                unfilterWhenAllDisabled: true,
                values: options.map(
                    ({ value: optionValue, label: optionLabel }) => {
                        const id = categoryValue + optionValue;
                        return {
                            id,
                            label: optionLabel,
                            defaultValue: false,
                            filter: (item, filters) =>
                                !(
                                    filters[categoryValue][id] === false &&
                                    item[categoryValue] === optionValue
                                ),
                            filterPopulator: item =>
                                item[categoryValue] === optionValue
                        };
                    }
                )
            };
        }
    );

    /*
    const filterConfig = [
        {
            name: "creacion_fichas",
            type: "checkbox",
            label: "Creación de fichas",
            useAccordion: true,
            values: [
                {
                    id: "sin_inicializar",
                    label: "Sin inicializar",
                    filter: (item, filters) =>
                        !(
                            filters["creacion_fichas"]["sin_inicializar"] ===
                                false &&
                            item.creacion_fichas === "sin_inicializar"
                        ),
                    filterPopulator: item =>
                        item.creacion_fichas === "sin_inicializar"
                },
                {
                    id: "en_proceso",
                    label: "En proceso",
                    filter: (item, filters) =>
                        !(
                            filters["creacion_fichas"]["en_proceso"] ===
                                false && item.creacion_fichas === "en_proceso"
                        ),
                    filterPopulator: item =>
                        item.creacion_fichas === "en_proceso"
                },
                {
                    id: "finalizado",
                    label: "Finalizado",
                    filter: (item, filters) =>
                        !(
                            filters["creacion_fichas"]["finalizado"] ===
                                false && item.creacion_fichas === "finalizado"
                        ),
                    filterPopulator: item =>
                        item.creacion_fichas === "finalizado"
                }
            ]
        }
    ];
    */

    const populatorConfig = [
        {
            header: "Resultados",
            filterPopulator: item => true,
            populator: item => {
                return <ArtCard key={item.id} art={item} />;
            }
        }
    ];

    return (
        <React.Fragment>
            <h1 className="text-center my-5">Artes</h1>

            <GenericFilter
                config={filterConfig}
                unfilteredData={arts}
                populatorConfig={populatorConfig}
            />

            {/* {arts.length > 0 ? (
                <div className="d-flex flex-column-reverse">
                    {arts.map(item => {
                        return (
                            <ArtCard key={item.id} art={item} />
                        );
                    })}
                </div>
            ) : (
                <EmptyList />
            )} */}
        </React.Fragment>
    );
};

export default ArtList;
