import cn from 'classnames';
import React from 'react';
import './build-history-page.scss';
import {PortalWithState} from 'react-portal';
import {useSelector} from 'react-redux';
import {Button} from '../../components/button/button.jsx';
import {PlayIcon, SettingsIcon} from '../../components/icons';
import {settingsSelector} from '../../store/settings.js';
import {toSettings} from '../../utils/router.js';
import {BuildHistory} from './build-history/build-history.jsx';
import {ConfigureSettingsPlug} from './configure-settings-plug/configure-settings-plug.jsx';
import {RunBuildModal} from './run-build-modal/run-build-modal.jsx';

export function BuildHistoryPage() {
  const settings = useSelector(settingsSelector);
  const areRequiredSettingsExist = settings.buildCommand && settings.repoName;
  const Main = areRequiredSettingsExist ? BuildHistory : ConfigureSettingsPlug;
  return (
    <>
      <header className="Header Container">
        <h1 className={cn('Text Text_type_h1', {Text_color_light: !areRequiredSettingsExist})}>
          {areRequiredSettingsExist ? settings.repoName : 'School CI server'}
        </h1>
        <div className="Header-Menu">
          {areRequiredSettingsExist && <RunBuildButton />}
          <Button to={toSettings()} data-test="to-settings-menu-button">
            <SettingsIcon width="12" height="12" />
            Settings
          </Button>
        </div>
      </header>
      <Main />
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

function RunBuildButton() {
  return (
    <PortalWithState closeOnEsc closeOnOutsideClick>
      {({portal, openPortal, closePortal}) => (
        <>
          <Button data-test="run-build-button" onClick={openPortal}>
            <PlayIcon width="12" height="12" />
            Run build
          </Button>
          {portal(<RunBuildModal closePortal={closePortal} />)}
        </>
      )}
    </PortalWithState>
  );
}
