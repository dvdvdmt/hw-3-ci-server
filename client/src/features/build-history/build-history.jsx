import React from 'react';
import './build-history.scss';
import {ConfigureSettingsPlug} from './setup-settings-plug/configure-settings-plug.jsx';
import {SettingsIcon} from '../../components/icons';
import {useSelector} from 'react-redux';
import {settingsSelector} from '../../store/settings.js';

export function BuildHistory() {
  const settings = useSelector(settingsSelector);
  const areRequiredSettingsExist = settings.buildCommand && settings.repoName;
  const mainContent = areRequiredSettingsExist ? (
    <h1>Show build history</h1>
  ) : (
    <ConfigureSettingsPlug />
  );
  return (
    <>
      <header className="Header Container">
        <h1 className="Text Text_type_h1 Text_color_light">School CI server</h1>
        <div className="Header-Menu">
          <button className="Button Button_icon Header-Button">
            <SettingsIcon width="12" height="12" />
            <span className="Button-Text">Settings</span>
          </button>
        </div>
      </header>
      <main className="App-Main Container">{mainContent}</main>
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
