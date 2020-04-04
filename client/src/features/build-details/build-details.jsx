import React from 'react';
import {Button} from '../../components/button/button.jsx';
import {
  CalendarIcon,
  ClockIcon,
  CommitIcon,
  DoneIcon,
  FailIcon,
  RebuildIcon,
  SettingsIcon,
  StopwatchIcon,
  UserIcon,
} from '../../components/icons';

export function BuildDetails() {
  return (
    <>
      <header className="Header Container">
        <h1 className="Text Text_type_h1">philip1967/my-awesome-repo-with-long-repo-name</h1>
        <div className="Header-Menu">
          <Button>
            <RebuildIcon width="12" height="12" />
            Rebuild
          </Button>
          <Button>
            <SettingsIcon width="12" height="12" />
            Settings
          </Button>
        </div>
      </header>
      <main className="App-Main" data-test="build-details-page">
        <div className="Container BuildDetails">
          <div className="Build Build_status_success Build_isOpen">
            <div className="Build-Status">
              <DoneIcon
                width="16"
                height="16"
                className="Build-StatusIcon Build-StatusIcon_success"
              />
              <FailIcon width="16" height="16" className="Build-StatusIcon Build-StatusIcon_fail" />
              <ClockIcon
                width="16"
                height="16"
                className="Build-StatusIcon Build-StatusIcon_running"
              />
            </div>
            <div className="Build-Info">
              <div className="Build-Header">
                <div className="Build-HeaderFirst">
                  <div className="Build-Number">#1368</div>
                  <div className="Build-CommitMessage">
                    add documentation for postgres scaler Lorem ipsum dolor sit amet, consectetur
                    adipisicing elit. Dolore doloribus eaque id iure mollitia nesciunt nihil officia
                    quasi ratione, vel.
                  </div>
                </div>
                <div className="Build-HeaderSecond">
                  <div className="Build-Commit">
                    <div className="Build-CommitBranch">
                      <CommitIcon width="16" height="16" />
                      <span className="Build-CommitBranchName">master</span>
                    </div>
                    <div className="Build-CommitHash">9c9f0b9</div>
                  </div>
                  <div className="Build-Author">
                    <UserIcon width="16" height="16" />
                    <span className="Build-AuthorName">Philip Kirkorov</span>
                  </div>
                </div>
              </div>
              <div className="Build-Times">
                <div className="Build-DateTime">
                  <CalendarIcon width="16" height="16" />
                  <span className="Build-DateTimeText">21 янв, 03:06</span>
                </div>
                <div className="Build-Duration">
                  <StopwatchIcon width="16" height="16" />
                  <span className="Build-DurationText">1 ч 20 мин</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <pre className="LogMessage">
          {`
        Starting type checking and linting service...
Using 1 worker with 2048MB memory limit
Hash: d54ed20309f352b3bda76cbbb6d272ed6afde438bd7a265eb08db3624c32dfc883a8c379c67f4de6
Version: webpack 4.41.6
Child
    Hash: d54ed20309f352b3bda7
    Time: 40364ms
    Built at: 2020-02-23 16:04:54
                                     Asset      Size  Chunks             Chunk Names
                       0.bundle.static.css  1.31 MiB       0  [emitted]  vendors~main
                        0.bundle.static.js  10.3 MiB       0  [emitted]  vendors~main
                         bundle.static.css  48.6 KiB       1  [emitted]  main
                          bundle.static.js   613 KiB       1  [emitted]  main
             static/media/Cat.afa2191f.svg  9.83 KiB          [emitted]
    static/media/illustration.a17c1b18.svg  14.8 KiB          [emitted]
         static/media/picture.eef6f3b8.svg  16.2 KiB          [emitted]
    Entrypoint main = 0.bundle.static.css 0.bundle.static.js bundle.static.css bundle.static.js
    [./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 472 bytes {0} [built]
    [./src/account/actions/index.ts] 2.46 KiB {1} [built]
    [./src/account/api/lib/models/index.ts] 2.17 KiB {1} [built]
    [./src/account/api/lib/models/mappers.ts] 21 KiB {1} [built]
    [./src/account/api/lib/schoolaccountAPI.ts] 4.97 KiB {1} [built]
    [./src/account/api/lib/schoolaccountAPIContext.ts] 1.73 KiB {1} [built]
    [./src/account/epics/index.ts] 328 bytes {1} [built]
    [./src/account/epics/pageData.ts] 834 bytes {1} [built]
    [./src/account/epics/personalPage.ts] 2.29 KiB {1} [built]
    [./src/account/epics/registrationForm.ts] 910 bytes {1} [built]
    [./src/account/index.tsx] 561 bytes {1} [built]
    [./src/account/reducers/githubRepos.ts] 837 bytes {1} [built]
    [./src/account/reducers/index.ts] 1.83 KiB {1} [built]
    [./src/account/reducers/serverError.ts] 526 bytes {1} [built]
    [./src/account/store.ts] 1.05 KiB {1} [built]
        + 1864 hidden modules
Child
    Hash: 6cbbb6d272ed6afde438
    Time: 32877ms
    Built at: 2020-02-23 16:04:47
        Asset      Size  Chunks             Chunk Names
    server.js  6.34 MiB    main  [emitted]  main
    Entrypoint main = server.js
    [./src/account/actions/index.ts] 2.46 KiB {main} [built]
    [./src/account/api/lib/models/index.ts] 2.17 KiB {main} [built]
    [./src/account/api/lib/models/mappers.ts] 21 KiB {main} [built]
    [./src/account/api/lib/schoolaccountAPI.ts] 4.97 KiB {main} [built]
    [./src/account/api/lib/schoolaccountAPIContext.ts] 1.73 KiB {main} [built]
    [./src/account/epics/index.ts] 328 bytes {main} [built]
    [./src/account/epics/pageData.ts] 834 bytes {main} [built]
    [./src/account/epics/personalPage.ts] 2.29 KiB {main} [built]
    [./src/account/epics/registrationForm.ts] 910 bytes {main} [built]
    [./src/account/mappers/index.ts] 2.18 KiB {main} [built]
    [./src/account/reducers/githubRepos.ts] 837 bytes {main} [built]
    [./src/account/reducers/index.ts] 1.83 KiB {main} [built]
    [./src/account/reducers/serverError.ts] 526 bytes {main} [built]
    [./src/account/server.tsx] 1.62 KiB {main} [built]
    [./src/account/store.ts] 1.05 KiB {main} [built]
        + 1484 hidden modules
      `}
        </pre>
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
