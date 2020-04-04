import cn from 'classnames';
import React from 'react';
import {NavLink} from 'react-router-dom';

export function Button({className, children, to, ...rest}) {
  const [firstChild, ...otherChildren] = children;
  let isIconButton = false;
  if (otherChildren.length) {
    isIconButton = true;
  }
  const resultClass = cn(className, 'Button', {Button_icon: isIconButton});
  if (to) {
    return (
      <NavLink className={resultClass} to={to} {...rest}>
        {firstChild}
        <span className="Button-Text">{otherChildren}</span>
      </NavLink>
    );
  }
  return (
    <button className={resultClass} {...rest}>
      {firstChild}
      <span className="Button-Text">{otherChildren}</span>
    </button>
  );
}
