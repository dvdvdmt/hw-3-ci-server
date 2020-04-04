import React from 'react';
import {Link} from 'react-router-dom';
import {ConfigureIcon} from '../../../components/icons';
import {toSettings} from '../../../utils/router.js';

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
          <Link
            className="Button Button_primary"
            to={toSettings()}
            data-test="to-settings-plug-button"
          >
            Open settings
          </Link>
        </div>
      </div>
    </main>
  );
}
