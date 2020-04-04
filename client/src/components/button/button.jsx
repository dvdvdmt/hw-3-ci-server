import cn from 'classnames';
import React from 'react';
import {NavLink} from 'react-router-dom';
import './button.scss';

export function Button({className, children, to, htmlType, type = 'default', ...rest}) {
  const [firstChild, ...otherChildren] = Array.isArray(children) ? children : [children];
  let isIconButton = false;
  if (otherChildren.length) {
    isIconButton = true;
  }
  const resultClass = cn(className, 'Button', `Button_type_${type}`, {
    Button_hasIcon: isIconButton,
  });
  const toRender = isIconButton ? (
    <>
      {firstChild}
      <span className="Button-Text">{otherChildren}</span>
    </>
  ) : (
    firstChild
  );
  if (to) {
    return (
      <NavLink className={resultClass} to={to} {...rest}>
        {toRender}
      </NavLink>
    );
  }
  return (
    <button className={resultClass} type={htmlType} {...rest}>
      {toRender}
    </button>
  );
}
