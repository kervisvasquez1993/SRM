import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduction } from "../../store/actions/productionActions";
import LoadingScreen from "../Navigation/LoadingScreen";
import TabButton from "../UI/TabButton";
import TabContent from "../UI/TabContent";
import Tabs from "../UI/Tabs";
import PaymentsTab from "./Payments/PaymentsTab";
import ProductionEndTab from "./ProductionEnd/ProductionEndTab";
import ProductionStartTab from "./ProductionStart/ProductionStartTab";
import TransitTab from "./Transit/TransitTab";

const ProductionManagementModal = ({
    productionId,
    defaultTab = "payments"
}) => {
    const dispatch = useDispatch();
    const production = useSelector(state => state.production.current);

    useEffect(() => {
        dispatch(getProduction(productionId));
    }, []);

    if (!production) {
        return <LoadingScreen />;
    }

    return (
        <React.Fragment>
            <div className="modal-body">
                <React.Fragment>
                    <Tabs defaultTab={defaultTab}>
                        <ul
                            className="nav nav-pills nav-pills-success nav-pills-icons justify-content-center flex-column"
                            role="tablist"
                        >
                            <TabButton name="payments">
                                <i className="material-icons">receipt_long</i>
                                Pagos
                            </TabButton>

                            <TabButton name="inicio_produccion">
                                <i className="material-icons">receipt_long</i>
                                Inicio de Producción
                            </TabButton>

                            <TabButton name="fin_produccion">
                                <i className="material-icons">receipt_long</i>
                                Fin de Producción
                            </TabButton>

                            <TabButton name="incidencias_transito">
                                <i className="material-icons">receipt_long</i>
                                Transito Nacionalización
                            </TabButton>
                        </ul>

                        <div className="tab-content tab-space p-2">
                            <TabContent name="payments">
                                <PaymentsTab production={production} />
                            </TabContent>
                            <TabContent name="inicio_produccion">
                                <ProductionStartTab production={production} />
                            </TabContent>
                            <TabContent name="fin_produccion">
                                <ProductionEndTab production={production} />
                            </TabContent>
                            <TabContent name="incidencias_transito">
                                <TransitTab production={production} />
                            </TabContent>
                        </div>
                    </Tabs>
                </React.Fragment>
            </div>
        </React.Fragment>
    );
};

export default ProductionManagementModal;
