import React from "react";
import ProductsTab from "../Products/ProductsTab";
import ProviderTab from "../Providers/ProviderTab";
import PurchaseTab from "../Purchases/PurchaseTab";
import TaskTab from "../Tasks/TaskTab";
import TabButton from "../UI/TabButton";
import TabContent from "../UI/TabContent";
import Tabs from "../UI/Tabs";

const ProductionModal = ({ production }) => {
    const {
        pivot: { tarea: task, proveedor: provider, usuario }
    } = production;

    const { pivot: negotiation } = production;

    return (
        <React.Fragment>
            <div className="modal-body">
                <React.Fragment>
                    <Tabs defaultTab="task">
                        <ul
                            className="nav nav-pills nav-pills-success nav-pills-icons justify-content-center"
                            role="tablist"
                        >
                            <TabButton name="task">
                                <i className="material-icons">task</i>
                                Tarea
                            </TabButton>

                            <TabButton name="business">
                                <i className="material-icons">business</i>
                                Proveedor
                            </TabButton>

                            <TabButton name="products">
                                <i className="material-icons">inventory_2</i>
                                Productos
                            </TabButton>

                            <TabButton name="purchase">
                                <i className="material-icons">receipt_long</i>
                                Compras
                            </TabButton>
                        </ul>

                        <div className="tab-content tab-space p-2">
                            <TabContent name="task">
                                <TaskTab task={task} user={usuario} />
                            </TabContent>
                            <TabContent name="business">
                                <ProviderTab provider={provider} />
                            </TabContent>
                            <TabContent name="products">
                                <ProductsTab negotiation={negotiation} />
                            </TabContent>
                            <TabContent name="purchase">
                                <PurchaseTab negotiation={negotiation} />
                            </TabContent>
                        </div>
                    </Tabs>
                </React.Fragment>
            </div>
        </React.Fragment>
    );
};

export default ProductionModal;
