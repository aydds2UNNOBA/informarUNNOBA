'use strict';

describe('Denuncias E2E Tests:', function () {
  describe('Test Denuncias page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/denuncias');
      expect(element.all(by.repeater('denuncia in denuncias')).count()).toEqual(0);
    });
  });
});
