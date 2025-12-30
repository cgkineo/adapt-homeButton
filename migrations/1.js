import { describe, whereFromPlugin, mutateContent, checkContent, updatePlugin, getCourse, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

describe('Home Button - v1.0.7 to v1.1.0', async () => {
  let course, courseHomeButtonGlobals, navTooltip;
  whereFromPlugin('Home Button - from v1.0.7', { name: 'adapt-homeButton', version: '<1.1.0' });
  mutateContent('Home Button - add globals if missing', async (content) => {
    course = getCourse();
    if (!_.has(course, '_globals._extensions._homeButton')) _.set(course, '_globals._extensions._homeButton', {});
    courseHomeButtonGlobals = course._globals._extensions._homeButton;
    return true;
  });
  mutateContent('Home Button - add globals _homeButton _navOrder', async (content) => {
    _.set(courseHomeButtonGlobals, '_navOrder', 0);
    return true;
  });
  mutateContent('Home Button - add globals _homeButton _showLabel', async (content) => {
    _.set(courseHomeButtonGlobals, '_showLabel', true);
    return true;
  });
  mutateContent('Home Button - add globals _homeButton navLabel', async (content) => {
    _.set(courseHomeButtonGlobals, 'navLabel', 'Home');
    return true;
  });
  mutateContent('Home Button - add globals _homeButton _navTooltip', async (content) => {
    _.set(courseHomeButtonGlobals, '_navTooltip', {});
    navTooltip = courseHomeButtonGlobals._navTooltip;
    return true;
  });
  mutateContent('Home Button - add globals _homeButton _navTooltip _isEnabled', async (content) => {
    _.set(navTooltip, '_isEnabled', true);
    return true;
  });
  mutateContent('Home Button - add globals _homeButton _navTooltip text', async (content) => {
    _.set(navTooltip, 'text', 'Home');
    return true;
  });
  checkContent('Home Button - check globals _homeButton attribute', async content => {
    if (courseHomeButtonGlobals === undefined) throw new Error('Home Button - globals _homeButton invalid');
    return true;
  });
  checkContent('Home Button - check globals _homeButton _navOrder', async content => {
    const isValid = courseHomeButtonGlobals._navOrder === 0;
    if (!isValid) throw new Error('Home Button - globals _homeButton _navOrder invalid');
    return true;
  });
  checkContent('Home Button - check globals _homeButton _showLabel', async content => {
    const isValid = courseHomeButtonGlobals._showLabel === true;
    if (!isValid) throw new Error('Home Button - globals _homeButton _showLabel invalid');
    return true;
  });
  checkContent('Home Button - check globals _homeButton navLabel', async content => {
    const isValid = courseHomeButtonGlobals.navLabel === 'Home';
    if (!isValid) throw new Error('Home Button - globals _homeButton navLabel invalid');
    return true;
  });
  checkContent('Home Button - check globals _homeButton _navTooltip', async content => {
    const isValid = courseHomeButtonGlobals._navTooltip !== undefined;
    if (!isValid) throw new Error('Home Button - globals _homeButton _navTooltip invalid');
    return true;
  });
  checkContent('Home Button - check globals _homeButton _navTooltip _isEnabled', async content => {
    const isValid = navTooltip._isEnabled === true;
    if (!isValid) throw new Error('Home Button - globals _homeButton _navTooltip _isEnabled invalid');
    return true;
  });
  checkContent('Home Button - check globals _homeButton _navTooltip text', async content => {
    const isValid = navTooltip.text === 'Home';
    if (!isValid) throw new Error('Home Button - globals _homeButton _navTooltip text invalid');
    return true;
  });
  updatePlugin('Home Button - update to v1.1.0', { name: 'adapt-homeButton', version: '1.1.0', framework: '>=5.30.3' });

  testSuccessWhere('home button with empty course', {
    fromPlugins: [{ name: 'adapt-homeButton', version: '1.0.7' }],
    content: [
      { _id: 'c-100', _component: 'mcq' },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('home button with empty course config', {
    fromPlugins: [{ name: 'adapt-homeButton', version: '1.0.7' }],
    content: [
      { _id: 'c-100', _component: 'mcq' },
      { _type: 'course', _homeButton: {} }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-homeButton', version: '1.1.0' }]
  });
});

describe('Home Button - v1.1.0 to v1.1.1', async () => {
  let course, contentObjects, courseHomeButton;
  whereFromPlugin('Home Button - from v1.1.0', { name: 'adapt-homeButton', version: '<1.1.1' });
  mutateContent('Home Button - add course alt', async (content) => {
    course = getCourse();
    if (!_.has(course, '_homeButton')) _.set(course, '_homeButton', {});
    courseHomeButton = course._homeButton;
    courseHomeButton.alt = 'Home';
    return true;
  });
  mutateContent('Home Button - add course navLabel', async (content) => {
    courseHomeButton.navLabel = 'Home';
    return true;
  });
  mutateContent('Home Button - add course _navTooltip', async (content) => {
    courseHomeButton._navTooltip = {
      _isEnabled: true,
      text: 'Home'
    };
    return true;
  });
  mutateContent('Home Button - add content objects alt', async (content) => {
    contentObjects = content.filter(({ _type }) => _type === 'page');
    contentObjects.forEach(contentObject => {
      if (!_.has(contentObject, '_homeButton')) _.set(contentObject, '_homeButton', {});
      _.set(contentObject, '_homeButton.alt', 'Home');
    });
    return true;
  });
  mutateContent('Home Button - add content objects navLabel', async (content) => {
    contentObjects.forEach(contentObject => {
      _.set(contentObject, '_homeButton.navLabel', 'Home');
    });
    return true;
  });
  mutateContent('Home Button - add content objects _navTooltip', async (content) => {
    contentObjects.forEach(contentObject => {
      _.set(contentObject, '_homeButton._navTooltip', {
        _isEnabled: true,
        text: 'Home'
      });
    });
    return true;
  });
  checkContent('Home Button - check course alt', async content => {
    if (courseHomeButton.alt !== 'Home') throw new Error('Home Button - course _homeButton.alt invalid');
    return true;
  });
  checkContent('Home Button - check course navLabel', async content => {
    if (courseHomeButton.navLabel !== 'Home') throw new Error('Home Button - course _homeButton.navLabel invalid');
    return true;
  });
  checkContent('Home Button - check course _navTooltip', async content => {
    if (!courseHomeButton._navTooltip || courseHomeButton._navTooltip._isEnabled !== true || courseHomeButton._navTooltip.text !== 'Home') {
      throw new Error('Home Button - course _homeButton._navTooltip invalid');
    }
    return true;
  });
  checkContent('Home Button - check content objects alt', async content => {
    const isValid = contentObjects.every(({ _homeButton }) => _homeButton && _homeButton.alt === 'Home');
    if (!isValid) throw new Error('Home Button - content objects _homeButton.alt invalid');
    return true;
  });
  checkContent('Home Button - check content objects navLabel', async content => {
    const isValid = contentObjects.every(({ _homeButton }) => _homeButton && _homeButton.navLabel === 'Home');
    if (!isValid) throw new Error('Home Button - content objects _homeButton.navLabel invalid');
    return true;
  });
  checkContent('Home Button - check content objects _navTooltip', async content => {
    const isValid = contentObjects.every(({ _homeButton }) => 
      _homeButton && _homeButton._navTooltip && _homeButton._navTooltip._isEnabled === true && _homeButton._navTooltip.text === 'Home'
    );
    if (!isValid) throw new Error('Home Button - content objects _homeButton._navTooltip invalid');
    return true;
  });
  updatePlugin('Home Button - update to v1.1.1', { name: 'adapt-homeButton', version: '1.1.1', framework: '>=5.30.3' });

  testSuccessWhere('home button with empty course', {
    fromPlugins: [{ name: 'adapt-homeButton', version: '1.1.0' }],
    content: [
      { _id: 'c-100', _component: 'mcq' },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('home button with empty course config', {
    fromPlugins: [{ name: 'adapt-homeButton', version: '1.1.0' }],
    content: [
      { _id: 'c-100', _component: 'mcq' },
      { _type: 'course', _homeButton: {} }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-homeButton', version: '1.1.1' }]
  });
});

describe('Home Button - v1.1.2 to v1.2.0', async () => {
  let course, contentObjects, courseHomeButton;
  whereFromPlugin('Home Button - from v1.1.2', { name: 'adapt-homeButton', version: '<1.2.0' });
  mutateContent('Home Button - add course _homeButton if missing', async (content) => {
    course = getCourse();
    if (!_.has(course, '_homeButton')) _.set(course, '_homeButton', {});
    courseHomeButton = course._homeButton;
    return true;
  });
  mutateContent('Home Button - add course _iconClasses', async (content) => {
    courseHomeButton._iconClasses = '';
    return true;
  });
  mutateContent('Home Button - add content objects _homeButton if missing', async (content) => {
    contentObjects = content.filter(({ _type }) => _type === 'page');
    contentObjects.forEach(contentObject => {
      if (!_.has(contentObject, '_homeButton')) _.set(contentObject, '_homeButton', {});
    });
    return true;
  });
  mutateContent('Home Button - add content objects _iconClasses', async (content) => {
    contentObjects = content.filter(({ _type }) => _type === 'page');
    contentObjects.forEach(contentObject => {
      _.set(contentObject, '_homeButton._iconClasses', '');
    });
    return true;
  });
  checkContent('Home Button - check course _homeButton', async content => {
    if (courseHomeButton === undefined) throw new Error('Home Button - course _homeButton invalid');
    return true;
  });
  checkContent('Home Button - check course _iconClasses', async content => {
    if (courseHomeButton._iconClasses === undefined) throw new Error('Home Button - course _homeButton._iconClasses invalid');
    return true;
  });
  checkContent('Home Button - check content objects _homeButton', async content => {
    const isValid = contentObjects.every((contentObject) => _.has(contentObject, '_homeButton'));
    if (!isValid) throw new Error('Home Button - content objects _homeButton invalid');
    return true;
  });
  checkContent('Home Button - check content object _iconClasses', async content => {
    const isValid = contentObjects.every((contentObject) => _.has(contentObject, '_homeButton._iconClasses'));
    if (!isValid) throw new Error('Home Button - content objects _homeButton._iconClasses invalid');
    return true;
  });
  updatePlugin('Home Button - update to v1.2.0', { name: 'adapt-homeButton', version: '1.2.0', framework: '>=5.30.3' });

  testSuccessWhere('home button with empty course', {
    fromPlugins: [{ name: 'adapt-homeButton', version: '1.1.2' }],
    content: [
      { _id: 'c-100', _component: 'mcq' },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('home button with empty course config', {
    fromPlugins: [{ name: 'adapt-homeButton', version: '1.1.2' }],
    content: [
      { _id: 'c-100', _component: 'mcq' },
      { _type: 'course', _homeButton: {} }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-homeButton', version: '1.2.0' }]
  });
});

describe('Home Button - v1.2.1 to v1.3.0', async () => {
  let course, contentObjects, courseHomeButton;
  whereFromPlugin('Home Button - from v1.2.1', { name: 'adapt-homeButton', version: '<1.3.0' });
  mutateContent('Home Button - add course _isInherited', async (content) => {
    course = getCourse();
    if (!course) return true;
    if (!_.has(course, '_homeButton')) _.set(course, '_homeButton', {});
    courseHomeButton = course._homeButton;
    courseHomeButton._isInherited = true;
    return true;
  });
  mutateContent('Home Button - add content objects _isInherited', async (content) => {
    contentObjects = content.filter(({ _type }) => _type === 'page');
    contentObjects.forEach(contentObject => {
      if (!_.has(contentObject, '_homeButton')) _.set(contentObject, '_homeButton', {});
      _.set(contentObject, '_homeButton._isInherited', true);
    });
    return true;
  });
  checkContent('Home Button - check course _isInherited', async content => {
    if (!courseHomeButton || courseHomeButton._isInherited !== true) throw new Error('Home Button - course _homeButton._isInherited invalid');
    return true;
  });
  checkContent('Home Button - check content object _isInherited', async content => {
    const isValid = contentObjects.every(({ _homeButton }) => _homeButton && _homeButton._isInherited === true);
    if (!isValid) throw new Error('Home Button - content objects _homeButton._isInherited invalid');
    return true;
  });
  updatePlugin('Home Button - update to v1.3.0', { name: 'adapt-homeButton', version: '1.3.0', framework: '>=5.30.3' });

  testSuccessWhere('home button with empty course', {
    fromPlugins: [{ name: 'adapt-homeButton', version: '1.2.1' }],
    content: [
      { _id: 'c-100', _component: 'mcq' },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('home button with empty course config', {
    fromPlugins: [{ name: 'adapt-homeButton', version: '1.2.1' }],
    content: [
      { _id: 'c-100', _component: 'mcq' },
      { _type: 'course', _homeButton: {} }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-homeButton', version: '1.3.0' }]
  });
});
