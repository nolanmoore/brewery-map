'use strict';

/**
 * @ngdoc service
 * @name breweryMapApp.brewPull
 * @description
 * # brewPull
 * Factory in the breweryMapApp.
 */
angular.module('breweryMapApp')
  .factory('BreweryDBPull', function ($http) {
    var baseUrl = 'http://api.brewerydb.com/v2/';
    var apiKey = breweryDB_key;

    var getBreweriesNear = function (location) {
      var url = baseUrl + 'search/geo/point';
      return $http.get(url, {
        params: {
          key: apiKey,
          lat: location.lat,
          lng: location.lng,
          radius: 3,
          unit: 'mi'
        }
      });
    };

    var getBeersFrom = function(breweryId) {
      var url = baseUrl + 'brewery/' + breweryId + '/beers';
      return $http.get(url, {
        params: {
          key: apiKey
        }
      });
    };

    return {
      getBreweriesNear: getBreweriesNear,
      getBeersFrom: getBeersFrom
    };
  });
