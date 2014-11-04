"use strict";L.mapbox.accessToken="pk.eyJ1Ijoibmlja2Nhd3Rob24iLCJhIjoiR1Vic2wwQSJ9.glVpgeji4zywDmytJ8kU8A";var InteractiveVenueMap=function(e,n){this.container=$jQueryAngular("#interactive-venue-map"),this.mapElement=this.container.find(".map")[0],this._initMap(e),this._initClusterGroup(n)};InteractiveVenueMap.prototype._initMap=function(e){e=e||{},e.mapboxId="nickcawthon.6eeb8650",e.zoomControl=!1,e.scrollWheelZoom=!1,this.map=L.mapbox.map(this.mapElement,e.mapboxId,e),this.zoomControl=L.control.zoom({position:"bottomright"})},InteractiveVenueMap.prototype._clusterToMarkers=function(e){for(var n=e._markers.slice(),t=e._childClusters,r=0;r<t.length;r++)n=n.concat(this._clusterToMarkers(t[r]));return n},InteractiveVenueMap.prototype._initCategoryFilter=function(){$jQueryAngular(this.id).find(".category-filter").empty()},InteractiveVenueMap.prototype._initClusterGroup=function(e){var n=this;e=e||{},e.disableClusteringAtZoom=e.disableClusteringAtZoom||8,e.iconCreateFunction=e.iconCreateFunction||function(e){return new L.divIcon({iconSize:L.point(56,function t(){var n=e.getChildCount();return n%2!==0&&n++,n/=2,26*n+4}()),className:"venue-marker",html:function(){for(var t="",r=n._clusterToMarkers(e),a=0;a<r.length;a++)t+=n._venueToMarkerHTML(r[a]._venue);return t}()})},this.venueClusterGroup=new L.MarkerClusterGroup(e),this.map.addLayer(this.venueClusterGroup)},InteractiveVenueMap.prototype._jumpTo=function(e,n,t){e&&n&&t&&(n.closePopup(),this.venueClusterGroup.zoomToShowLayer(t,function(){t.openPopup()}))},InteractiveVenueMap.prototype._venueToPopup=function(e){var n=this,t=$jQueryAngular("<header />"),r=$jQueryAngular("<h1 />");t.append(r);var a=$jQueryAngular("<main />"),i=$jQueryAngular("<p />");a.append(i);var o=$jQueryAngular("<div />");o.append(t),o.append(a),i.text(e.description),r.text(e.name),t.css({background:"url("+e.image+")"});var u=this.venues.indexOf(e),s=$jQueryAngular('<a href="#" class="previous-venue">&laquo; Previous</a>').click(function(t){t.preventDefault();var r=n.venues[u-1];return n._jumpTo(n.map,e._marker,r._marker),!1}),p=$jQueryAngular('<span class="progress">'+(u+1)+"/"+this.venues.length+"</span>"),c=$jQueryAngular('<a href="#" class="next-venue">Next &raquo;</a>').click(function(t){t.preventDefault();var r=n.venues[u+1];return n._jumpTo(n.map,e._marker,r._marker),!1});return p.append(s),p.append(c),a.append(p),o[0]},InteractiveVenueMap.prototype._venueToMarkerHTML=function(e){var n="";return n+='<div class="venue" style="background: '+e._category.color+'">',n+=e._subCategory.icon?'<img src="'+e._subCategory.icon+'">':"",n+="</div>"},InteractiveVenueMap.prototype._venueToMarker=function(e){var n=L.marker(new L.LatLng(e.lat,e.lng),{icon:L.divIcon({popupAnchor:L.point(0,-15),iconSize:L.point(30,30),className:"venue-marker",html:this._venueToMarkerHTML(e)}),title:e.name});n._venue=e,e._marker=n,n.bindPopup(this._venueToPopup(e),{}),this.venueClusterGroup.addLayer(n)},InteractiveVenueMap.prototype.render=function(e){this.venues=[],this.categories=e;for(var n=0;n<e.length;n++)for(var t=e[n],r=0;r<t.subCategories.length;r++)for(var a=t.subCategories[r],i=0;i<a.venues.length;i++)if(!t.hidden||!a.hidden){var o=a.venues[i];o._category=t,o._subCategory=a,this.venues.push(o)}for(var u=0;u<this.venues.length;u++)this._venueToMarker(this.venues[u]);this._initCategoryFilter()},InteractiveVenueMap.prototype.clearVenues=function(){delete this.categories,delete this.venues,this.venueClusterGroup.clearLayers()},InteractiveVenueMap.prototype.rerender=function(){var e=this.categories.slice();this.clearVenues(),this.render(e)};var InteractiveVenueMapModule=angular.module("InteractiveVenueMap",[]);InteractiveVenueMapModule.run(["$window",function(e){e.interactiveVenueMap.interactiveVenueMap=new InteractiveVenueMap(e.interactiveVenueMap.mapOptions,e.interactiveVenueMap.clusterOptions),e.interactiveVenueMap.interactiveVenueMap.render(e.interactiveVenueMap.venues)}]),InteractiveVenueMapModule.controller("FilterCtrl",["$scope","$window",function(e,n){e.venues=n.interactiveVenueMap.venues,e.selectedCategory=e.venues[0],e.changeCategory=function(n){e.selectedCategory=n},e.toggleCategory=function(e,t){if(t)t.hidden=!t.hidden,e.hidden=!0;else{e.hidden=!e.hidden;for(var r=0;r<e.subCategories.length;r++)e.subCategories[r].hidden=!0}n.interactiveVenueMap.interactiveVenueMap.rerender()},e.countVenues=function(e){for(var n=0,t=0;t<e.subCategories.length;t++)n+=e.subCategories[t].venues.length;return n};for(var t=0;t<e.venues.length;t++){var r=e.venues[t];e.toggleCategory(r),e.toggleCategory(r)}}]);