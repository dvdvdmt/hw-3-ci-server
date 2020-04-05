import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from '../../components/button/button.jsx';
import {FormInput} from '../../components/form/form.jsx';
import {saveSettings, settingsSelector} from '../../store/settings.js';
import {getFormValuesAsObject} from '../../utils/form.js';
import {toBuildHistory} from '../../utils/router.js';

export function SettingsPage() {
  const settings = useSelector(settingsSelector);
  console.log('settings', settings);
  const dispatch = useDispatch();

  return (
    <>
      <header className="Header Container">
        <h1 className="Text Text_type_h1 Text_color_light">School CI server</h1>
      </header>
      <main className="App-Main Container" data-test="settings-page">
        <div className="Title">
          <h2 className="Text Text_type_h2">Settings</h2>
          <p className="Text Text_type_p Text_color_light">
            Configure repository connection and synchronization settings.
          </p>
        </div>
        <form action="" className="Form" data-test="settings-form" onSubmit={onSubmitHandler}>
          <div className="Form-Group">
            <label htmlFor="repo-name" className="Form-Label Form-Label_required">
              GitHub repository
            </label>
            <FormInput
              id="repo-name"
              name="repoName"
              data-test="repoName"
              type="text"
              placeholder="user-name/repo-name"
              defaultValue={settings.repoName}
              required
            />
          </div>
          <div className="Form-Group">
            <label htmlFor="build-command" className="Form-Label Form-Label_required">
              Build command
            </label>
            <FormInput
              id="build-command"
              name="buildCommand"
              data-test="buildCommand"
              type="text"
              placeholder="npm ci"
              defaultValue={settings.buildCommand}
              required
            />
          </div>
          <div className="Form-Group">
            <label htmlFor="main-branch" className="Form-Label Form-Label_required">
              Main branch
            </label>
            <FormInput
              id="main-branch"
              name="mainBranch"
              data-test="mainBranch"
              type="text"
              placeholder="master"
              defaultValue={settings.mainBranch}
              required
            />
          </div>
          <div className="Form-Group Form-Group_horizontal">
            <label htmlFor="sync-period" className="Form-Label">
              Synchronize every
            </label>
            <input
              id="sync-period"
              name="period"
              data-test="period"
              type="number"
              className="Form-InputField"
              defaultValue={settings.period}
            />
            <span className="Form-InputUnit">minutes</span>
          </div>
          <div className="Form-Group Form-Group_buttons">
            <Button htmlType="submit" type="primary" data-test="submit-button">
              Save
            </Button>
            <Button htmlType="button" to={toBuildHistory()} data-test="to-build-history-button">
              Cancel
            </Button>
          </div>
        </form>
      </main>
      <footer className="Footer">
        <div className="Footer-Container Container">
          <ul className="Footer-Menu">
            <li className="Footer-MenuItem">
              <a href="#support" className="Link">
                Support
              </a>
            </li>
            <li className="Footer-MenuItem">
              <a href="#learning" className="Link">
                Learning
              </a>
            </li>
          </ul>
          <div className="Footer-Copyright">© 2020 Your Name</div>
        </div>
      </footer>
    </>
  );

  function onSubmitHandler(event) {
    event.preventDefault();
    const formValues = getFormValuesAsObject(event.target, {period: 'number'});
    console.log('formValues', formValues);
    dispatch(saveSettings(formValues));
  }
}
