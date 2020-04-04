import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {settings} from './settings.js';

const rootReducer = combineReducers({settings});

export const store = createStore(rootReducer, applyMiddleware(thunk));
