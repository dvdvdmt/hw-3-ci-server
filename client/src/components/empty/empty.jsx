import cn from 'classnames';
import React from 'react';
import {EmptyIcon} from '../icons';
import './empty.scss';

export function Empty({className, text = 'No Data'}) {
  return (
    <div className={cn(className, 'Empty')}>
      <EmptyIcon />
      <div className="Empty-Text">{text}</div>
    </div>
  );
}
