'use strict';

/**
* @ngdoc function
* @name breweryMapApp.controller:BrewMapCtrl
* @description
* # BrewMapCtrl
* Controller of the breweryMapApp
*/
angular.module('breweryMapApp')
.controller('BrewMapCtrl', function ($scope, $filter, $http, BreweryDBPull, leafletData) {
  var vm = this;

  vm.center = {
    // autoDiscover: true,
    lat: 39.74,
    lng: -104.99,
    zoom: 14
  };

  vm.tiles = {
    url: 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoibm9sYW5kbyIsImEiOiJjaXlnb2wwcXkwM2lwMnFsNDUyeWg5anZhIn0.yX9KFS9uZ0Kxd59qFe20kQ'
  };

  vm.controls = {
    custom: new L.Control.Locate({
      drawCircle: false,
      strings: {
        title: "Show me where I am, yo!"
      }
    })
  };

  vm.markers = [];
  vm.breweries = [];
  vm.searchRadius = 2;
  vm.resultLimit = 5;

  vm.init = function() {

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
    vm.clearResults();

    BreweryDBPull.getBreweriesNear(vm.center, vm.searchRadius)
    .then(function(res) {
      vm.breweries = res.data.data;
      vm.breweries = $filter('filter')(vm.breweries, {
        isPrimary:'Y',
        openToPublic:'Y',
        isClosed:'N',
        streetAddress: '!!'
      }).slice(0, vm.resultLimit);

      if (typeof vm.breweries !== 'undefined') {
        vm.breweries.forEach(function(brewery) {
          var website = (brewery.brewery.hasOwnProperty("website") ? '<a href="'+ brewery.brewery.website +'">' + brewery.brewery.website.replace(/^https?\:\/\//i, "") + '</a>': '');
          var dirUrl = 'https://www.google.com/maps/dir//'+ brewery.latitude + ',' + brewery.longitude + '/@' + vm.center.lat + ',' + vm.center.lng + ',15.5z';

          vm.markers.push({
            lat: brewery.latitude,
            lng: brewery.longitude,
            message: (brewery.brewery.name + '<br />' +
              brewery.streetAddress + '<br />' +
              brewery.locality + ', ' + brewery.region + ' ' + brewery.postalCode + '<br />' +
              website + '<br /><br />' +
              '<strong><a href="' + dirUrl + '">Get directions</a></strong>'),
            focus: false,
            draggable: false,
            icon: {
              iconUrl: 'images/marker-icon.png',
              shadowUrl: 'images/marker-shadow.png',
            }
          });

          // var marker = L.marker([brewery.latitude, brewery.longitude], {
          //   icon: {
          //     iconUrl: 'images/marker-icon.png',
          //     shadowUrl: 'images/marker-shadow.png',
          //   },
          //   draggable: false
          // })
          //   .bindPopup(brewery.brewery.name + '<br />' +
          //     brewery.streetAddress + '<br />' +
          //     brewery.locality + ', ' + brewery.region + ' ' + brewery.postalCode + '<br />' +
          //     website + '<br /><br />' +
          //     '<strong><a href="#">Get directions</a></strong>'); // TODO: add dynamic directions link;
          //
          // vm.markers.push(marker);
        });

        leafletData.getMap().then((map) => {
          map.fitBounds(vm.markers);
        });
      } else {
        alert('No nearby breweries or bars. Sorry, mate.');
      }
    }, function(res) {
      console.log('unable to retrieve brewery data' + res);
    });
  };

  vm.clearResults = function() {
    vm.breweries = [];
    vm.markers = [];
  };

  vm.scrollToMap = function(markerIndex) {
    $('html, body').animate({
      scrollTop: $('#brewmap').offset().top
    }, 'fast');

    var markerLocation = [vm.markers[markerIndex].lat, vm.markers[markerIndex].lng];
    leafletData.getMap().then(function(map) {
      // map.fitBounds([ [40.712, -74.227], [40.774, -74.125] ]);
      map.flyTo(markerLocation, 16);
      // TODO: open marker pop up
      vm.markers[markerIndex].focus = true;
    });
  }

  vm.init();
});
