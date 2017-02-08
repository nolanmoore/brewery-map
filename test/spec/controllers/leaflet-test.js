'use strict';

describe('Controller: LeafletTestCtrl', function () {

  // load the controller's module
  beforeEach(module('breweryMapApp'));

  var LeafletTestCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LeafletTestCtrl = $controller('LeafletTestCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LeafletTestCtrl.awesomeThings.length).toBe(3);
  });
});
