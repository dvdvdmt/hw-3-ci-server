import {api} from '../api';

const initialState = {
  isLoading: true,
  list: [],
};

const BUILDS_LOAD_START = 'BUILDS_LOAD_START';
const BUILDS_LOAD_SUCCESS = 'BUILDS_LOAD_SUCCESS';
const BUILDS_LOAD_FAIL = 'BUILDS_LOAD_FAIL';
const BUILDS_SET = 'BUILDS_SET';

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
    default:
      return state;
  }
}

export function buildsSelector({builds}) {
  return builds;
}

function loadBuildsStart() {
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
      const settings = await api.getBuilds();
      dispatch(buildsSet(settings));
      dispatch(loadBuildsFinish());
    } catch (e) {
      console.error(e); // TODO: notify user
      dispatch(loadBuildsFail());
    }
  };
}
