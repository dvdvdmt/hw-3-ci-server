import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {builds} from './builds.js';
import {settings} from './settings.js';

const rootReducer = combineReducers({settings, builds});

export const store = createStore(rootReducer, applyMiddleware(thunk));
