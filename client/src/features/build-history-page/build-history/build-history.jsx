import React, {useEffect} from 'react';
import {PortalWithState} from 'react-portal';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from '../../../components/button/button.jsx';
import {Empty} from '../../../components/empty/empty.jsx';
import {ProgressSpinner} from '../../../components/progress-spinner/progress-spinner.jsx';
import {buildsSelector, loadBuilds} from '../../../store/builds.js';
import {Build} from '../../build/build.jsx';
import {RunBuildModal} from '../run-build-modal/run-build-modal.jsx';
import './build-history.scss';

export function BuildHistory() {
  const dispatch = useDispatch();
  const builds = useSelector(buildsSelector);
  useEffect(() => {
    dispatch(loadBuilds());
  }, []);
  const showEmptyPlug = !builds.isLoading && !builds.list.length;
  return (
    <main className="App-Main Container BuildHistory" data-test="build-history">
      {showEmptyPlug ? <EmptyBuildsPlug /> : <BuildList builds={builds} />}
      {builds.list.length ? (
        <Button className="BuildHistory-ShowMoreButton">Show more</Button>
      ) : null}
    </main>
  );
}

function BuildList({builds}) {
  return (
    <ul className="BuildHistory-List">
      {builds.isLoading ? (
        <ProgressSpinner />
      ) : (
        builds.list.map((build) => (
          <li className="BuildHistory-Item" key={build.buildNumber}>
            <Build build={build} />
          </li>
        ))
      )}
    </ul>
  );
}

function EmptyBuildsPlug() {
  return (
    <PortalWithState closeOnEsc closeOnOutsideClick>
      {({portal, openPortal, closePortal}) => (
        <>
          <div className="EmptyBuildsPlug" data-test="empty-builds-plug">
            <Empty text="There are no builds" />
            <Button type="primary" data-test="empty-builds-plug-button" onClick={openPortal}>
              Run build
            </Button>
          </div>
          {portal(<RunBuildModal closePortal={closePortal} />)}
        </>
      )}
    </PortalWithState>
  );
}
