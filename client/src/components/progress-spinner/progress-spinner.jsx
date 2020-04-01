import cn from 'classnames';
import React from 'react';
import './progress-spinner.scss';

export function ProgressSpinner({className, ...rest}) {
  return (
    <div className={cn('ProgressSpinner', className)} {...rest}>
      <div className="ProgressSpinner-Ring" />
    </div>
  );
}
