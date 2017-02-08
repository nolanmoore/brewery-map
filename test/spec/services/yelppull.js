'use strict';

describe('Service: YelpPull', function () {

  // load the service's module
  beforeEach(module('breweryMapApp'));

  // instantiate service
  var YelpPull;
  beforeEach(inject(function (_YelpPull_) {
    YelpPull = _YelpPull_;
  }));

  it('should do something', function () {
    expect(!!YelpPull).toBe(true);
  });

});
