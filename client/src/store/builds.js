import {api} from '../api';

const initialState = {
  isLoading: true,
  list: [],
  runByHash: {isLoading: false},
};

const BUILDS_LOAD_START = 'BUILDS_LOAD_START';
const BUILDS_LOAD_SUCCESS = 'BUILDS_LOAD_SUCCESS';
const BUILDS_LOAD_FAIL = 'BUILDS_LOAD_FAIL';
const BUILDS_SET = 'BUILDS_SET';
const BUILDS_RUN_BY_HASH_START = 'BUILDS_RUN_BY_HASH_START';
const BUILDS_RUN_BY_HASH_SUCCESS = 'BUILDS_RUN_BY_HASH_SUCCESS';
const BUILDS_RUN_BY_HASH_FAIL = 'BUILDS_RUN_BY_HASH_FAIL';

export function builds(state = initialState, action) {
  switch (action.type) {
    case BUILDS_LOAD_START:
      return {...state, isLoading: true};
    case BUILDS_LOAD_SUCCESS:
      return {...state, isLoading: false};
    case BUILDS_LOAD_FAIL:
      return {...state, isLoading: false};
    case BUILDS_SET:
      return {...state, list: [...action.payload]};
    case BUILDS_RUN_BY_HASH_START:
      return {...state, runByHash: {...state.runByHash, isLoading: true}};
    case BUILDS_RUN_BY_HASH_SUCCESS:
      return {...state, runByHash: {...state.runByHash, isLoading: false}};
    case BUILDS_RUN_BY_HASH_FAIL:
      return {...state, runByHash: {...state.runByHash, isLoading: false}};
    default:
      return state;
  }
}

export function buildsSelector({builds}) {
  return builds;
}

export function loadBuildsStart() {
  return {type: BUILDS_LOAD_START};
}

function loadBuildsFinish() {
  return {type: BUILDS_LOAD_SUCCESS};
}

function loadBuildsFail() {
  return {type: BUILDS_LOAD_FAIL};
}

function buildsSet(payload) {
  return {type: BUILDS_SET, payload};
}

export function loadBuilds() {
  return async (dispatch) => {
    dispatch(loadBuildsStart());
    try {
      const builds = await api.getBuilds();
      dispatch(buildsSet(builds));
      dispatch(loadBuildsFinish());
    } catch (e) {
      console.error(e); // TODO: notify user
      dispatch(loadBuildsFail());
    }
  };
}

function runBuildStart() {
  return {type: BUILDS_RUN_BY_HASH_START};
}

function runBuildFail() {
  return {type: BUILDS_RUN_BY_HASH_FAIL};
}

function runBuildSuccess() {
  return {type: BUILDS_RUN_BY_HASH_SUCCESS};
}

export function runBuild(commitHash) {
  return async (dispatch) => {
    dispatch(runBuildStart());
    try {
      await api.runBuild(commitHash);
      dispatch(runBuildSuccess());
    } catch (e) {
      console.error(e); // TODO: notify user
      dispatch(runBuildFail());
    }
  };
}
