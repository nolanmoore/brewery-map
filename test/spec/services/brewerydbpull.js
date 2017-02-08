'use strict';

describe('Service: brewPull', function () {

  // load the service's module
  beforeEach(module('breweryMapApp'));

  // instantiate service
  var brewPull;
  beforeEach(inject(function (_brewPull_) {
    brewPull = _brewPull_;
  }));

  it('should do something', function () {
    expect(!!brewPull).toBe(true);
  });

});
