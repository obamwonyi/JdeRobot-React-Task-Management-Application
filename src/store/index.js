import { configureStore } from '@reduxjs/toolkit'
import taskReducer from "./slices/taskSlice";
import filterReducer from "./slices/filterSlice";

export const store = configureStore({
    reducer: {
        task: taskReducer,
        filters: filterReducer,
    },
});
