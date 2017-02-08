'use strict';

/**
 * @ngdoc function
 * @name breweryMapApp.controller:LeafletTestCtrl
 * @description
 * # LeafletTestCtrl
 * Controller of the breweryMapApp
 */
angular.module('breweryMapApp')
  .controller('LeafletTestCtrl', function (BreweryDBPull) {
    var leaf = this;

    var littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
      denver    = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
      aurora    = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
      golden    = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');
    leaf.markers = L.layerGroup([littleton, denver, aurora, golden]);

    var layerOsm = L.tileLayer.provider('OpenStreetMap.Mapnik');
    var layerWatercolor = L.tileLayer.provider('Stamen.Watercolor');
    var layerHyddaFull = L.tileLayer.provider('Hydda.Full');
    var baseLayers = {
      "OSM.Mapnik": layerOsm,
      "Stamen.Watercolor": layerWatercolor,
      "Hydda.Full": layerHyddaFull
    };
    var overlayLayers = {
      "Colorado": leaf.markers
    };

    leaf.init = function() {
      leaf.mymap = L.map('mapid', {
        center: [39.73, -104.99],
        zoom: 13,
        layers: [layerOsm]
      });
      leaf.mymap.addLayer(layerOsm);
      L.control.layers(baseLayers, overlayLayers).addTo(leaf.mymap);
    };

    leaf.init();
  });
