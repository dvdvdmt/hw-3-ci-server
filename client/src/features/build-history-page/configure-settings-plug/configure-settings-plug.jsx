import React from 'react';
import {ConfigureIcon} from '../../../components/icons';

export function ConfigureSettingsPlug() {
  return (
    <main className="App-Main Container ConfigurePlug" data-test="configure-settings-plug">
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
    </main>
  );
}
