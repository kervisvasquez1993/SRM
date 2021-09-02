import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { FaFileImport } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";
import {
    getComparisons,
    getProducts,
    getSuppliers
} from "../../store/actions/comparatorActions";
import { openModal } from "../../store/actions/modalActions";
import { apiURL } from "../App";
import LoadingScreen from "../Navigation/LoadingScreen";
import ComparatorTable from "./ComparatorTable";
import IncidentsTab from "../Incidents/IncidentsTab";
import ComparisonFormModal from "./ComparisonFormModal";
import axios from "axios";
import { toast } from "react-toastify";

export default () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const { id: taskId } = useParams();

    // @ts-ignore
    // const task = useSelector(state => state.comparator.task);
    const comparisons = useSelector(state => state.comparator.comparisons);
    // @ts-ignore
    const areComparisonsLoading = useSelector(
        // @ts-ignore
        state => state.comparator.areComparisonsLoading
    );
    // @ts-ignore
    const products = useSelector(state => state.comparator.products);
    // @ts-ignore
    const areProductsLoading = useSelector(
        // @ts-ignore
        state => state.comparator.areProductsLoading
    );
    // @ts-ignore
    const suppliers = useSelector(state => state.comparator.suppliers);
    const areSuppliersLoading = useSelector(
        // @ts-ignore
        state => state.comparator.areSuppliersLoading
    );

    const helmet = (
        <Helmet>
            <title>{`Comparación de Empresas - ${process.env.MIX_APP_NAME}`}</title>
        </Helmet>
    );

    const handleExport = () => {
        const funcion = async () => {
            const response = await axios.get(
                `${apiURL}/tarea/${taskId}/exportar-comparativa`
            );
        };

        funcion();
        toast.info(
            "El archivo se está procesando. Esto puede llevar tiempo..."
        );
    };

    useEffect(() => {
        dispatch(getSuppliers(taskId));
        dispatch(getProducts(taskId));
    }, []);

    // Solo cargar las comparaciones cuando ya se han cargado los productos y los proveedores
    useEffect(() => {
        if (!areProductsLoading && !areSuppliersLoading) {
            dispatch(getComparisons(taskId));
        }
    }, [areProductsLoading, areSuppliersLoading]);

    // useEffect(() => {
    //     if (task) {
    //         try {
    //             axios.put(`${apiURL}/tarea/${task.id}`, task);
    //         } catch (error) {
    //             console.log("Couldn't upload new cells to the server");
    //         }
    //     }
    // }, [task]);

    const handleOpenModal = () => {
        dispatch(
            // openModal({
            //     title: "Agregar Comparación",
            //     body: (
            //         <AddComparisionModal
            //             comparison={{
            //                 id: v4(),
            //                 productName: "Ejemplo",
            //                 productIds: [],
            //                 rows: []
            //             }}
            //         />
            //     )
            // })
            openModal({
                title: "Agregar Comparación",
                body: (
                    <ComparisonFormModal
                        taskId={taskId}
                        comparison={{
                            nombre: "Ejemplo",
                            rows: []
                        }}
                    />
                )
            })
        );
    };

    if (areProductsLoading || areComparisonsLoading || areSuppliersLoading) {
        return <LoadingScreen>{helmet}</LoadingScreen>;
    }

    return (
        <React.Fragment>
            {helmet}

            {/* {comparisions.map((comparison, comparisonIndex) => {
                return (
                    <ComparatorTable
                        negotiations={task.negociaciones}
                        comparision={comparison}
                        comparisonIndex={comparisonIndex}
                        key={comparison.id}
                    />
                );
            })} */}

            {comparisons.map((comparison, comparisonIndex) => {
                return (
                    <ComparatorTable
                        comparison={comparison}
                        comparisonIndex={comparisonIndex}
                        key={comparison.id}
                    />
                );
            })}

            <div className="text-center">
                <button className="btn btn-success" onClick={handleOpenModal}>
                    <MdAddCircle className="mr-2" />
                    Agregar Comparación
                </button>

                <button className="btn btn-info" onClick={handleExport}>
                    <FaFileImport className="mr-2" />
                    Exportar Excel
                </button>
            </div>

            <hr className="my-2" />

            <IncidentsTab
                stateName="task"
                url1="tarea"
                url2="comentarios_comparacion"
                title="Comentarios"
                parentId={taskId}
            ></IncidentsTab>
        </React.Fragment>
    );
};
