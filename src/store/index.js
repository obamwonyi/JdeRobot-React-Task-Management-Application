import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Use named import
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from './rootReducer';

// Creating the Store with middleware
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)) // Apply thunk middleware
);

export default store;