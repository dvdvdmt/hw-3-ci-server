import cn from 'classnames';
import React from 'react';

export function SvgIcon({icon, width, height, className, ...rest}) {
  return (
    <svg width={width} height={height} className={cn('SvgIcon', className)} {...rest}>
      <use xlinkHref={`#${icon.id}`} />
    </svg>
  );
}
