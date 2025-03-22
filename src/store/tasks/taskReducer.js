// src/store/tasks/taskReducer.js
import {
    FETCH_TASKS_REQUEST,
    FETCH_TASKS_SUCCESS,
    FETCH_TASKS_FAILURE,
    ADD_TASK_REQUEST,
    ADD_TASK_SUCCESS,
    ADD_TASK_FAILURE,
    UPDATE_TASK_REQUEST,
    UPDATE_TASK_SUCCESS,
    UPDATE_TASK_FAILURE,
    DELETE_TASK_REQUEST,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_FAILURE,
    CLEAR_TASK_ERRORS
} from './taskTypes';

const initialState = {
    tasks: [],
    loading: false,
    error: null
};

export default function taskReducer(state = initialState, action) {
    console.log('Current state:', state);
    console.log('Action:', action);

    switch (action.type) {
        case FETCH_TASKS_REQUEST:
        case ADD_TASK_REQUEST:
        case UPDATE_TASK_REQUEST:
        case DELETE_TASK_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_TASKS_SUCCESS:
            return {
                ...state,
                loading: false,
                tasks: Array.isArray(action.payload) ? action.payload : [],
                error: null
            };
        case ADD_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                tasks: Array.isArray(state.tasks) ? [...state.tasks, action.payload] : [action.payload],
                error: null
            };
        case UPDATE_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                tasks: Array.isArray(state.tasks) ? state.tasks.map(task =>
                    task.id === action.payload.id ? action.payload : task
                ) : [],
                error: null
            };
        case DELETE_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                tasks: Array.isArray(state.tasks) ? state.tasks.filter(task => task.id !== action.payload) : [],
                error: null
            };
        case FETCH_TASKS_FAILURE:
        case ADD_TASK_FAILURE:
        case UPDATE_TASK_FAILURE:
        case DELETE_TASK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CLEAR_TASK_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}