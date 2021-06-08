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
        const newTasks = negotiations.filter(negotiation => {
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
        })

        return count;
    };

    const countries = new Set();
    negotiations.forEach(item => {
        countries.add(item.proveedor.pais);
    });

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
                                <FilterGroup name="country" text="Pais :">
                                    {[...countries].map((country, index) => {
                                        return (
                                            <CheckboxFilter
                                                key={index}
                                                id={country}
                                                text={`${country} (${countByCountry(country)})`}
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
