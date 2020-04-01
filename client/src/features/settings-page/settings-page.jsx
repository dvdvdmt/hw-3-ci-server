import React from 'react';
import {ClearInputIcon} from '../../components/icons';
import {useSelector} from 'react-redux';
import {settingsSelector} from '../../store/settings.js';

export function SettingsPage() {
  const settings = useSelector(settingsSelector);

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
        <form action="" className="Form" data-test="settings-form">
          <div className="Form-Group">
            <label htmlFor="repo-name" className="Form-Label Form-Label_required">
              GitHub repository
            </label>
            <FormInput
              id="repo-name"
              data-test="repoName"
              type="text"
              placeholder="user-name/repo-name"
              value={settings.repoName}
              required
            />
          </div>
          <div className="Form-Group">
            <label htmlFor="build-command" className="Form-Label">
              Build command
            </label>
            <FormInput
              id="build-command"
              data-test="buildCommand"
              type="text"
              placeholder="npm ci"
              value={settings.buildCommand}
              required
            />
          </div>
          <div className="Form-Group">
            <label htmlFor="main-branch" className="Form-Label">
              Main branch
            </label>
            <FormInput
              id="main-branch"
              data-test="mainBranch"
              type="text"
              placeholder="master"
              value={settings.mainBranch}
              required
            />
          </div>
          <div className="Form-Group Form-Group_horizontal">
            <label htmlFor="sync-period" className="Form-Label">
              Synchronize every
            </label>
            <input
              id="sync-period"
              data-test="period"
              type="text"
              className="Form-InputField"
              value={settings.period}
            />
            <span className="Form-InputUnit">minutes</span>
          </div>
          <div className="Form-Group Form-Group_buttons">
            <button type="submit" className="Button Button_primary">
              Save
            </button>
            <button type="button" className="Button">
              Cancel
            </button>
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
}

function FormInput({...rest}) {
  return (
    <div className="Form-Input Form-Input_filled">
      <input className="Form-InputField" {...rest} />
      <ClearInputIcon width="16" height="16" className="Form-ClearInput" />
    </div>
  );
}
