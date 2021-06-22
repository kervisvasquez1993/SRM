import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductions } from "../../store/actions/productionActions";
import GenericFilter from "../Filters/GenericFilter";
import NegotiationResume from "../Widgets/NegotiationResume";
import ProductionCard from "./ProductionCard";

const ProductionList = () => {
    const dispatch = useDispatch();
    const productions = useSelector(state => state.production.list);
    const [filteredNegotiations, setFilteredNegotiations] = useState([]);

    const onChange = filteredList => {
        setFilteredNegotiations(filteredList.map(item => item.pivot));
    };

    useEffect(() => {
        dispatch(getProductions());
    }, []);

    const filterConfig = [
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
                            !item.salida_puero_origen
                        ),
                    filterPopulator: item => !item.salida_puero_origen
                },
                {
                    id: "completed",
                    label: "Completadas",
                    defaultValue: false,

                    filter: (item, filters) =>
                        !(
                            filters["status"]["completed"] === false &&
                            item.salida_puero_origen
                        ),
                    filterPopulator: item => item.salida_puero_origen
                }
            ]
        },
        {
            name: "user",
            type: "checkbox",
            label: "Usuario",
            useAccordion: true,
            values: item => item.pivot.usuario.name,
            filter: (item, filters) => filters.user[item.pivot.usuario.name],
            counterFilter: (item, id) => item.pivot.usuario.name === id
        },
        {
            name: "country",
            type: "checkbox",
            label: "País",
            useAccordion: true,
            values: item => item.pivot.proveedor.pais,
            filter: (item, filters) =>
                filters.country[item.pivot.proveedor.pais],
            counterFilter: (item, id) => item.pivot.proveedor.pais === id
        },
        {
            name: "city",
            type: "checkbox",
            label: "Ciudad",
            useAccordion: true,
            values: item => item.pivot.proveedor.ciudad,
            filter: (item, filters) =>
                filters.city[item.pivot.proveedor.ciudad],
            counterFilter: (item, id) => item.pivot.proveedor.ciudad === id
        },
        {
            name: "district",
            type: "checkbox",
            label: "Distrito",
            useAccordion: true,
            values: item => item.pivot.proveedor.distrito,
            filter: (item, filters) =>
                filters.district[item.pivot.proveedor.distrito],
            counterFilter: (item, id) => item.pivot.proveedor.distrito === id
        }
    ];

    const populatorConfig = [
        {
            header: "En proceso",
            filterPopulator: item => !item.salida_puero_origen,
            populator: item => {
                return <ProductionCard key={item.id} production={item} />;
            }
        },
        {
            header: "Completadas",
            filterPopulator: item => item.salida_puero_origen,
            populator: item => {
                return <ProductionCard key={item.id} production={item} />;
            }
        }
    ];

    return (
        <React.Fragment>
            <h1 className="text-center my-5">Producción y Transito</h1>

            <GenericFilter
                config={filterConfig}
                unfilteredData={productions}
                populatorConfig={populatorConfig}
                onChange={onChange}
            >
                <NegotiationResume negotiations={filteredNegotiations} />
            </GenericFilter>
        </React.Fragment>
    );
};

export default ProductionList;
