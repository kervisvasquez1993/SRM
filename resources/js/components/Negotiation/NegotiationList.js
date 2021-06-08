import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNegotiations } from "../../store/actions/negotiationActions";
import { getUsers } from "../../store/actions/userActions";
import CheckboxFilter from "../Filters/CheckboxFilter";
import Filter from "../Filters/Filter";
import FilterGroup from "../Filters/FilterGroup";
import EmptyList from "../Navigation/EmptyList";
import NegotiationCard from "./NegotiationCard";

const NegotiationList = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const users = useSelector(state => state.user.users);
    const negotiations = useSelector(state => state.negotiation.negotiations);

    const filter = useRef(null);
    const [filtered, setFiltered] = useState([...negotiations]);

    useEffect(() => {
        dispatch(getNegotiations());
        dispatch(getUsers());
    }, []);

    const applyFilter = filter => {
        let newTasks = negotiations.filter(negotiation => {
            let render = true;

            if ("user" in filter && !filter.user[negotiation.usuario.id]) {
                render = false;
            }

            if (
                "country" in filter &&
                !filter.country[negotiation.proveedor.pais]
            ) {
                render = false;
            }

            if (
                "city" in filter &&
                !filter.city[negotiation.proveedor.ciudad]
            ) {
                render = false;
            }

            return render;
        });

        setFiltered(newTasks);
    };

    const countByUserId = id => {
        return negotiations.filter(negotiation => negotiation.usuario.id === id)
            .length;
    };

    const countByCountry = country => {
        let count = 0;
        negotiations.forEach(negotiation => {
            if (negotiation.proveedor.pais === country) {
                count++;
            }
        });

        return count;
    };

    const countByCity = city => {
        let count = 0;
        negotiations.forEach(negotiation => {
            if (negotiation.proveedor.ciudad === city) {
                count++;
            }
        });

        return count;
    };

    const countries = new Set();
    negotiations.forEach(item => {
        countries.add(item.proveedor.pais);
    });

    const cities = new Set();
    if (filter.current != null) {
        negotiations.forEach(item => {
            if (
                "country" in filter.current &&
                !filter.current.country[item.proveedor.pais]
            ) {
                return;
            }

            cities.add(item.proveedor.ciudad);
        });
    }

    return (
        <React.Fragment>
            <h1 className="text-center my-5">Negociaciones</h1>

            {negotiations.length > 0 ? (
                <React.Fragment>
                    <div className="mb-3">
                        <Filter onUpdate={applyFilter} useRef={filter}>
                            <div className="px-3 row">
                                <FilterGroup name="user" text="Usuario :">
                                    {users.map((user, index) => {
                                        const count = countByUserId(user.id);

                                        if (count === 0) {
                                            return;
                                        }

                                        return (
                                            <CheckboxFilter
                                                key={index}
                                                id={user.id}
                                                text={`${user.name} (${count})`}
                                            />
                                        );
                                    })}
                                </FilterGroup>
                            </div>
                            <div className="px-3 row">
                                <FilterGroup name="country" text="País :">
                                    {[...countries].map((item, index) => {
                                        return (
                                            <CheckboxFilter
                                                key={index}
                                                id={item}
                                                text={`${item} (${countByCountry(
                                                    item
                                                )})`}
                                            />
                                        );
                                    })}
                                </FilterGroup>
                            </div>
                            <div className="px-3 row">
                                <FilterGroup name="city" text="Ciudad :">
                                    {[...cities].map((item, index) => {
                                        return (
                                            <CheckboxFilter
                                                key={index}
                                                id={item}
                                                text={`${item} (${countByCity(
                                                    item
                                                )})`}
                                            />
                                        );
                                    })}
                                </FilterGroup>
                            </div>
                        </Filter>
                    </div>

                    <div className="d-flex flex-column-reverse">
                        {filtered.map(negotiation => {
                            return (
                                <NegotiationCard
                                    key={negotiation.id}
                                    negotiation={negotiation}
                                />
                            );
                        })}
                    </div>
                </React.Fragment>
            ) : (
                <EmptyList />
            )}
        </React.Fragment>
    );
};

export default NegotiationList;
