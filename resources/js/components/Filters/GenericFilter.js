import React, { useEffect, useRef, useState } from "react";
import EmptyList from "../Navigation/EmptyList";
import Accordion from "../Widgets/Accordion";
import CheckboxFilter from "./CheckboxFilter";
import Filter from "./Filter";
import FilterGroup from "./FilterGroup";

export let globalOptions = {
    defaultChekboxValue: undefined
};

const GenericFilter = ({
    config = [],
    unfilteredData = [],
    populatorConfig = [],
    children = null,
    onChange = null,
    setFilteredList = null
}) => {
    const filter = useRef(null);
    const [filtered, setFiltered] = useState([...unfilteredData]);

    const [afterFilters, setAfterFilters] = useState({});

    useEffect(() => {
        if (filter.current != null) {
            applyFilter(filter.current);
        }
    }, [unfilteredData]);

    useEffect(() => {
        if (onChange) {
            onChange(filtered);
        }
    }, [filtered]);

    const applyFilter = filter => {
        let list = [...unfilteredData];
        let afterResult = { ...afterFilters };

        config.forEach(filterConf => {
            if (filterConf.name in filter) {
                if (typeof filterConf.values === "function") {
                    list = list.filter(item => filterConf.filter(item, filter));
                } else {
                    let isAllDisabled = Object.values(
                        filter[filterConf.name]
                    ).every(i => !i);

                    /*
                    for (let key in filter[filterConf.name]) {
                        if (!filter[filterConf.name][key]) {
                            isAllDisabled = false;
                            break;
                        }
                    }*/
                    if (!filterConf.unfilterWhenAllDisabled || !isAllDisabled) {
                        filterConf.values.forEach(subConfig => {
                            list = list.filter(item =>
                                subConfig.filter(item, filter)
                            );
                        });
                    }
                }
            } else {
                list = list.filter(item => false);
            }

            afterResult[filterConf.name] = list;
        });

        setAfterFilters(afterResult);
        setFiltered(list);

        if (setFilteredList) {
            setFilteredList(list);
        }
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

    const hide = {
        display: "none"
    };

    return (
        <React.Fragment>
            <Accordion
                title="Filtrar"
                className="card mb-5"
                headerClassName="card-header"
                style={unfilteredData.length === 0 ? hide : {}}
            >
                <div className="mb-5">
                    <Filter onUpdate={applyFilter} useRef={filter}>
                        {config.map((filterConf, index) => {
                            const { name, values, useAccordion } = filterConf;

                            let innerContent;

                            let label = filterConf.label;

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

                                    if (previouslyFiltered) {
                                        previouslyFiltered.forEach(listItem => {
                                            if (value.filterPopulator(listItem))
                                                count++;
                                        });
                                    }

                                    if (count == 0) {
                                        return;
                                    }

                                    return (
                                        <CheckboxFilter
                                            key={value.id}
                                            id={value.id}
                                            text={`${value.label} (${count})`}
                                            defaultValue={
                                                globalOptions.defaultChekboxValue !=
                                                undefined
                                                    ? globalOptions.defaultChekboxValue
                                                    : value.defaultValue !=
                                                      undefined
                                                    ? value.defaultValue
                                                    : true
                                            }
                                        />
                                    );
                                });
                            }

                            if (
                                !innerContent ||
                                innerContent.length === 0 ||
                                (previouslyFiltered &&
                                    previouslyFiltered.length == 0)
                            ) {
                                return;
                            }

                            if (
                                filter.current &&
                                filterConf.unfilterWhenAllDisabled &&
                                filterConf.name in filter.current
                            ) {
                                let isAllDisabled = Object.values(
                                    filter.current[filterConf.name]
                                ).every(i => !i);

                                if (
                                    filterConf.unfilterWhenAllDisabled &&
                                    isAllDisabled
                                ) {
                                    label += " (todos)";
                                }
                            }

                            return (
                                <React.Fragment key={name}>
                                    {useAccordion ? (
                                        <Accordion
                                            title={label}
                                            className="mx-0 p-0"
                                        >
                                            <FilterGroup name={name}>
                                                {innerContent}
                                            </FilterGroup>
                                        </Accordion>
                                    ) : (
                                        <FilterGroup
                                            name={name}
                                            text={label}
                                            className="mb-4"
                                            headerClassName="h4"
                                        >
                                            {innerContent}
                                        </FilterGroup>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </Filter>
                </div>
            </Accordion>

            {children}

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
                                <h2 className="mt-4 h3">
                                    {conf.header} ({innerContent.length})
                                </h2>
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
