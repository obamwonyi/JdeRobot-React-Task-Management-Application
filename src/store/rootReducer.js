import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import taskReducer from './tasks/taskReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    tasks: taskReducer
});

export default rootReducer;