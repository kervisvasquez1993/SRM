import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getProductions } from "../../store/actions/productionActions";
import { useUser } from "../../utils";
import GenericFilter from "../Filters/GenericFilter";
import LoadingScreen from "../Navigation/LoadingScreen";
import NegotiationResume from "../Widgets/NegotiationResume";
import ProductionCard from "./ProductionCard";

const ProductionList = () => {
    const dispatch = useDispatch();
    const user = useUser();
    const productions = useSelector(state => state.production.list);
    const [filteredNegotiations, setFilteredNegotiations] = useState([]);
    const isLoadingList = useSelector(state => state.production.isLoadingList);

    if (
        !(
            user.rol === "coordinador" ||
            user.rol === "comprador" ||
            user.rol === "observador" ||
            user.rol === "logistica"
        )
    ) {
        return <Redirect to="/home" />;
    }

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
                            !item.nacionalizacion
                        ),
                    filterPopulator: item => !item.nacionalizacion
                },
                {
                    id: "completed",
                    label: "Completadas",
                    defaultValue: false,

                    filter: (item, filters) =>
                        !(
                            filters["status"]["completed"] === false &&
                            item.nacionalizacion
                        ),
                    filterPopulator: item => item.nacionalizacion
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
            filterPopulator: item => !item.nacionalizacion,
            populator: item => {
                return <ProductionCard key={item.id} production={item} />;
            }
        },
        {
            header: "Completadas",
            filterPopulator: item => item.nacionalizacion,
            populator: item => {
                return <ProductionCard key={item.id} production={item} />;
            }
        }
    ];

    const helmet = (
        <Helmet>
            <title>{`Producción y Transito - ${process.env.MIX_APP_NAME}`}</title>
        </Helmet>
    );

    if (isLoadingList) {
        return <LoadingScreen>{helmet}</LoadingScreen>;
    }

    return (
        <React.Fragment>
            {helmet}
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
