import React from "react";
import SmallCard from "./SmallCard";

import { BiCubeAlt } from "react-icons/bi";
import { FaWeightHanging } from "react-icons/fa";
import { GiCardboardBox, GiWeight } from "react-icons/gi";
import { MdAttachMoney } from "react-icons/md";
import { getSum, roundMoneyAmount } from "../../utils";

const ProductsResume = ({ products = [], negotiation = null }) => {
    const total_cbm =
        (negotiation && negotiation.total_cbm) || getSum(products, "total_cbm");

    const total_n_w = getSum(products, "total_n_w");
    const total_g_w = getSum(products, "total_g_w");
    const total_ctn = getSum(products, "total_ctn");

    return (
        <React.Fragment>
            {(negotiation != null || products.length > 0) && (
                <div className="py-5 w-100">
                    <div className="resume-card-body">
                        <SmallCard
                            label="Total USD"
                            materialIcon="account_balance_wallet"
                            backgroundClass="bg-success"
                        >
                            {roundMoneyAmount(total_cbm)}
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
                </div>
            )}
        </React.Fragment>
    );
};

export default ProductsResume;
