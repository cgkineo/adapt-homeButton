import { describe, whereFromPlugin, mutateContent, checkContent, updatePlugin, getCourse, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

describe('Home Button - v1.0.7 to v1.1.0', async () => {
  let course, courseHomeButtonGlobals;
  whereFromPlugin('Home Button - from v1.0.7', { name: 'adapt-homeButton', version: '<1.1.0' });
  mutateContent('Home Button - add globals if missing', async (content) => {
    course = getCourse();
    if (!_.has(course, '_globals._extensions._homeButton')) _.set(course, '_globals._extensions._homeButton', {});
    courseHomeButtonGlobals = course._globals._extensions._homeButton;
    return true;
  });

  checkContent('Home Button - check globals _homeButton attribute', async content => {
    if (courseHomeButtonGlobals === undefined) throw new Error('Home Button - globals _homeButton invalid');
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

describe('Home Button - v1.1.2 to v1.2.0', async () => {
  let course, contentObjects, courseHomeButton;
  whereFromPlugin('Home Button - from v1.1.2', { name: 'adapt-homeButton', version: '<1.2.0' });
  mutateContent('Home Button - add course _iconClasses', async (content) => {
    course = getCourse();
    courseHomeButton = course._homeButton;
    courseHomeButton._iconClasses = '';
    return true;
  });
  mutateContent('Home Button - add content objects _iconClasses', async (content) => {
    contentObjects = content.filter(({ _type }) => _type === 'page');
    contentObjects.forEach((contentObject) => {
      _.set(contentObject, '_homeButton._iconClasses', '');
    });
    return true;
  });
  checkContent('Home Button - check course _iconClasses', async content => {
    if (courseHomeButton._iconClasses === undefined) throw new Error('Home Button - course _homeButton._iconClasses invalid');
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
