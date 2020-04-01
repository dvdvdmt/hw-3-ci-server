import React from 'react';
import {
  CalendarIcon,
  ClockIcon,
  CommitIcon,
  DoneIcon,
  FailIcon,
  StopwatchIcon,
  UserIcon,
} from '../../../components/icons';

export function BuildHistory() {
  return (
    <main className="App-Main Container BuildHistory" data-test="build-history">
      <ul className="BuildHistory-List">
        <li className="BuildHistory-Item">
          <a href="#/build/id" className="Build Build_status_success">
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
          </a>
        </li>
        <li className="BuildHistory-Item">
          <a href="#/build/id" className="Build Build_status_fail">
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
                  <div className="Build-Number">#1367</div>
                  <div className="Build-CommitMessage">
                    Super cool UI kit for making websites that look like games of old.
                  </div>
                </div>
                <div className="Build-HeaderSecond">
                  <div className="Build-Commit">
                    <div className="Build-CommitBranch">
                      <CommitIcon width="16" height="16" />
                      <span className="Build-CommitBranchName">super-cool-ui-kit</span>
                    </div>
                    <div className="Build-CommitHash">952e5567</div>
                  </div>
                  <div className="Build-Author">
                    <UserIcon width="16" height="16" />
                    <span className="Build-AuthorName">Vadim Makeev</span>
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
          </a>
        </li>
        <li className="BuildHistory-Item">
          <a href="#/build/id" className="Build Build_status_success">
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
                  <div className="Build-Number">#1366</div>
                  <div className="Build-CommitMessage">
                    Merge branch master of github.com:jaywcjlove/awesome-uikit
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
          </a>
        </li>
        <li className="BuildHistory-Item">
          <a href="#/build/id" className="Build Build_status_running">
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
                  <div className="Build-Number">#1366</div>
                  <div className="Build-CommitMessage">upgrade typescript to 3.8</div>
                </div>
                <div className="Build-HeaderSecond">
                  <div className="Build-Commit">
                    <div className="Build-CommitBranch">
                      <CommitIcon width="16" height="16" />
                      <span className="Build-CommitBranchName">master</span>
                    </div>
                    <div className="Build-CommitHash">b4636ab</div>
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
          </a>
        </li>
        <li className="BuildHistory-Item">
          <a href="#/build/id" className="Build Build_status_success">
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
                  <div className="Build-Number">#1364</div>
                  <div className="Build-CommitMessage">add documentation for postgres scaler</div>
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
          </a>
        </li>
      </ul>
      <button className="BuildHistory-ShowMoreButton Button">Show more</button>
    </main>
  );
}
