import React from 'react';
import location from 'core/js/location';
import { classes, compile } from 'core/js/reactHelpers';

export default function HomeNavigationButton(props) {
  const {
    text,
    _iconClasses,
    courseConfig
  } = props;

  const currentIconClass = _iconClasses;
  const courseIconClass = courseConfig?._iconClasses;
  const currentLocation = location._currentLocation;
  const defaultClass = (currentLocation !== 'course') ? 'icon-home' : 'icon-controls-small-left';

  const iconClass = (currentIconClass || courseIconClass || defaultClass);

  return (
    <>
      <span
        className={classes([
          'icon',
          iconClass
        ])}
        aria-hidden="true"
      />
      <span
        className="nav__btn-label"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: compile(text, props) }}
      />
    </>
  );
}
