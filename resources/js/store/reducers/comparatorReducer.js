import { resize } from "../../utils";

const defaultState = {
    task: null,

    comparisions: [],
    negotiations: [],
    products: []
};

const comparatorReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    if (type === "GET_TASK_FOR_COMPARISION_SUCCESS") {
        // Convertir el string de comparaciones en un objeto
        const comparaciones = payload.comparaciones;

        // Es necesario redimensionar los arreglos en caso de que una empresa sea agregada
        const negotiationCount = payload.negociaciones.length;
        comparaciones.forEach(comparacion => {
            comparacion.productIds = resize(
                comparacion.productIds,
                negotiationCount,
                []
            );

            // Se debe redimensionar el arreglo de columnas de cda comparacion
            comparacion.rows.forEach(row => {
                row.columns = resize(row.columns, negotiationCount, []);
            });
        });

        // Obtener un arreglo de todos los productos de las negociaciones filtradas
        const products = payload.negociaciones
            .map(item => item.productos)
            .flat();

        const newTask = {
            ...payload
        };

        return {
            ...state,
            task: JSON.parse(JSON.stringify(newTask)),
            products
        };
    }

    if (type === "ADD_NEGOTIATION_COMPARATOR") {
        return {
            ...state,
            task: {
                ...state.task,
                comparaciones: [...state.task.comparaciones, payload]
            }
            //comparisions: [...state.comparisions, payload]
        };
    }

    if (type === "UPDATE_COMPARISION_ROWS") {
        const newTask = {
            ...state.task,
            comparaciones: state.task.comparaciones.map(item =>
                item.id === payload.id ? { ...item, ...payload } : item
            )
        };

        return {
            ...state,
            task: newTask
        };
    }

    if (type === "DELETE_NEGOTIATION_COMPARATOR") {
        const newTask = {
            ...state.task,
            comparaciones: state.task.comparaciones.filter(
                item => item.id != payload
            )
        };

        return {
            ...state,
            task: newTask
        };
    }

    if (type === "EDIT_NEGOTIATION_COMPARATOR") {
        const newTask = {
            ...state.task,
            comparaciones: state.task.comparaciones.map(item =>
                item.id === payload.id ? payload : item
            )
        };

        return {
            ...state,
            task: newTask
        };
    }

    if (type === "CHANGE_HISTORY") {
        return {
            ...state,
            task: null
        };
    }

    if (type === "UPDATE_COMPARATOR_CELL") {
        const newTask = {
            ...state.task
        };

        newTask.comparaciones[payload.comparisonIndex].rows[
            payload.rowIndex
        ].columns[payload.columnIndex][payload.cellIndex] = payload.data;

        return {
            ...state,
            task: newTask
        };
    }

    return state;
};

export default comparatorReducer;
