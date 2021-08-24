import React from "react";
import SmallCard from "./SmallCard";

import { BiCubeAlt } from "react-icons/bi";
import { FaWeightHanging } from "react-icons/fa";
import { GiCardboardBox, GiWeight } from "react-icons/gi";
import { MdAttachMoney } from "react-icons/md";
import {
    getPaymentInfoFromProductions,
    getSum,
    roundMoneyAmount
} from "../../utils";

const ProductionsResume = ({ productions }) => {
    const negotiations = productions.map(item => item.pivot);

    const total_cbm = getSum(negotiations, "total_cbm");
    const total_n_w = getSum(negotiations, "total_n_w");
    const total_g_w = getSum(negotiations, "total_g_w");
    const total_ctn = getSum(negotiations, "total_ctn");

    const {
        totalToPay,
        prepayment,
        prepaymentPercentage,
        remainingPayment,
        remainingPercentage
    } = getPaymentInfoFromProductions(productions);

    return (
        <React.Fragment>
            {negotiations.length > 0 && (
                <div className="card py-4 px-3 px-md-5">
                    <div className="resume-card-body resume-card-body-4">
                        <SmallCard
                            label="Total a Pagar"
                            materialIcon="account_balance_wallet"
                            backgroundClass="bg-success"
                        >
                            {totalToPay}
                        </SmallCard>

                        <SmallCard
                            label="Pago Anticipado"
                            materialIcon="savings"
                            backgroundClass="bg-info"
                        >
                            {prepayment > 0
                                ? `${prepayment} (${prepaymentPercentage} %)`
                                : 0}
                        </SmallCard>

                        <SmallCard
                            label="Pago Balance"
                            materialIcon="production_quantity_limits"
                            backgroundClass="bg-danger"
                        >
                            {remainingPayment} ({remainingPercentage}%)
                        </SmallCard>

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
                </div>
            )}
        </React.Fragment>
    );
};

export default ProductionsResume;
