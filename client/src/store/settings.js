const initialState = {
  isFirstLoading: true,
  isLoading: false,
  repoName: null,
  mainBranch: null,
  buildCommand: null,
  period: null,
};

const SETTINGS_LOAD_START = 'SETTINGS_LOAD_START';
const SETTINGS_LOAD_FINISH = 'SETTINGS_LOAD_FINISH';
const SETTINGS_LOAD_FAIL = 'SETTINGS_LOAD_FAIL';

export function settings(state = initialState, action) {
  switch (action.type) {
    case SETTINGS_LOAD_START:
      return {...state, isLoading: true, isFirstLoading: false};
    case SETTINGS_LOAD_FINISH:
      return {...state, isLoading: false};
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

function loadSettingsFinish() {
  return {type: SETTINGS_LOAD_FINISH};
}

export function loadSettings() {
  return (dispatch) => {
    dispatch(loadSettingsStart());
    setTimeout(() => {
      dispatch(loadSettingsFinish());
    }, 1000);
  };
}
