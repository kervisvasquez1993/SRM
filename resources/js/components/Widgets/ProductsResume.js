import React from "react";
import SmallCard from "./SmallCard";

import { BiCubeAlt } from "react-icons/bi";
import { FaWeightHanging } from "react-icons/fa";
import { GiCardboardBox, GiWeight } from "react-icons/gi";
import { getSum, roundMoneyAmount } from "../../utils";

const ProductsResume = ({
    products = [],
    negotiation = null,
    useCard = false
}) => {
    const listToUse = negotiation || products;

    const total_usd = getSum(listToUse, "total_usd");
    const total_ctn = getSum(listToUse, "total_ctn");
    const total_cbm = getSum(listToUse, "total_cbm");
    const total_n_w = getSum(listToUse, "total_n_w");
    const total_g_w = getSum(listToUse, "total_g_w");

    const content = (
        <div className="resume-card-body">
            <SmallCard
                label="Total USD"
                materialIcon="account_balance_wallet"
                backgroundClass="bg-success"
            >
                {roundMoneyAmount(total_usd)}
            </SmallCard>

            <SmallCard
                label="Total CTN"
                icon={<GiCardboardBox className="icon-normal" />}
                backgroundClass="bg-primary"
            >
                {Math.ceil(total_ctn)}
            </SmallCard>

            <SmallCard
                label="Total CBM"
                icon={<BiCubeAlt className="icon-normal" />}
                backgroundClass="bg-info"
            >
                {roundMoneyAmount(total_cbm)}
            </SmallCard>

            <SmallCard
                label="Total N.W. (kg)"
                icon={<FaWeightHanging className="icon-normal" />}
                backgroundClass="bg-secondary"
            >
                {roundMoneyAmount(total_n_w)}
            </SmallCard>

            <SmallCard
                label="Total G.W. (kg)"
                icon={<GiWeight className="icon-normal" />}
                backgroundClass="bg-danger"
            >
                {roundMoneyAmount(total_g_w)}
            </SmallCard>
        </div>
    );

    return (
        <React.Fragment>
            {((negotiation != null && negotiation.length > 0) ||
                products.length > 0) &&
                (useCard ? (
                    <div className="card py-4 px-3 px-md-5">{content}</div>
                ) : (
                    <div className="pb-5 pt-0 w-100">{content}</div>
                ))}
        </React.Fragment>
    );
};

export default ProductsResume;
