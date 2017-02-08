'use strict';

/**
 * @ngdoc service
 * @name breweryMapApp.YelpPull
 * @description
 * # YelpPull
 * Factory in the breweryMapApp.
 */
angular.module('breweryMapApp')
  .factory('YelpPull', function ($http) {
    var baseUrl = 'https://api.yelp.com/v3/businesses/search';

    var getBarsNear = function (location) {
      var url = baseUrl;
      return $http.get(url, {
        params: {
          latitude: location.lat,
          longitude: location.lng,
          radius: 5000,
          term: 'bars',
          limit: 10
          // add oauth authentication params
        }
      });
    };

    return {
      getBarsNear: getBarsNear,
    };
  });
