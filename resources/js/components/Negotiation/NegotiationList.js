// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
// import { getNegotiations } from "../../store/actions/negotiationActions";
// import { getUsers } from "../../store/actions/userActions";
// import { isNegotiationCompleted } from "../../utils";
// import CheckboxFilter from "../Filters/CheckboxFilter";
// import Filter from "../Filters/Filter";
// import FilterGroup from "../Filters/FilterGroup";
// import GenericFilter from "../Filters/GenericFilter";
// import EmptyList from "../Navigation/EmptyList";
// import NegotiationCard from "./NegotiationCard";

// const NegotiationList = () => {
//     const dispatch = useDispatch();
//     const user = useSelector(state => state.auth.user);
//     const negotiations = useSelector(state => state.negotiation.negotiations);

//     const filter = useRef(null);
//     const [filtered, setFiltered] = useState([...negotiations]);

//     const [filterAfterStatus, setFilterAfterStatus] = useState([]);
//     const [filterAfterTask, setFilterAfterTask] = useState([]);
//     const [filterAfterUser, setFilterAfterUser] = useState([]);
//     const [filterAfterCountry, setFilterAfterCountry] = useState([]);
//     const [filterAfterCity, setFilterAfterCity] = useState([]);

//     if (!(user.rol == "coordinador" || user.rol == "observador")) {
//         return <Redirect to="/home" />;
//     }

//     useEffect(() => {
//         dispatch(getNegotiations());
//         dispatch(getUsers());
//     }, []);

//     useEffect(() => {
//         applyFilter(filter.current);
//     }, [negotiations]);

//     const applyFilter = filter => {
//         let list = [...negotiations];

//         // Filter by status
//         list = list.filter(
//             item =>
//                 "status" in filter &&
//                 !(
//                     (filter.status["finished"] === false &&
//                         item.iniciar_produccion === 1) ||
//                     (filter.status["processing"] === false &&
//                         item.iniciar_produccion === 0)
//                 )
//         );
//         setFilterAfterStatus(list);

//         // Filter by tasks
//         list = list.filter(
//             item => !("task" in filter && !filter.task[item.tarea.nombre])
//         );
//         setFilterAfterTask(list);

//         // Filter by users
//         list = list.filter(
//             item => !("user" in filter && !filter.user[item.usuario.name])
//         );
//         setFilterAfterUser(list);

//         // Filter by country
//         list = list.filter(
//             item =>
//                 !("country" in filter && !filter.country[item.proveedor.pais])
//         );
//         setFilterAfterCountry(list);

//         // Filter by city
//         list = list.filter(
//             item => !("city" in filter && !filter.city[item.proveedor.ciudad])
//         );
//         setFilterAfterCity(list);

//         // Filter by district
//         list = list.filter(
//             item =>
//                 !(
//                     "district" in filter &&
//                     !filter.district[item.proveedor.distrito]
//                 )
//         );

//         setFiltered(list);
//     };

//     const tasks = new Set();
//     filterAfterStatus.forEach(item => tasks.add(item.tarea.nombre));

//     let filteredUsers = new Set();
//     filterAfterTask.forEach(item => filteredUsers.add(item.usuario.name));
//     filteredUsers = [...filteredUsers].sort();

//     const countries = new Set();
//     filterAfterUser.forEach(item => countries.add(item.proveedor.pais));

//     const cities = new Set();
//     filterAfterCountry.forEach(item => cities.add(item.proveedor.ciudad));

//     const districts = new Set();
//     filterAfterCity.forEach(item => districts.add(item.proveedor.distrito));

//     const countByStatusProcessing = () => {
//         return negotiations.filter(item => item.iniciar_produccion === 0)
//             .length;
//     };

//     const countByStatusFinished = () => {
//         return negotiations.filter(item => item.iniciar_produccion === 1)
//             .length;
//     };

//     const countByTask = taskName => {
//         return filterAfterStatus.filter(item => item.tarea.nombre === taskName)
//             .length;
//     };

//     const countByUserId = name => {
//         return filterAfterTask.filter(item => item.usuario.name === name)
//             .length;
//     };

//     const countByCountry = country => {
//         let count = 0;
//         filterAfterUser.forEach(item => {
//             if (item.proveedor.pais === country) {
//                 count++;
//             }
//         });

//         return count;
//     };

//     const countByCity = city => {
//         let count = 0;
//         filterAfterCountry.forEach(item => {
//             if (item.proveedor.ciudad === city) {
//                 count++;
//             }
//         });

//         return count;
//     };

//     const countByDistrict = district => {
//         let count = 0;
//         filterAfterCity.forEach(item => {
//             if (item.proveedor.distrito === district) {
//                 count++;
//             }
//         });

//         return count;
//     };

//     const finishedCount = countByStatusFinished();

//     const completedNegotiations = filtered.filter(item =>
//         isNegotiationCompleted(item)
//     );

//     const negotiationsWithoutPurchase = filtered.filter(
//         item => !item.compra_po
//     );

//     const negotiationsInProgress = filtered.filter(
//         item =>
//             !(item.iniciar_produccion === 1 && item.iniciar_arte === 1) &&
//             item.compra_po
//     );

//     const filterConfig = [
//         {
//             name: "status",
//             type: "checkbox",
//             label: "Estado :",
//             values: [
//                 {
//                     id: "processing",
//                     label: "En proceso",

//                     filter: item => item.iniciar_produccion === 0,
//                     header: "Negociaciones en progreso:",
//                     populator: item => {
//                         return (
//                             <NegotiationCard key={item.id} negotiation={item} />
//                         );
//                     }
//                 },
//                 {
//                     id: "completed",
//                     label: "Completadas",

//                     filter: item => item.iniciar_produccion === 1,
//                     header: "Negociaciones completadas:",
//                     populator: item => {
//                         return (
//                             <NegotiationCard key={item.id} negotiation={item} />
//                         );
//                     }
//                 }
//             ]
//         },
//         {
//             name: "task",
//             type: "checkbox",
//             label: "Tarea :",
//             values: item => item.tarea.nombre,
//             filter: (item, filters) => {
//                 return filters.task[item.tarea.nombre];
//             }
//         },
//         {
//             name: "user",
//             type: "checkbox",
//             label: "Usuario :",
//             values: item => item.usuario.name,
//             filter: (item, filters) => filters.user[item.usuario.name]
//         },
//         {
//             name: "country",
//             type: "checkbox",
//             label: "País :",
//             values: item => item.proveedor.pais,
//             filter: (item, filters) => filters.country[item.proveedor.pais]
//         },
//         {
//             name: "city",
//             type: "checkbox",
//             label: "Ciudad :",
//             values: item => item.proveedor.ciudad,
//             filter: (item, filters) => filters.city[item.proveedor.ciudad]
//         },
//         {
//             name: "district",
//             type: "checkbox",
//             label: "Distrito :",
//             values: item => item.proveedor.distrito,
//             filter: (item, filters) => filters.district[item.proveedor.distrito]
//         }
//     ];

//     return (
//         <React.Fragment>
//             <GenericFilter
//                 config={filterConfig}
//                 unfilteredData={negotiations}
//             />
//             <hr></hr>

//             <h1 className="text-center my-5">Negociaciones</h1>
//             <div className="mb-5">
//                 <Filter onUpdate={applyFilter} useRef={filter}>
//                     {
//                         <div className="px-3 row">
//                             <FilterGroup name="status" text="Estado :">
//                                 <CheckboxFilter
//                                     key={1}
//                                     id="processing"
//                                     text={`En proceso (${countByStatusProcessing()})`}
//                                 />
//                                 <CheckboxFilter
//                                     key={2}
//                                     id="finished"
//                                     text={`Completadas (${countByStatusFinished()})`}
//                                 />
//                             </FilterGroup>
//                         </div>
//                     }
//                     {tasks.size > 0 && (
//                         <div className="px-3 row">
//                             <FilterGroup name="task" text="Tarea :">
//                                 {[...tasks].map(task => {
//                                     return (
//                                         <CheckboxFilter
//                                             key={task}
//                                             id={task}
//                                             text={`${task} (${countByTask(
//                                                 task
//                                             )})`}
//                                         />
//                                     );
//                                 })}
//                             </FilterGroup>
//                         </div>
//                     )}
//                     {filteredUsers.length > 0 && (
//                         <div className="px-3 row">
//                             <FilterGroup name="user" text="Usuario :">
//                                 {filteredUsers.map(user => {
//                                     const count = countByUserId(user);

//                                     return (
//                                         <CheckboxFilter
//                                             key={user}
//                                             id={user}
//                                             text={`${user} (${count})`}
//                                         />
//                                     );
//                                 })}
//                             </FilterGroup>
//                         </div>
//                     )}
//                     {countries.size > 0 && (
//                         <div className="px-3 row">
//                             <FilterGroup name="country" text="País :">
//                                 {[...countries].map(item => {
//                                     return (
//                                         <CheckboxFilter
//                                             key={item}
//                                             id={item}
//                                             text={`${item} (${countByCountry(
//                                                 item
//                                             )})`}
//                                         />
//                                     );
//                                 })}
//                             </FilterGroup>
//                         </div>
//                     )}
//                     {cities.size > 0 && (
//                         <div className="px-3 row">
//                             <FilterGroup name="city" text="Ciudad :">
//                                 {[...cities].map(item => {
//                                     return (
//                                         <CheckboxFilter
//                                             key={item}
//                                             id={item}
//                                             text={`${item} (${countByCity(
//                                                 item
//                                             )})`}
//                                         />
//                                     );
//                                 })}
//                             </FilterGroup>
//                         </div>
//                     )}

//                     {districts.size > 0 && (
//                         <div className="px-3 row">
//                             <FilterGroup name="district" text="Distrito :">
//                                 {[...districts].map(item => {
//                                     return (
//                                         <CheckboxFilter
//                                             key={item}
//                                             id={item}
//                                             text={`${item} (${countByDistrict(
//                                                 item
//                                             )})`}
//                                         />
//                                     );
//                                 })}
//                             </FilterGroup>
//                         </div>
//                     )}
//                 </Filter>
//             </div>

//             {filtered.length > 0 ? (
//                 <React.Fragment>
//                     {negotiationsInProgress.length > 0 && (
//                         <React.Fragment>
//                             <h2 className="mt-4 h3">
//                                 Negociaciones en progreso:
//                             </h2>
//                             <hr className="mb-4" />
//                             <div className="d-flex flex-column-reverse">
//                                 {negotiationsInProgress.map(negotiation => {
//                                     return (
//                                         <NegotiationCard
//                                             key={negotiation.id}
//                                             negotiation={negotiation}
//                                         />
//                                     );
//                                 })}
//                             </div>
//                         </React.Fragment>
//                     )}

//                     {negotiationsWithoutPurchase.length > 0 && (
//                         <React.Fragment>
//                             <h2 className="mt-4 h3">
//                                 Negociaciones sin orden de compra o productos:
//                             </h2>
//                             <hr className="mb-4" />
//                             <div className="d-flex flex-column-reverse">
//                                 {negotiationsWithoutPurchase.map(
//                                     negotiation => {
//                                         return (
//                                             <NegotiationCard
//                                                 key={negotiation.id}
//                                                 negotiation={negotiation}
//                                             />
//                                         );
//                                     }
//                                 )}
//                             </div>
//                         </React.Fragment>
//                     )}

//                     {completedNegotiations.length > 0 && (
//                         <React.Fragment>
//                             <h2 className="mt-4 h3">
//                                 Negociaciones finalizadas :
//                             </h2>
//                             <hr className="mb-4" />
//                             <div className="d-flex flex-column-reverse">
//                                 {completedNegotiations.map(negotiation => {
//                                     return (
//                                         <NegotiationCard
//                                             key={negotiation.id}
//                                             negotiation={negotiation}
//                                         />
//                                     );
//                                 })}
//                             </div>
//                         </React.Fragment>
//                     )}
//                 </React.Fragment>
//             ) : (
//                 <EmptyList />
//             )}
//         </React.Fragment>
//     );
// };

// export default NegotiationList;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { getNegotiations } from "../../store/actions/negotiationActions";
import { getUsers } from "../../store/actions/userActions";
import GenericFilter from "../Filters/GenericFilter";
import NegotiationCard from "./NegotiationCard";
import LoadingScreen from "../Navigation/LoadingScreen";
import { Helmet } from "react-helmet-async";
import ProductsResume from "../Widgets/ProductsResume";

const isNegotiationInProgress = negotiation => {
    return !negotiation.seleccionado;
};

const isNegotiationSelected = negotiation => {
    return negotiation.seleccionado && !isNegotiationCompleted(negotiation);
};

const isNegotiationCompleted = negotiation => {
    return negotiation.iniciar_produccion && negotiation.iniciar_arte;
};

const NegotiationList = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const user = useSelector(state => state.auth.user);
    // @ts-ignore
    const negotiations = useSelector(state => state.negotiation.negotiations);
    // @ts-ignore
    const isLoadingList = useSelector(state => state.negotiation.isLoadingList);
    const [filteredNegotiations, setFilteredNegotiations] = useState([]);

    // const [compare, setCompare] = useState(false);
    // const [selectedNegotiations, setSelectedNegotiations] = useState([]);
    // const [results, setResults] = useState([]);

    if (
        !(
            user.rol == "coordinador" ||
            user.rol == "observador" ||
            user.rol == "comprador"
        )
    ) {
        return <Redirect to="/home" />;
    }

    useEffect(() => {
        dispatch(getNegotiations());
        dispatch(getUsers());
    }, []);

    // const toggleCheckbox = id => {
    //     const newSelected = [...selectedNegotiations];

    //     if (newSelected.includes(id)) {
    //         newSelected.splice(selectedNegotiations.indexOf(id), 1);
    //     } else {
    //         newSelected.push(id);
    //     }
    //     setSelectedNegotiations(newSelected);
    // };

    // const handleCompare = () => {
    //     const value = !compare;

    //     if (!value) {
    //         // setResults([]);
    //         setSelectedNegotiations([]);
    //     }

    //     setCompare(value);
    // };

    const history = useHistory();

    // const handleShowResults = () => {
    //     // @ts-ignore
    //     // const params = new URLSearchParams({
    //     //     negotiations: selectedNegotiations
    //     // });

    //     let params = "";
    //     selectedNegotiations.forEach(param => {
    //         params += `id=${param}&`;
    //     });

    //     history.push(`/negotiations/comparator?${params.toString()}`);
    //     // setResults(
    //     //     selectedNegotiations.map(id =>
    //     //         negotiations.find(item => item.id == id)
    //     //     )
    //     // );
    // };

    const filterConfig = [
        {
            name: "status",
            type: "checkbox",
            label: "Estado",
            values: [
                {
                    id: "processing",
                    label: "En comparación",
                    filter: (item, filters) =>
                        !(
                            filters["status"]["processing"] === false &&
                            isNegotiationInProgress(item)
                        ),
                    filterPopulator: item => isNegotiationInProgress(item)
                },
                {
                    id: "selected",
                    label: "Seleccionadas",
                    defaultValue: true,

                    filter: (item, filters) =>
                        !(
                            filters["status"]["selected"] === false &&
                            isNegotiationSelected(item)
                        ),
                    filterPopulator: item => isNegotiationSelected(item)
                },
                {
                    id: "completed",
                    label: "Completadas",
                    defaultValue: false,

                    filter: (item, filters) =>
                        !(
                            filters["status"]["completed"] === false &&
                            isNegotiationCompleted(item)
                        ),
                    filterPopulator: item => isNegotiationCompleted(item)
                }
            ]
        },
        {
            name: "task",
            type: "checkbox",
            label: "Tarea",
            useAccordion: true,
            values: item => item.tarea.nombre,
            filter: (item, filters) => filters.task[item.tarea.nombre],
            counterFilter: (item, id) => item.tarea.nombre === id
        },
        {
            name: "user",
            type: "checkbox",
            label: "Usuario",
            useAccordion: true,
            values: item => item.usuario.name,
            filter: (item, filters) => filters.user[item.usuario.name],
            counterFilter: (item, id) => item.usuario.name === id
        },
        {
            name: "country",
            type: "checkbox",
            label: "País",
            useAccordion: true,
            values: item => item.proveedor.pais,
            filter: (item, filters) => filters.country[item.proveedor.pais],
            counterFilter: (item, id) => item.proveedor.pais === id
        },
        {
            name: "city",
            type: "checkbox",
            label: "Ciudad",
            useAccordion: true,
            values: item => item.proveedor.ciudad,
            filter: (item, filters) => filters.city[item.proveedor.ciudad],
            counterFilter: (item, id) => item.proveedor.ciudad === id
        },
        {
            name: "district",
            type: "checkbox",
            label: "Distrito",
            useAccordion: true,
            values: item => item.proveedor.distrito,
            filter: (item, filters) =>
                filters.district[item.proveedor.distrito],
            counterFilter: (item, id) => item.proveedor.distrito === id
        }
    ];

    const localNegotiationCard = item => (
        <NegotiationCard key={item.id} negotiation={item} />
    );

    const populatorConfig = [
        {
            header: "En proceso de comparación",
            filterPopulator: item => isNegotiationInProgress(item),
            populator: item => {
                return localNegotiationCard(item);
                // return (
                //     <NegotiationCard
                //         key={item.id}
                //         negotiation={item}
                //         {...{ toggleCheckbox, selectedNegotiations, compare }}
                //     />
                // );
            }
        },
        {
            header: "Seleccionadas",
            filterPopulator: item => isNegotiationSelected(item),
            populator: item => {
                return localNegotiationCard(item);
                // return (
                //     <NegotiationCard
                //         key={item.id}
                //         negotiation={item}
                //         {...{ toggleCheckbox, selectedNegotiations, compare }}
                //     />
                // );
            }
        },
        {
            header: "Completadas",
            filterPopulator: item => isNegotiationCompleted(item),
            populator: item => {
                return localNegotiationCard(item);
                // return (
                //     <NegotiationCard
                //         key={item.id}
                //         negotiation={item}
                //         {...{ toggleCheckbox, selectedNegotiations, compare }}
                //     />
                // );
            }
        }
    ];

    const helmet = (
        <Helmet>
            <title>{`Negociaciones - ${process.env.MIX_APP_NAME}`}</title>
        </Helmet>
    );

    if (isLoadingList) {
        return <LoadingScreen>{helmet}</LoadingScreen>;
    }

    return (
        <React.Fragment>
            {helmet}
            <h1 className="text-center my-5">Negociaciones</h1>
            <div className="mb-5"></div>
            <GenericFilter
                config={filterConfig}
                unfilteredData={negotiations}
                populatorConfig={populatorConfig}
                setFilteredList={setFilteredNegotiations}
            >
                {filteredNegotiations.length > 0 && (
                    <React.Fragment>
                        <h2 className="mt-4 h3">Resumen:</h2>

                        <ProductsResume
                            negotiation={filteredNegotiations}
                            useCard={true}
                        />

                        {/* {filteredNegotiations.length > 1 && (
                            <div className="mb-5">
                                <h2 className="mt-5 h3">Comparación:</h2>

                                <button
                                    className="btn btn-primary"
                                    onClick={handleCompare}
                                >
                                    {compare ? (
                                        <React.Fragment>
                                            <TiCancel className="icon-normal mr-2" />
                                            Cancelar
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <GoGitCompare className="icon-normal mr-2" />
                                            Comenzar a Comparar
                                        </React.Fragment>
                                    )}
                                </button>

                                {compare && (
                                    <button
                                        className="btn btn-success"
                                        disabled={
                                            selectedNegotiations.length < 2
                                        }
                                        onClick={handleShowResults}
                                    >
                                        <BsCardList className="icon-normal mr-2" />
                                        Aceptar
                                    </button>
                                )}
                            </div>
                        )} */}
                    </React.Fragment>
                )}
            </GenericFilter>
        </React.Fragment>
    );
};

export default NegotiationList;
