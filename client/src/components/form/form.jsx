import cn from 'classnames';
import React from 'react';
import {ClearInputIcon} from '../icons';

export function FormInput({className, ...rest}) {
  return (
    <div className={cn('Form-Input Form-Input_filled', className)}>
      <input className="Form-InputField" {...rest} />
      <ClearInputIcon width="16" height="16" className="Form-ClearInput" />
    </div>
  );
}
