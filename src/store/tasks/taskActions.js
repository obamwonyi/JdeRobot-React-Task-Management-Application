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

// The base url
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

        dispatch({
            type: FETCH_TASKS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: FETCH_TASKS_FAILURE,
            payload: error.response?.data?.error || error.response?.data?.detail || error.message
        });
    }
};

// Add a new task
export const addTask = (taskData) => async (dispatch, getState) => {
    dispatch({
        type: ADD_TASK_REQUEST
    });

    try {
        const token = getState().auth.token;
        console.log('Sending task data:', taskData);
        console.log('Authorization token:', token);

        const response = await axios.post(`${API_BASE_URL}/tasks/`, taskData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('Response data:', response.data);

        dispatch({
            type: ADD_TASK_SUCCESS,
            payload: response.data
        });

        // Return the created task data
        return response.data;
    } catch (error) {
        console.error('Error response:', error.response?.data);

        // More detailed error handling
        let errorMessage = 'Failed to create task';

        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Error status:', error.response.status);
            console.error('Error data:', error.response.data);

            // Handle different error formats
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
            // The request was made but no response was received
            console.error('No response received:', error.request);
            errorMessage = 'No response from server';
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error message:', error.message);
            errorMessage = error.message;
        }

        dispatch({
            type: ADD_TASK_FAILURE,
            payload: errorMessage
        });

        // Return the error so the component can handle it
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