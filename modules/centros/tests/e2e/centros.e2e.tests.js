'use strict';

describe('Centros E2E Tests:', function () {
  describe('Test Centros page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/centros');
      expect(element.all(by.repeater('centro in centros')).count()).toEqual(0);
    });
  });
});
