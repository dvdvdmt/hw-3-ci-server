import './build.scss';
import cn from 'classnames';
import React from 'react';
import {Link} from 'react-router-dom';
import {
  CalendarIcon,
  ClockIcon,
  CommitIcon,
  DoneIcon,
  FailIcon,
  StopwatchIcon,
  UserIcon,
} from '../../components/icons';
import {toBuildDetails} from '../../utils/router.js';

export function Build({className, build}) {
  const buildStatus = build.status.toLowerCase();
  return (
    <Link
      to={toBuildDetails(build.buildNumber)}
      className={cn(className, 'Build', `Build_status_${buildStatus}`)}
      data-test="build-card"
    >
      <div className="Build-Status">
        <DoneIcon width="16" height="16" className="Build-StatusIcon Build-StatusIcon_success" />
        <FailIcon width="16" height="16" className="Build-StatusIcon Build-StatusIcon_fail" />
        <ClockIcon width="16" height="16" className="Build-StatusIcon Build-StatusIcon_running" />
      </div>
      <div className="Build-Info">
        <div className="Build-Header">
          <div className="Build-HeaderFirst">
            <div className="Build-Number">#{build.buildNumber}</div>
            <div className="Build-CommitMessage">{build.commitMessage}</div>
          </div>
          <div className="Build-HeaderSecond">
            <div className="Build-Commit">
              <div className="Build-CommitBranch">
                <CommitIcon width="16" height="16" />
                <span className="Build-CommitBranchName">{build.branchName}</span>
              </div>
              <div className="Build-CommitHash">{build.commitHash}</div>
            </div>
            <div className="Build-Author">
              <UserIcon width="16" height="16" />
              <span className="Build-AuthorName">{build.authorName}</span>
            </div>
          </div>
        </div>
        <div className="Build-Times">
          <div className="Build-DateTime">
            <CalendarIcon width="16" height="16" />
            <span className="Build-DateTimeText">{build.start?.toString()}</span>
          </div>
          <div className="Build-Duration">
            <StopwatchIcon width="16" height="16" />
            <span className="Build-DurationText">{build.duration}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
