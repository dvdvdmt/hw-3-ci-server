import React, {useEffect} from 'react';
import {ClearInputIcon} from '../../components/icons';
import {api} from '../../api';

export function Settings() {
  useEffect(() => {
    api.getSettings().then((val) => {
      console.log('val', val);
    });
  }, []);
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
        <form action="" className="Form">
          <div className="Form-Group">
            <label htmlFor="repo-name" className="Form-Label Form-Label_required">
              GitHub repository
            </label>
            <div className="Form-Input">
              <input
                id="repo-name"
                type="text"
                className="Form-InputField"
                placeholder="user-name/repo-name"
                required
              />
              <ClearInputIcon width="16" height="16" className="Form-ClearInput" />
            </div>
          </div>
          <div className="Form-Group">
            <label htmlFor="build-command" className="Form-Label">
              Build command
            </label>
            <div className="Form-Input Form-Input_filled">
              <input
                id="build-command"
                type="text"
                className="Form-InputField"
                placeholder="npm ci"
                value="npm ci && npm run build"
                required
              />
              <ClearInputIcon width="16" height="16" className="Form-ClearInput" />
            </div>
          </div>
          <div className="Form-Group">
            <label htmlFor="main-branch" className="Form-Label">
              Main branch
            </label>
            <div className="Form-Input Form-Input_filled Form-Input_focused">
              <input
                id="main-branch"
                type="text"
                className="Form-InputField"
                placeholder="npm ci"
                value="master |"
                required
              />
              <ClearInputIcon width="16" height="16" className="Form-ClearInput" />
            </div>
          </div>
          <div className="Form-Group Form-Group_horizontal">
            <label htmlFor="sync-period" className="Form-Label">
              Synchronize every
            </label>
            <input id="sync-period" type="text" className="Form-InputField" value="10" />
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
