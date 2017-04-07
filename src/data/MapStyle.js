let mapStyles = [{
    "featureType": "all",
    "elementType": "labels",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "administrative.neighborhood",
    "elementType": "all",
    "stylers": [{
        "visibility": "on"
    }]
}, {
    "featureType": "administrative.neighborhood",
    "elementType": "labels",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "landscape.man_made",
    "elementType": "all",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "landscape.natural",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#e8ecee"
    }]
}, {
    "featureType": "landscape.natural.terrain",
    "elementType": "all",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "poi.attraction",
    "elementType": "geometry.fill",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "poi.business",
    "elementType": "geometry.fill",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "poi.government",
    "elementType": "geometry.fill",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "poi.medical",
    "elementType": "geometry.fill",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "poi.place_of_worship",
    "elementType": "geometry.fill",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "poi.school",
    "elementType": "geometry.fill",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "poi.sports_complex",
    "elementType": "geometry.fill",
    "stylers": [{
        "visibility": "off"
    }]
},

{
    "featureType": "road",
    "elementType": "labels",
    "stylers": [{
        "visibility": "on"
    }]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [{
      "color": "#f3d042"
    }]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [{
        "visibility": "on"
    }]
}, {
    "featureType": "road.highway",
    "elementType": "labels.icon",
    "stylers": [{
        "saturation": "0"
    }, {
        "lightness": "29"
    }]
}, {
    "featureType": "road.highway.controlled_access", /* Big Highway */
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#ffb400"
    }]
}, {
    "featureType": "road.arterial",
    "elementType": "geometry.fill",
    "stylers": [{
        "visibility": "on"
    }, {
      "color": "#9ab4c2"
    }]
}, {
    "featureType": "road.arterial",
    "elementType": "labels.icon",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "road.local",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b5c2c9"
      }
    ]
}, {
    "featureType": "road.local",
    "elementType": "labels.icon",
    "stylers": [{
        "visibility": "off"
    }]
},

{
    "featureType": "transit",
    "elementType": "all",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "transit.station.airport",
    "elementType": "geometry.fill",
    "stylers": [{
        "hue": "#a000ff"
    }, {
        "saturation": "74"
    }]
}, {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#5dbedb"
    }]
},{
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#d2dde1"
      }
    ]
}];

export default mapStyles;
