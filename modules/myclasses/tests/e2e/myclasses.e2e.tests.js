'use strict';

describe('Myclasses E2E Tests:', function () {
  describe('Test Myclasses page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/myclasses');
      expect(element.all(by.repeater('myclass in myclasses')).count()).toEqual(0);
    });
  });
});
