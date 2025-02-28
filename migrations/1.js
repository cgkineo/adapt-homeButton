import { describe, whereFromPlugin, mutateContent, checkContent, updatePlugin, getCourse } from 'adapt-migrations';

describe('Home Button - v1.0.7 to v1.1.0', async () => {
  let config, courseHomeButton;
  whereFromPlugin('Home Button - from v1.0.7', { name: 'adapt-homeButton', version: '<1.1.0' });

  updatePlugin('Home Button - update to v1.1.0', { name: 'adapt-homeButton', version: '1.1.0', framework: '>=5.19.1' });
});
