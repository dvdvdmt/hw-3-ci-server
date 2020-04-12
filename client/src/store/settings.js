import {api} from '../api';

const initialState = {
  isFirstLoading: true,
  isLoading: false,
  isSubmitting: false,
  repoName: '',
  mainBranch: '',
  buildCommand: '',
  period: 0,
};

const SETTINGS_LOAD_START = 'SETTINGS_LOAD_START';
const SETTINGS_LOAD_SUCCESS = 'SETTINGS_LOAD_SUCCESS';
const SETTINGS_LOAD_FAIL = 'SETTINGS_LOAD_FAIL';
const SETTINGS_SET = 'SETTINGS_SET';
const SETTINGS_SAVE_START = 'SETTINGS_SAVE_START';
const SETTINGS_SAVE_SUCCESS = 'SETTINGS_SAVE_SUCCESS';
const SETTINGS_SAVE_FAIL = 'SETTINGS_SAVE_FAIL';

export function settings(state = initialState, action) {
  switch (action.type) {
    case SETTINGS_LOAD_START:
      return {...state, isLoading: true, isFirstLoading: false};
    case SETTINGS_LOAD_SUCCESS:
      return {...state, isLoading: false};
    case SETTINGS_SET:
      return {...state, ...action.payload};
    case SETTINGS_LOAD_FAIL:
      return {...state, isLoading: false};
    case SETTINGS_SAVE_START:
      return {...state, isSubmitting: true};
    case SETTINGS_SAVE_SUCCESS:
      return {...state, isSubmitting: false};
    case SETTINGS_SAVE_FAIL:
      return {...state, isSubmitting: false};
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

function loadSettingsFinish() {
  return {type: SETTINGS_LOAD_SUCCESS};
}

function loadSettingsFail() {
  return {type: SETTINGS_LOAD_FAIL};
}

export function loadSettings() {
  return async (dispatch) => {
    dispatch(loadSettingsStart());
    try {
      const settings = await api.getSettings();
      dispatch(settingsSet(settings));
      dispatch(loadSettingsFinish());
    } catch (e) {
      console.error(e); // TODO: notify user
      dispatch(loadSettingsFail());
    }
  };
}

function settingsSet(payload) {
  return {type: SETTINGS_SET, payload};
}

function saveSettingsStart() {
  return {type: SETTINGS_SAVE_START};
}

function saveSettingsFinish(payload) {
  return {type: SETTINGS_SAVE_SUCCESS, payload};
}

function saveSettingsFail() {
  return {type: SETTINGS_SAVE_FAIL};
}

export function saveSettings(settings) {
  return async (dispatch) => {
    dispatch(saveSettingsStart());
    try {
      const savedSettings = await api.saveSettings(settings);
      dispatch(saveSettingsFinish());
      dispatch(settingsSet(savedSettings));
    } catch (e) {
      console.error(e); // TODO: notify user
      dispatch(saveSettingsFail());
    }
  };
}
