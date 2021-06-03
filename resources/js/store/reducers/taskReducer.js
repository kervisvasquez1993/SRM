const defaultState = {
    tasks: [],
    errors: {},
    isEditing: false,
    editedTask: null,
    task: null
};

const taskReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "GET_TASKS_REQUEST":
            return {
                ...state
            };
        case "GET_TASKS_SUCESS":
            return {
                ...state,
                tasks: payload
            };
        case "GET_TASKS_FAILURE":
            return {
                ...state
            };
        case "CREATE_TASK_REQUEST":
            return {
                ...state,
                isEditing: true
            };
        case "CREATE_TASK_SUCCESS":
            return {
                ...state,
                tasks: [...state.tasks, payload],
                errors: {},
                isEditing: false
            };
        case "CREATE_TASK_FAILURE":
            return {
                ...state,
                errors: action.errors,
                isEditing: false
            };
        case "CLOSE_MODAL":
            return {
                ...state,
                errors: {}
            };
        case "EDIT_TASK_REQUEST":
            return {
                ...state,
                isEditing: true
            };
        case "EDIT_TASK_SUCCESS":
            if (state.task) {
                return {
                    ...state,
                    task: payload,
                    errors: {},
                    isEditing: false
                };
            } else {
                const newTasks = state.tasks.map(task => {
                    if (task.id == payload.id) return payload;

                    return task;
                });
                return {
                    ...state,
                    tasks: newTasks,
                    errors: {},
                    isEditing: false,
                    editedTask: payload
                };
            }

        case "EDIT_TASK_FAILURE":
            return {
                ...state,
                errors: action.errors,
                isEditing: false
            };
        case "CHANGE_HISTORY":
            return {
                ...state,
                editedTask: null,
                task: null
            };
        case "GET_TASK_REQUEST":
            return {
                ...state
            };
        case "GET_TASK_SUCCESS":
            return {
                ...state,
                task: payload
            };
        case "GET_TASK_FAILURE":
            return {
                ...state
            };
        default:
            return state;
    }
};

export default taskReducer;
