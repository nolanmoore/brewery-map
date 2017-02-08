'use strict';

/**
* @ngdoc function
* @name breweryMapApp.controller:BrewMapCtrl
* @description
* # BrewMapCtrl
* Controller of the breweryMapApp
*/
angular.module('breweryMapApp')
.controller('BrewMapCtrl', function ($scope, $filter, $http, BreweryDBPull) {
  var vm = this;
  vm.debug = false;

  vm.center = {
    autoDiscover: true,
  };

  vm.markers = [];
  vm.breweries = [];

  vm.init = function() {
    // $http.get('jsondata/addresses.json')
    // .then(
    //   function(res) {
    //     vm.addressBook = res.data;
    //   },
    //   function(res) {
    //     console.log('Address data could not be retrieved: ' + res);
    //   }
    // );
  };

  // vm.recenter = function() {
  //   vm.center.lat = Number(vm.addressBook[vm.currentAddress].latitude);
  //   vm.center.lng = Number(vm.addressBook[vm.currentAddress].longitude);
  //   vm.center.zoom = 6;
  //   if (vm.markers.length > 0) {
  //     vm.markers.pop();
  //   }
  //   vm.markers.push({
  //     lat: vm.center.lat,
  //     lng: vm.center.lng,
  //     // message: vm.addressBook[vm.currentAddress].company,
  //     focus: true,
  //     draggable: false,
  //     icon: {
  //       iconUrl: 'images/marker-icon.png',
  //       shadowUrl: 'images/marker-shadow.png',
  //     }
  //   });
  // };

  vm.getBreweries = function() {
    BreweryDBPull.getBreweriesNear(vm.center)
    .then(function(res) {
      vm.breweries = res.data.data;
      // apply filter: filter:{isPrimary:'Y', openToPublic:'Y', isClosed:'N'}
      vm.breweries = $filter('filter')(vm.breweries, {
        isPrimary:'Y',
        openToPublic:'Y',
        isClosed:'N',
        streetAddress: '!!'
      });

      if (typeof vm.breweries !== 'undefined') {
        vm.breweries.forEach(function(brewery) {
          vm.markers.push({
            lat: brewery.latitude,
            lng: brewery.longitude,
            message: brewery.brewery.name + '<br />' + brewery.streetAddress + '<br />' + brewery.locality + ', ' + brewery.region + ' ' + brewery.postalCode + '<br /><a href="'+ brewery.brewery.website +'">' + brewery.brewery.website.replace(/^https?\:\/\//i, "") + '</a>',
            focus: false,
            draggable: false,
            icon: {
              iconUrl: 'images/marker-icon.png',
              shadowUrl: 'images/marker-shadow.png',
            }
          });
        });
      } else {
        alert('No nearby breweries or bars. Sorry, mate.');
      }
    }, function(res) {
      console.log('unable to retrieve brewery data' + res);
    });
  };

  vm.init();
});
