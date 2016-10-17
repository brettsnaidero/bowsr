import React, { Component } from 'react';

import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps';
// import MarkerClusterer from "../../node_modules/react-google-maps/lib/addons/MarkerClusterer";

import _ from 'lodash';
// import createHistory from './'

import mapStyles from './map/MapStyle'; /* Styles object for Google map */
// import postcodes from './map/nswpostcodes.js'; /* Postcode lats and longs */
import Pin from '../images/pin.svg'; /* User location pin icon  */

import mapIcons from '../utils/map-icons';
import brandConvert from '../utils/brand-convert';

// let colors = [
//   "#0B486B",
//   "#3B8686",
//   "#79BD9A",
//   "#A8DBA8",
//   "#CFF09E"
// ]

const PetrolStationsGoogleMap = withGoogleMap(props => (
    <GoogleMap
        defaultCenter={{
            lat: props.center.lat,
            lng: props.center.lng
        }}
        defaultOptions={{
          styles: mapStyles
        }}
        onMapMounted={props.handleMapMounted}
        onZoomChanged={props.onZoomChanged}
        onBoundsChanged={props.onBoundsChanged}
        zoom={props.zoom}
        ref={props.onMapMounted}
        mapTypeControl={false}
        inViewMarkers={props.inViewMarkers}
    >
        {/* Location Marker */}
        <Marker
            icon={{
              url: Pin,
              anchor: {
                x: 29,
                y: 58
              },
              scaledSize: {
                width: 58,
                height: 58
              },
              size: {
                width: 58,
                height: 58
              }
            }}
            draggable={true}
            position={{
                lat: props.center.lat,
                lng: props.center.lng
            }}
            key="location-marker"
            highest={props.highest}
            lowest={props.lowest}
        ></Marker>
        {/* Petrol Stations */}
        {/* <MarkerClusterer
            averageCenter
            enableRetinaIcons
            gridSize={10}
        > */}
            {_.map(props.inViewMarkers, (marker, key) => {
              let color;
              let diff = (props.highest - props.lowest) / 5;
              if (marker.Price >= (props.lowest + (diff * 4))) {
                color = "red";
              } else if (marker.Price >= (props.lowest + (diff * 3))) {
                color = "blue";
              }  else if (marker.Price >= (props.lowest + (diff * 2))) {
                color = "blue";
              }  else if (marker.Price >= (props.lowest + (diff * 1))) {
                color = "blue";
              } else if (marker.Price >= props.lowest) {
                color = "#48c048";
              }

              if (props.zoom < 13) {
                let icon = {
                  path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
                  fillColor: color,
                  fillOpacity: .8,
                  anchor: {
                    x: 0,
                    y: 0
                  },
                  strokeWeight: 1,
                  strokeColor: "#37a737",
                  scale: 0.25
                }
                return (
                  <Marker
                      position={{
                          lat: marker.Lat,
                          lng: marker.Long
                      }}
                      key={key}
                      icon={icon}
                  >
                  </Marker>
                )
              } else {
                let labelText = marker.Price;
                let brand = brandConvert(marker.Brand);
                let image = `data:image/svg+xml;charset=utf-8,` + encodeURIComponent(`<svg width="43.5" height="48" xmlns="http://www.w3.org/2000/svg" viewBox="-450 252 58 64">
                  <defs>
                    <filter id="dropshadow">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
                      <feOffset dx="0" dy="0" result="offsetblur" />
                      <feFlood flood-color="#000" flood-opacity="1" />
                      <feComposite in2="offsetblur" operator="in" />
                      <feMerge>
                        <feMergeNode/>
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                	<polygon style="filter:url(#dropshadow)" fill="white" stroke="white" stroke-width="0" points="-450,252 -450,310 -423.7,310 -421,316 -418.3,310 -392,310 -392,252 	"/>
                	<rect fill="${color}" x="-450" y="252" width="58" height="19.3"/>
                	<text fill="white" style="font-family: sans-serif; font-weight: bold; font-size: 12px;" transform="matrix(1 0 0 1 -437.8086 265.625)">${labelText}</text>
                  <image width="448" height="448" href="${mapIcons[brand]}" transform="matrix(6.250000e-002 0 0 6.250000e-002 -435.0313 276.5417)"/>
                </svg>`);

                return (
                  <Marker
                      position={{
                          lat: marker.Lat,
                          lng: marker.Long
                      }}
                      key={key}
                      icon={image}
                  >
                      {/* <InfoWindow>
                          <div>{props.markers[index].Brand}</div>
                          <div>{props.markers[index].Name}</div>
                          <div>{props.markers[index].Price}</div>
                      </InfoWindow> */}
                  </Marker>
                )
              }

            })}
        {/* </MarkerClusterer> */}
    </GoogleMap>
));

export default class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
          zoom: 14,
          bounds: {},
          myLocation: {
              lat: -33.8688,
              lng: 151.2093
          }
        }
    }

    calculateThings() {
        let data = this.props.inViewMarkers;

        let highest = null;
        let lowest = null;
        let total = 0;
        let length = 1;
        let average = 0;

        _.map(data, (marker, index) => {
            let price = parseInt(marker.Price);
            if ( price > highest || highest == null ) {
                highest = price;
            }
            if ( price < lowest || lowest == null ) {
                lowest = price;
            }
            length++;
            total += price;
        });
        average = total / length;

        this.setState({
          lowest: lowest,
          highest: highest,
          average: average
        });
    }

    handleMapMounted(map) {
      this._map = map;
    }

    componentDidMount() {
        let self = this;

        // Get user geolocation if available
        if ("geolocation" in navigator) {
            /* geolocation is available */
            let options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };

            function success(pos) {
                let crd = pos.coords;

                let myLocation = {
                    lat: crd.latitude,
                    lng: crd.longitude
                }

                self.setState({
                    myLocation: myLocation
                });

                // Center map on user location
                self.refs.map.state.map.setCenter(myLocation);
            };

            function error(err) {
                console.warn('ERROR(' + err.code + '): ' + err.message);

                self.setState({
                    myLocation: {
                        lat: -33.8688,
                        lng: 151.2093
                    }
                })
            };

            navigator.geolocation.getCurrentPosition(success, error, options);
        } else {
            /* geolocation IS NOT available */
            self.setState({
                myLocation: {
                    lat: -33.8688,
                    lng: 151.2093
                }
            })
        }
    }

    handleZoomChanged() {
      const nextZoom = this._map.getZoom();
      if (nextZoom !== this.state.zoom) {
        // Notice: Check zoom equality here,
        // or it will fire zoom_changed event infinitely
        this.setState({
          zoom: nextZoom
        });
      }
    }

    render() {
        return (
            <div className="map">
                <PetrolStationsGoogleMap
                    containerElement={
                        <div style={{ height: `100%` }} />
                    }
                    mapElement={
                        <div style={{ height: `100%` }} />
                    }
                    markers={this.props.markers}
                    center={this.state.myLocation}
                    onMapMounted={this.handleMapMounted.bind(this)}
                    options={{
                      styles: mapStyles
                    }}
                    zoom={this.state.zoom}
                    onZoomChanged={this.handleZoomChanged.bind(this)}
                    onBoundsChanged={this.props.findMarkersInBounds}
                    ref="map"
                    highest={this.props.highest}
                    lowest={this.props.lowest}
                    mapTypeControl={false}
                    inViewMarkers={this.props.inViewMarkers}
                />
            </div>
        );
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
}
