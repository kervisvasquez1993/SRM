import React from "react";
import SmallCard from "./SmallCard";

import { BiCubeAlt } from "react-icons/bi";
import { FaWeightHanging } from "react-icons/fa";
import { GiCardboardBox, GiWeight } from "react-icons/gi";
import { MdAttachMoney } from "react-icons/md";
import { getSum } from "../../utils";

const NegotiationResume = ({negotiations}) => {
    const total_cbm = getSum(negotiations, "total_cbm");
    const total_n_w = getSum(negotiations, "total_n_w");
    const total_g_w = getSum(negotiations, "total_g_w");
    const total_ctn = getSum(negotiations, "total_ctn");
    const compras_total = getSum(negotiations, "compras_total");

    return (
        <div className="card py-4 px-2 px-md-5">
            <div className="card-body">
                <div className="row">
                    <SmallCard
                        label="Total CBM"
                        icon={<BiCubeAlt className="icon-normal" />}
                        backgroundClass="bg-info"
                    >
                        {total_cbm}
                    </SmallCard>

                    <SmallCard
                        label="Total Peso Neto (kg)"
                        icon={<FaWeightHanging className="icon-normal" />}
                        backgroundClass="bg-secondary"
                    >
                        {total_n_w}
                    </SmallCard>

                    <SmallCard
                        label="Total Peso Bruto (kg)"
                        icon={<GiWeight className="icon-normal" />}
                        backgroundClass="bg-secondary"
                    >
                        {total_g_w}
                    </SmallCard>

                    <SmallCard
                        label="Total CTN"
                        icon={<GiCardboardBox className="icon-normal" />}
                        backgroundClass="bg-primary"
                    >
                        {total_ctn}
                    </SmallCard>
                    <SmallCard
                        label="Total a Pagar"
                        icon={<MdAttachMoney className="icon-normal" />}
                    >
                        {compras_total}
                    </SmallCard>
                </div>
            </div>
        </div>
    );
};

export default NegotiationResume;
