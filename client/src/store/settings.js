import {api} from '../api';

const initialState = {
  isFirstLoading: true,
  isLoading: false,
  repoName: '',
  mainBranch: '',
  buildCommand: '',
  period: 0,
};

const SETTINGS_LOAD_START = 'SETTINGS_LOAD_START';
const SETTINGS_LOAD_FINISH = 'SETTINGS_LOAD_FINISH';
const SETTINGS_LOAD_FAIL = 'SETTINGS_LOAD_FAIL';
const SETTINGS_SET = 'SETTINGS_SET';

export function settings(state = initialState, action) {
  switch (action.type) {
    case SETTINGS_LOAD_START:
      return {...state, isLoading: true, isFirstLoading: false};
    case SETTINGS_LOAD_FINISH:
      return {...state, isLoading: false};
    case SETTINGS_SET:
      return {...state, ...action.payload};
    case SETTINGS_LOAD_FAIL:
      return {...state, isLoading: false};
    default:
      return state;
  }
}

export function settingsSelector({settings}) {
  return settings;
}

function loadSettingsStart() {
  return {type: SETTINGS_LOAD_START};
}

function loadSettingsFinish(payload) {
  return {type: SETTINGS_LOAD_FINISH, payload};
}

function loadSettingsFail() {
  return {type: SETTINGS_LOAD_FAIL};
}

function settingsSet(payload) {
  return {type: SETTINGS_SET, payload};
}

export function loadSettings() {
  return async (dispatch) => {
    dispatch(loadSettingsStart());
    try {
      const settings = await api.getSettings();
      dispatch(loadSettingsFinish());
      dispatch(settingsSet(settings));
    } catch (e) {
      console.error(e); // TODO: notify user
      dispatch(loadSettingsFail());
    }
    setTimeout(() => {
      dispatch(loadSettingsFinish());
    }, 1000);
  };
}
