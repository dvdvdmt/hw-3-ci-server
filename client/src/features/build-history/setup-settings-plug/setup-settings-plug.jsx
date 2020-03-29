import React from 'react';
import {ConfigureIcon, SettingsIcon} from '../../../components/icons';

export function SetupSettingsPlug() {
  return (
    <>
      <header className="Header Container">
        <h1 className="Text Text_type_h1 Text_color_light">School CI server</h1>
        <div className="Header-Menu">
          <button className="Button Button_icon Header-Button">
            <SettingsIcon width="12" height="12" className="Button-Icon" />
            <span className="Button-Text">Settings</span>
          </button>
        </div>
      </header>
      <main className="App-Main Container">
        <div className="ConfigurePlug" data-test="configure-plug">
          <div className="ConfigurePlug-Container">
            <ConfigureIcon width="124" height="124" className="ConfigurePlug-Icon" />
            <div className="ConfigurePlug-Message">
              Configure repository connection <br />
              and synchronization settings
            </div>
            <div className="ConfigurePlug-Buttons">
              <button className="Button Button_primary">Open settings</button>
            </div>
          </div>
        </div>
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
