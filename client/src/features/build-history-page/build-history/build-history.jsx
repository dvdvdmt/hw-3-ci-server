import React from 'react';
import {Button} from '../../../components/button/button.jsx';
import {Build} from '../../build/build.jsx';

const builds = [
  {
    buildNumber: 1368,
    commitHash: '9c9f0b9',
    branchName: 'master',
    commitMessage:
      'add documentation for postgres scaler Lorem ipsum dolor sit amet, consectetur\n' +
      'adipisicing elit. Dolore doloribus eaque id iure mollitia nesciunt nihil officia quasi\n' +
      'ratione, vel.',
    authorName: 'Philip Kirkorov',
    status: 'success',
    duration: '1 ч 20 мин',
    start: '21 янв, 03:06',
  },
  {
    buildNumber: 1367,
    commitHash: '9c9f0b9',
    branchName: 'master',
    commitMessage:
      'add documentation for postgres scaler Lorem ipsum dolor sit amet, consectetur\n' +
      'adipisicing elit. Dolore doloribus eaque id iure mollitia nesciunt nihil officia quasi\n' +
      'ratione, vel.',
    authorName: 'Philip Kirkorov',
    status: 'success',
    duration: '1 ч 20 мин',
    start: '21 янв, 03:06',
  },
];
export function BuildHistory() {
  return (
    <main className="App-Main Container BuildHistory" data-test="build-history">
      <ul className="BuildHistory-List">
        {builds.map((build) => (
          <li className="BuildHistory-Item" key={build.buildNumber}>
            <Build build={build} />
          </li>
        ))}
      </ul>
      <Button className="BuildHistory-ShowMoreButton">Show more</Button>
    </main>
  );
}
