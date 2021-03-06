(function ($) {
  'use strict';

  L.mapbox.accessToken = 'pk.eyJ1Ijoibmlja2Nhd3Rob24iLCJhIjoiR1Vic2wwQSJ9.glVpgeji4zywDmytJ8kU8A';

  var InteractiveVenueMap = function (mapOptions, clusterOptions) {
    this.container = $jQueryAngular('#interactive-venue-map');
    this.mapElement = this.container.find('.map')[0];

    this._initMap(mapOptions);
    this._initClusterGroup(clusterOptions);
  };

  InteractiveVenueMap.prototype._initMap = function (mapOptions) {
    mapOptions = mapOptions || {};
    mapOptions.mapboxId = 'nickcawthon.6eeb8650';

    mapOptions.zoomControl = mapOptions.zoomControl || false;
    mapOptions.scrollWheelZoom = mapOptions.scrollWheelZoom || false;
 //   mapOptions.dragging = mapOptions.dragging || false;


    this.map = L.mapbox.map(this.mapElement, mapOptions.mapboxId, mapOptions);

    L.control.zoomslider({
      position: 'topleft'
    }).addTo(this.map);

    L.control.fullscreen({
      position: 'topleft'
    }).addTo(this.map);

    new L.Control.MiniMap(L.mapbox.tileLayer('nickcawthon.17457827'), {
                position: 'topright',
                toggleDisplay: false,
                zoomLevelOffset: -5,
                zoomLevelFixed: false,
                zoomAnimation: false,
                autoToggleDisplay: false,
                width: 150,
                height: 150,
                aimingRectOptions: {color: "#ff7800", weight: 1, clickable: false},
                shadowRectOptions: {color: "#000000", weight: 0, clickable: false, opacity:0, fillOpacity:0},
            })
            .addTo(this.map);


     var imageUrl = 'http://gaugedesign.com/white-logo.svg',
         imageBounds = [[37.595738, -122.309541], [37.705738, -122.210541]];

    L.imageOverlay(imageUrl, imageBounds).addTo(this.map);


  };

  InteractiveVenueMap.prototype._clusterToMarkers = function (cluster) {
    var markers = cluster._markers.slice();

    var clusters = cluster._childClusters;

    for (var i = 0; i < clusters.length; i++) {
      markers = markers.concat(this._clusterToMarkers(clusters[i]));
    }

    return markers;
  };

  InteractiveVenueMap.prototype._initCategoryFilter = function () {
    $jQueryAngular(this.id).find('.category-filter').empty();
  };

  InteractiveVenueMap.prototype._initClusterGroup = function (clusterOptions) {
    var self = this;

    clusterOptions = clusterOptions || {};
    clusterOptions.disableClusteringAtZoom = clusterOptions.disableClusteringAtZoom || 8;
    clusterOptions.iconCreateFunction = clusterOptions.iconCreateFunction || function (cluster) {
      return new L.divIcon({
        iconSize: L.point(56, (function calcHeight() {
          var rows = cluster.getChildCount();
          if (rows % 2 !== 0) {
            rows++;
          }
          rows = rows/2;
          return rows*26 + 4;
        })()),
        className: 'venue-marker',
        html: (function () {
          var html = '';
          var markers = self._clusterToMarkers(cluster);
          for (var i = 0; i < markers.length; i++) {
            html += self._venueToMarkerHTML(markers[i]._venue);
          }
          return html;
        })()
      });
    }

    this.venueClusterGroup = new L.MarkerClusterGroup(clusterOptions);

    this.map.addLayer(this.venueClusterGroup);
  };

  InteractiveVenueMap.prototype._jumpTo = function (map, oldMarker, newMarker) {
    if (!map || !oldMarker || !newMarker) {
      return;
    }
    oldMarker.closePopup();
    this.venueClusterGroup.zoomToShowLayer(newMarker, function () {
      newMarker.openPopup();
      this.map.panBy([0,0]);
    }.bind(this));
  };

  InteractiveVenueMap.prototype._venueToPopup = function (venue) {
    var self = this;

    var header = $jQueryAngular('<header />');
    var h1 = $jQueryAngular('<h1 />');
    // var closeButton = $jQueryAngular('<button />');
    // closeButton.text('✖');

    // closeButton.click(function (evene) {
    //
    // });

    // header.append(closeButton);
    header.append(h1);

    var main = $jQueryAngular('<main />');
    var description = $jQueryAngular('<p />')
    main.append(description);

    var html = $jQueryAngular('<div />');
    html.append(header);
    html.append(main);

    description.text(venue.description);
    h1.text(venue.name);

    header.css({
      background: 'url(' + venue.image + ')'
    });

    var venueIndex = this.venues.indexOf(venue);

    var children = [];
    angular.forEach(window.interactiveVenueMap.venues, function (mv) {
      angular.forEach(mv.subCategories, function (sub) {
        angular.forEach(sub.venues, function (v) {
          if (mv.hidden !== true || sub.hidden !== true) {
            children.push(v);
          }
        });
      });
    });

    if(children.length){
      var i = children.indexOf(venue);
    }

    if (i > 0) {
      // setup prev link
        var previousLink = $jQueryAngular('<a href="#" class="previous-venue">&laquo; Previous</a>').click(function (event) {
          event.preventDefault();
          var previousVenue = self.venues[venueIndex - 1];
          self._jumpTo(self.map, venue._marker, previousVenue._marker);
          return false;
        });

    }

    if (i >= 0 && i < children.length - 1) {
      //setup next link
      var nextLink = $jQueryAngular('<a href="#" class="next-venue">Next &raquo;</a>').click(function (event) {
        event.preventDefault();
        var nextVenue = self.venues[venueIndex + 1];
        self._jumpTo(self.map, venue._marker, nextVenue._marker);
        return false;
      });
    }




    var progressReport = $jQueryAngular('<span class="progress">' + (venueIndex + 1) + '/' + this.venues.length + '</span>');



    progressReport.append(previousLink);
    progressReport.append(nextLink);
    main.append(progressReport);

    return html[0];
  };

  InteractiveVenueMap.prototype._venueToMarkerHTML = function (venue) {
    var html = '';
    html += '<div class="venue" style="background: ' + venue._category.color + '">';
    html += venue._subCategory.icon ? '<img src="' + venue._subCategory.icon + '">' : '';
    html += '</div>';
    return html;
  };

  InteractiveVenueMap.prototype._venueToMarker = function (venue) {
    var marker = L.marker(new L.LatLng(venue.lat, venue.lng), {
        icon: L.divIcon({
          popupAnchor: L.point(0, -15),
          iconSize: L.point(30, 30),
          className: 'venue-marker',
          html: this._venueToMarkerHTML(venue)
        }),
        title: venue.name
    });
    marker._venue = venue;
    venue._marker = marker;
    marker.bindPopup(this._venueToPopup(venue), {
      // closeButton: false
      autoPanPadding: L.point(50, 200)
    });
    this.venueClusterGroup.addLayer(marker);
  }

  InteractiveVenueMap.prototype.render = function (categories) {
    this.venues = [];
    this.categories = categories;

    for (var i = 0; i < categories.length; i++) {
      var category = categories[i];
      for (var j = 0; j < category.subCategories.length; j++) {
        var subCategory = category.subCategories[j];
        for (var k = 0; k < subCategory.venues.length; k++) {
          if (!category.hidden || !subCategory.hidden) {
            var venue = subCategory.venues[k];
            venue._category = category;
            venue._subCategory = subCategory;
            this.venues.push(venue);
          }
        }
      }
    }

    for (var l = 0; l < this.venues.length; l++) {
      this._venueToMarker(this.venues[l]);
    }

    this._initCategoryFilter();
  };

  InteractiveVenueMap.prototype.clearVenues = function () {
    delete this.categories;
    delete this.venues;
    this.venueClusterGroup.clearLayers();
  };

  InteractiveVenueMap.prototype.rerender = function () {
    var venues = this.categories.slice();
    this.clearVenues();
    this.render(venues);
  };

  // Angular magic starts here

  var InteractiveVenueMapModule = angular.module('InteractiveVenueMap', []);

  InteractiveVenueMapModule.run(['$window', function ($window) {
    $window.interactiveVenueMap.interactiveVenueMap = new InteractiveVenueMap($window.interactiveVenueMap.mapOptions, $window.interactiveVenueMap.clusterOptions);
    $window.interactiveVenueMap.interactiveVenueMap.render($window.interactiveVenueMap.venues);
  }]);

  InteractiveVenueMapModule.controller('FilterCtrl', ['$scope', '$window', function($scope, $window) {
    $scope.venues = $window.interactiveVenueMap.venues;

    $scope.selectedCategory = $scope.venues[0];

    $scope.changeCategory = function (category) {
      $scope.selectedCategory = category;
    };

    $scope.toggleCategory = function (category, subCategory) {
      if (subCategory) {
        subCategory.hidden = !subCategory.hidden;
        category.hidden = true;
      } else {
        category.hidden = !category.hidden;
        for (var i = 0; i < category.subCategories.length; i++) {
          category.subCategories[i].hidden = true;
        }
      }
      $window.interactiveVenueMap.interactiveVenueMap.rerender();
    };

    $scope.countVenues = function (category) {
      var count = 0
      for (var i = 0; i < category.subCategories.length; i++) {
        count += category.subCategories[i].venues.length;
      }
      return count;
    }

    for (var i = 0; i < $scope.venues.length; i++) {
      var category = $scope.venues[i];
      if (category.disabled) {
        $scope.toggleCategory(category);
      }
    }
  }]);
}).call(this, jQuery);
