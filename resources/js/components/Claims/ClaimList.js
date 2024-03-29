import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getClaims } from "../../store/actions/claimActions";
import { isClaimCompleted, useUser } from "../../utils";
import GenericFilter from "../Filters/GenericFilter";
import LoadingScreen from "../Navigation/LoadingScreen";
import ClaimCard from "./ClaimCard";

const ClaimsList = () => {
    const dispatch = useDispatch();
    const user = useUser();
    // @ts-ignore
    const claims = useSelector(state => state.claim.list);
    // @ts-ignore
    const isLoadingList = useSelector(state => state.claim.isLoadingList);
    const [filteredNegotiations, setFilteredNegotiations] = useState([]);

    if (
        !(
            user.rol === "coordinador" ||
            user.rol === "comprador" ||
            user.rol === "almacen"
        )
    ) {
        return <Redirect to="/home" />;
    }

    const onChange = filteredList => {
        setFilteredNegotiations(filteredList.map(item => item.pivot));
    };

    useEffect(() => {
        dispatch(getClaims());
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
                            !isClaimCompleted(item)
                        ),
                    filterPopulator: item => !isClaimCompleted(item)
                },
                {
                    id: "completed",
                    label: "Completadas",
                    defaultValue: false,

                    filter: (item, filters) =>
                        !(
                            filters["status"]["completed"] === false &&
                            isClaimCompleted(item)
                        ),
                    filterPopulator: item => isClaimCompleted(item)
                }
            ]
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
            filterPopulator: item => !isClaimCompleted(item),
            populator: item => {
                return <ClaimCard key={item.id} claim={item} />;
            }
        },
        {
            header: "Completadas",
            filterPopulator: item => isClaimCompleted(item),
            populator: item => {
                return <ClaimCard key={item.id} claim={item} />;
            }
        }
    ];

    const helmet = (
        <Helmet>
            <title>{`Recepción Reclamos y Devoluciones - ${process.env.MIX_APP_NAME}`}</title>
        </Helmet>
    );

    if (isLoadingList) {
        return <LoadingScreen>{helmet}</LoadingScreen>;
    }

    return (
        <React.Fragment>
            {helmet}
            <h1 className="text-center my-5">
                Recepción Reclamos y Devoluciones
            </h1>

            <GenericFilter
                config={filterConfig}
                unfilteredData={claims}
                populatorConfig={populatorConfig}
                onChange={onChange}
            />
        </React.Fragment>
    );
};

export default ClaimsList;
