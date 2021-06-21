import React from "react";
import { BiCubeAlt, BiLink } from "react-icons/bi";
import { FaWeightHanging } from "react-icons/fa";
import { GiCardboardBox, GiWeight } from "react-icons/gi";
import { Link } from "react-router-dom";
import { hasNoProducts, roundMoneyAmount } from "../../utils";
import EmptyList from "../Navigation/EmptyList";
import SmallCard from "../Widgets/SmallCard";

const ProductsTab = ({ negotiation }) => {
    const { total_cbm, total_n_w, total_g_w, total_ctn } = negotiation;

    return (
        <React.Fragment>
            {hasNoProducts(negotiation) ? (
                <EmptyList message="No hay productos registrados" />
            ) : (
                <div className="row px-2 mb-3">
                    <SmallCard
                        label="Total CBM"
                        icon={<BiCubeAlt className="icon-normal" />}
                        backgroundClass="bg-info"
                    >
                        {roundMoneyAmount(total_cbm)}
                    </SmallCard>

                    <SmallCard
                        label="Total Peso Neto (kg)"
                        icon={<FaWeightHanging className="icon-normal" />}
                        backgroundClass="bg-secondary"
                    >
                        {roundMoneyAmount(total_n_w)}
                    </SmallCard>

                    <SmallCard
                        label="Total Peso Bruto (kg)"
                        icon={<GiWeight className="icon-normal" />}
                        backgroundClass="bg-danger"
                    >
                        {roundMoneyAmount(total_g_w)}
                    </SmallCard>

                    <SmallCard
                        label="Total CTN"
                        icon={<GiCardboardBox className="icon-normal" />}
                        backgroundClass="bg-primary"
                    >
                        {roundMoneyAmount(total_ctn)}
                    </SmallCard>
                </div>
            )}
            <div className="text-center">
                <Link
                    to={`/negotiation/${negotiation.id}`}
                    className="btn btn-info btn-round"
                >
                    Ver Detalles
                    <BiLink className="icon-normal ml-2" />
                </Link>
            </div>
        </React.Fragment>
    );
};

export default ProductsTab;
