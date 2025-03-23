import axios from 'axios';
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

// The base url for my django backend
const API_BASE_URL = 'http://localhost:8000/api';

// Fetch all tasks for the current user
export const fetchTasks = () => async (dispatch, getState) => {
    dispatch({
        type: FETCH_TASKS_REQUEST
    });

    try {
        const token = getState().auth.token;

        const response = await axios.get(`${API_BASE_URL}/tasks/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        // Ensures the payload is an array
        const tasksArray = Array.isArray(response.data) ? response.data :
            (response.data.results ? response.data.results : []);

        dispatch({
            type: FETCH_TASKS_SUCCESS,
            payload: tasksArray
        });

        return tasksArray;
    } catch (error) {

        const errorMessage = error.response?.data?.error ||
            error.response?.data?.detail ||
            error.message ||
            'Failed to fetch tasks';

        dispatch({
            type: FETCH_TASKS_FAILURE,
            payload: errorMessage
        });

        throw error;
    }
};


// Add a new task
export const addTask = (taskData) => async (dispatch, getState) => {
    dispatch({
        type: ADD_TASK_REQUEST
    });

    try {
        const token = getState().auth.token;

        const response = await axios.post(`${API_BASE_URL}/tasks/`, taskData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        dispatch({
            type: ADD_TASK_SUCCESS,
            payload: response.data
        });

        return response.data;
    } catch (error) {

        let errorMessage = 'Failed to create task';

        if (error.response) {

            if (error.response.data?.detail) {
                errorMessage = error.response.data.detail;
            } else if (error.response.data?.error) {
                errorMessage = error.response.data.error;
            } else if (typeof error.response.data === 'string') {
                errorMessage = error.response.data;
            } else if (typeof error.response.data === 'object') {
                // Format field errors
                errorMessage = Object.entries(error.response.data)
                    .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
                    .join('; ');
            }
        } else if (error.request) {
            errorMessage = 'No response from server';
        } else {
            errorMessage = error.message;
        }

        dispatch({
            type: ADD_TASK_FAILURE,
            payload: errorMessage
        });

        throw new Error(errorMessage);
    }
};

// Update an existing task
export const updateTask = (id, taskData) => async (dispatch, getState) => {
    dispatch({
        type: UPDATE_TASK_REQUEST
    });

    try {
        const token = getState().auth.token;

        const response = await axios.put(`${API_BASE_URL}/tasks/${id}/`, taskData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        dispatch({
            type: UPDATE_TASK_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: UPDATE_TASK_FAILURE,
            payload: error.response?.data?.error || error.response?.data?.detail || error.message
        });
    }
};

// Delete a task
export const deleteTask = (id) => async (dispatch, getState) => {
    dispatch({
        type: DELETE_TASK_REQUEST
    });

    try {
        const token = getState().auth.token;

        await axios.delete(`${API_BASE_URL}/tasks/${id}/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        dispatch({
            type: DELETE_TASK_SUCCESS,
            payload: id
        });
    } catch (error) {
        dispatch({
            type: DELETE_TASK_FAILURE,
            payload: error.response?.data?.error || error.response?.data?.detail || error.message
        });
    }
};

// Bulk update tasks
export const bulkUpdateTasks = (tasksData) => async (dispatch, getState) => {
    dispatch({
        type: UPDATE_TASK_REQUEST
    });

    try {
        const token = getState().auth.token;

        const response = await axios.put(`${API_BASE_URL}/tasks/bulk_update/`, tasksData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        dispatch({
            type: UPDATE_TASK_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: UPDATE_TASK_FAILURE,
            payload: error.response?.data?.error || error.response?.data?.detail || error.message
        });
    }
};

// Clear task errors
export const clearTaskErrors = () => ({
    type: CLEAR_TASK_ERRORS
});