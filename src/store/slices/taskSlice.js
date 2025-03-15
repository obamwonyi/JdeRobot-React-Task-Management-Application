import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tasks: [],
};

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        removeTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        toggleComplete: (state, action) => {
            const task = state.tasks.find(task => task.id === action.payload);
            if (task)
            {
                task.completed = !task.completed;
            }
        }
    }
})

export const { addTask, removeTask, toggleComplete } = taskSlice.actions;
export default taskSlice.reducer;