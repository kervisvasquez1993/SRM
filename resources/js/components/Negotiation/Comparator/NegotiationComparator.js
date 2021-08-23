import axios from "axios";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { FaFileImport } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { v4 } from "uuid";
import { getTask } from "../../../store/actions/comparatorActions";
import { openModal } from "../../../store/actions/modalActions";
import { apiURL } from "../../App";
import LoadingScreen from "../../Navigation/LoadingScreen";
import AddComparisionModal from "./ComparisonFormModal";
import ComparatorTable from "./ComparatorTable";

// const colors = ["green", "blue", "red", "bg-warning", "table-dark"];

// const getColor = index => {
//     return colors[index];
// };

export default () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const { id: taskId } = useParams();

    // @ts-ignore
    const task = useSelector(state => state.comparator.task);

    // @ts-ignore
    // const comparisions = useSelector(state => state.comparator.comparisions);

    const helmet = (
        <Helmet>
            <title>{`Comparación de Empresas - ${process.env.MIX_APP_NAME}`}</title>
        </Helmet>
    );

    useEffect(() => {
        dispatch(getTask(taskId));
    }, []);

    useEffect(() => {
        if (task) {
            try {
                axios.put(`${apiURL}/tarea/${task.id}`, task);
            } catch (error) {
                console.log("Couldn't upload new cells to the server");
            }
        }
    }, [task]);

    const handleOpenModal = () => {
        dispatch(
            openModal({
                title: "Agregar Comparación",
                body: (
                    <AddComparisionModal
                        formData={{
                            id: v4(),
                            productName: "Ejemplo",
                            productIds: [],
                            rows: []
                        }}
                    />
                )
            })
        );
    };

    if (!task) {
        return <LoadingScreen>{helmet}</LoadingScreen>;
    }

    const comparisions = task.comparaciones;

    return (
        <React.Fragment>
            {helmet}

            {comparisions.map((comparison, comparisonIndex) => {
                return (
                    <ComparatorTable
                        negotiations={task.negociaciones}
                        comparision={comparison}
                        comparisonIndex={comparisonIndex}
                        key={comparison.id}
                    />
                );
            })}

            {comparisions.length > 0 && <hr className="my-5" />}

            <div className="text-center">
                <button className="btn btn-success" onClick={handleOpenModal}>
                    <MdAddCircle className="mr-2" />
                    Agregar Comparación
                </button>

                <a
                    href={`${apiURL}/tarea/${taskId}/exportar-comparativa`}
                    className="btn btn-info"
                >
                    <FaFileImport className="mr-2" />
                    Exportar Excel
                </a>
            </div>
        </React.Fragment>
    );
};
