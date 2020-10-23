import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import memoriesReducer from '../reducers/memories';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
    const store = createStore(
        combineReducers({
            memories: memoriesReducer,
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};