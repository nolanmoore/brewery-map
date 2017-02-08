'use strict';

describe('Controller: BrewMapCtrl', function () {

  // load the controller's module
  beforeEach(module('breweryMapApp'));

  var BrewMapCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BrewMapCtrl = $controller('BrewMapCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BrewMapCtrl.awesomeThings.length).toBe(3);
  });
});
