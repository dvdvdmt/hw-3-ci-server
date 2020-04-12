import React from 'react';
import {SvgIcon} from '../svg-icon/svg-icon.jsx';
import {
  calendarSvg,
  clockSvg,
  commitSvg,
  configureSvg,
  doneSvg,
  failSvg,
  playSvg,
  rebuildSvg,
  settingsSvg,
  stopwatchSvg,
  userSvg,
  clearInputSvg,
  emptySvg,
} from './svg';

export * from './svg';

export function CalendarIcon({...rest}) {
  return <SvgIcon icon={calendarSvg} {...rest} />;
}

export function ClockIcon({...rest}) {
  return <SvgIcon icon={clockSvg} {...rest} />;
}

export function CommitIcon({...rest}) {
  return <SvgIcon icon={commitSvg} {...rest} />;
}

export function ConfigureIcon({...rest}) {
  return <SvgIcon icon={configureSvg} {...rest} />;
}

export function DoneIcon({...rest}) {
  return <SvgIcon icon={doneSvg} {...rest} />;
}

export function FailIcon({...rest}) {
  return <SvgIcon icon={failSvg} {...rest} />;
}

export function PlayIcon({...rest}) {
  return <SvgIcon icon={playSvg} {...rest} />;
}

export function RebuildIcon({...rest}) {
  return <SvgIcon icon={rebuildSvg} {...rest} />;
}

export function SettingsIcon({...rest}) {
  return <SvgIcon icon={settingsSvg} {...rest} />;
}

export function StopwatchIcon({...rest}) {
  return <SvgIcon icon={stopwatchSvg} {...rest} />;
}

export function UserIcon({...rest}) {
  return <SvgIcon icon={userSvg} {...rest} />;
}

export function ClearInputIcon({...rest}) {
  return <SvgIcon icon={clearInputSvg} {...rest} />;
}

export function EmptyIcon({...rest}) {
  return <SvgIcon icon={emptySvg} {...rest} />;
}
