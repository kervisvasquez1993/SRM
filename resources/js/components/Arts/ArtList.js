import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArts } from "../../store/actions/artActions";
import { isArtCompleted } from "../../utils";
import GenericFilter from "../Filters/GenericFilter";
import ArtCard, { categories, options } from "./ArtCard";

const ArtList = () => {
    const dispatch = useDispatch();
    const arts = useSelector(state => state.art.list);

    useEffect(() => {
        dispatch(getArts());
    }, []);

    let filterConfig = [
        {
            name: "status",
            type: "checkbox",
            label: "Estado",
            values: [
                {
                    id: "processing",
                    label: "En proceso",
                    filter: (item, filters) =>
                        !(
                            filters["status"]["processing"] === false &&
                            !isArtCompleted(item)
                        ),
                    filterPopulator: item => !isArtCompleted(item)
                },
                {
                    id: "completed",
                    label: "Completadas",
                    defaultValue: false,

                    filter: (item, filters) =>
                        !(
                            filters["status"]["completed"] === false &&
                            isArtCompleted(item)
                        ),
                    filterPopulator: item => isArtCompleted(item)
                }
            ]
        },
    ];

    const otherFilters = categories.map(
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

    filterConfig = [...filterConfig, ...otherFilters]

    const populatorConfig = [
        {
            header: "En progreso:",
            filterPopulator: item => !isArtCompleted(item),
            populator: item => {
                return <ArtCard key={item.id} art={item} />;
            }
        },
        {
            header: "Completadas:",
            filterPopulator: item => isArtCompleted(item),
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
        </React.Fragment>
    );
};

export default ArtList;
