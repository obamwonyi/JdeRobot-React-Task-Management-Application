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

// Fetch all tasks for the current user
export const fetchTasks = () => async (dispatch, getState) => {
    dispatch({
        type: FETCH_TASKS_REQUEST
    });

    try {
        const token = getState().auth.token;

        const response = await fetch('/api/tasks/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || data.detail || 'Failed to fetch tasks');
        }

        dispatch({
            type: FETCH_TASKS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: FETCH_TASKS_FAILURE,
            payload: error.message
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

        const response = await fetch('/api/tasks/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(taskData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || data.detail || 'Failed to add task');
        }

        dispatch({
            type: ADD_TASK_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ADD_TASK_FAILURE,
            payload: error.message
        });
    }
};

// Update an existing task
export const updateTask = (id, taskData) => async (dispatch, getState) => {
    dispatch({
        type: UPDATE_TASK_REQUEST
    });

    try {
        const token = getState().auth.token;

        const response = await fetch(`/api/tasks/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(taskData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || data.detail || 'Failed to update task');
        }

        dispatch({
            type: UPDATE_TASK_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: UPDATE_TASK_FAILURE,
            payload: error.message
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

        const response = await fetch(`/api/tasks/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || data.detail || 'Failed to delete task');
        }

        dispatch({
            type: DELETE_TASK_SUCCESS,
            payload: id
        });
    } catch (error) {
        dispatch({
            type: DELETE_TASK_FAILURE,
            payload: error.message
        });
    }
};

export const clearTaskErrors = () => ({
    type: CLEAR_TASK_ERRORS
});