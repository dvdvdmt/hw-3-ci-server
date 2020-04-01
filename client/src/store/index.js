import {settings} from './settings.js';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({settings});

export const store = createStore(rootReducer, applyMiddleware(thunk));
