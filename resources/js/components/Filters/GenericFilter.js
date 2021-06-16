import React, { useEffect, useRef, useState } from "react";
import EmptyList from "../Navigation/EmptyList";
import Accordion from "../UI/Accordion";
import CheckboxFilter from "./CheckboxFilter";
import Filter from "./Filter";
import FilterGroup from "./FilterGroup";

const GenericFilter = ({
    config = [],
    unfilteredData = [],
    populatorConfig = []
}) => {
    const filter = useRef(null);
    const [filtered, setFiltered] = useState([...unfilteredData]);

    const [afterFilters, setAfterFilters] = useState({});

    useEffect(() => {
        applyFilter(filter.current);
    }, [unfilteredData]);

    const applyFilter = filter => {
        let list = [...unfilteredData];
        let afterResult = { ...afterFilters };

        config.forEach(filterConf => {
            if (typeof filterConf.values === "function") {
                if (filterConf.name in filter) {
                    list = list.filter(item => filterConf.filter(item, filter));
                }
            } else {
                if (filterConf.name in filter) {
                    filterConf.values.forEach(subConfig => {
                        list = list.filter(item =>
                            subConfig.filter(item, filter)
                        );
                    });
                }
            }

            afterResult[filterConf.name] = list;
        });

        setAfterFilters(afterResult);
        setFiltered(list);
    };

    const getPreviousFilteredList = index => {
        return index === 0
            ? unfilteredData
            : afterFilters[config[index - 1].name];
    };

    const filteredGroups = {};

    config.forEach((filterConf, index) => {
        let listToUse = getPreviousFilteredList(index);

        if (typeof filterConf.values === "function" && listToUse) {
            const set = new Set();

            listToUse.forEach(item => set.add(filterConf.values(item)));
            filteredGroups[filterConf.name] = [...set];
        }
    });

    return (
        <React.Fragment>
            <div className="mb-5">
                <Filter onUpdate={applyFilter} useRef={filter}>
                    {config.map((filterConf, index) => {
                        const {
                            name,
                            label,
                            values,
                            useAccordion
                        } = filterConf;

                        let innerContent;

                        const previouslyFiltered = getPreviousFilteredList(
                            index
                        );

                        if (typeof values === "function") {
                            if (name in filteredGroups) {
                                innerContent = filteredGroups[name].map(
                                    item => {
                                        let count = 0;
                                        if (filterConf.counterFilter) {
                                            previouslyFiltered.forEach(
                                                listItem => {
                                                    if (
                                                        filterConf.counterFilter(
                                                            listItem,
                                                            item
                                                        )
                                                    )
                                                        count++;
                                                }
                                            );
                                        }

                                        return (
                                            <CheckboxFilter
                                                key={item}
                                                id={item}
                                                text={`${item} ${
                                                    filterConf.counterFilter
                                                        ? `(${count})`
                                                        : ""
                                                } `}
                                            />
                                        );
                                    }
                                );
                            }
                        } else {
                            innerContent = values.map(value => {
                                let count = 0;

                                previouslyFiltered.forEach(listItem => {
                                    if (value.filterPopulator(listItem))
                                        count++;
                                });

                                return (
                                    <CheckboxFilter
                                        key={value.id}
                                        id={value.id}
                                        text={`${value.label} (${count})`}
                                    />
                                );
                            });
                        }

                        if (!innerContent || innerContent.length === 0) {
                            return;
                        }

                        return (
                            <React.Fragment key={name}>
                                {useAccordion ? (
                                    <Accordion title={label}>
                                        <FilterGroup name={name}>
                                            {innerContent}
                                        </FilterGroup>
                                    </Accordion>
                                ) : (
                                    <FilterGroup name={name} text={label}>
                                        {innerContent}
                                    </FilterGroup>
                                )}
                            </React.Fragment>
                        );
                    })}
                </Filter>
            </div>

            {filtered.length > 0 ? (
                <React.Fragment>
                    {/* {categorizedData.map(conf => {
                        let innerContent = filtered
                            .filter(item => conf.filterPopulator(item))
                            .map(item => conf.populator(item));

                        if (innerContent.length === 0) {
                            return;
                        }

                        return (
                            <React.Fragment key={conf.id}>
                                <h2 className="mt-4 h3">{conf.header}</h2>
                                <hr className="mb-4" />
                                <div className="d-flex flex-column-reverse">
                                    {innerContent}
                                </div>
                            </React.Fragment>
                        );
                    })} */}
                    {populatorConfig.map(conf => {
                        let innerContent = filtered
                            .filter(item => conf.filterPopulator(item))
                            .map(item => conf.populator(item));

                        if (innerContent.length === 0) {
                            return;
                        }

                        return (
                            <React.Fragment key={conf.header}>
                                <h2 className="mt-4 h3">{conf.header}</h2>
                                <hr className="mb-4" />
                                <div className="d-flex flex-column-reverse">
                                    {innerContent}
                                </div>
                            </React.Fragment>
                        );
                    })}
                </React.Fragment>
            ) : (
                <EmptyList />
            )}
        </React.Fragment>
    );
};

export default GenericFilter;
