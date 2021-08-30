import { resize } from "../../utils";

const defaultState = {
    // task: null,

    comparisons: [],
    areComparisonsLoading: true,

    products: [],
    areProductsLoading: true,

    suppliers: [],
    areSuppliersLoading: true
    // negotiations: [],
    // products: [],
};

const comparatorReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    if (type === "CHANGE_HISTORY") {
        return {
            ...state,
            comparisons: [],
            areComparisonsLoading: true,

            products: [],
            areProductsLoading: true,

            suppliers: [],
            areSuppliersLoading: true
            //task: null
        };
    }

    if (type === "GET_PRODUCT_LIST_SUCCESS") {
        return {
            ...state,
            products: payload,
            areProductsLoading: false
        };
    }

    if (type === "GET_COMPARISION_LIST_SUCCESS") {
        const comparisons = payload.map(item => {
            return { ...item, state: [] };
        });

        return {
            ...state,
            comparisons,
            areComparisonsLoading: false
        };
    }

    if (type === "GET_SUPPLIER_LIST_SUCCESS") {
        return {
            ...state,
            suppliers: payload,
            areSuppliersLoading: false
        };
    }

    if (type === "ADD_COMPARATOR_SUCCESS") {
        return {
            ...state,
            comparisons: [...state.comparisons, { ...payload, state: [] }]
        };
    }

    if (type === "UPDATE_COMPARATOR_SUCCESS") {
        return {
            ...state,
            comparisons: state.comparisons.map(item =>
                item.id === payload.id ? payload : item
            )
        };
    }

    if (type === "DELETE_COMPARATOR_REQUEST") {
        return {
            ...state,
            comparisons: state.comparisons.filter(item => item.id != payload.id)
        };
    }

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

    if (type === "DELETE_COMPARATOR_CELL") {
        const newTask = {
            ...state.task
        };

        // Informacion que se necesitara
        const comparacion = newTask.comparaciones[payload.comparisonIndex];
        newTask.comparaciones[payload.comparisonIndex];
        const array =
            comparacion.rows[payload.rowIndex].columns[payload.columnIndex];

        // Informacion de la celda
        const data = array[payload.cellIndex];
        const productId = data.id;

        // Primero se debe eliminar la celda
        array.splice(payload.cellIndex, 1);

        // Ahora se debe eliminar el id de la lista de productos
        comparacion.productIds[payload.columnIndex] = comparacion.productIds[
            payload.columnIndex
        ].filter(item => item != productId);

        return {
            ...state,
            task: newTask
        };
    }

    return state;
};

export default comparatorReducer;
