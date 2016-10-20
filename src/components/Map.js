import React, { Component } from 'react';
import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps';

import _ from 'lodash';
// import createHistory from './'

import mapStyles from '../data/MapStyle'; /* Styles object for Google map */
import Pin from '../images/pin.svg'; /* User location pin icon  */

import mapIcons from '../utils/map-icons';
import brandConvert from '../utils/brand-convert';

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
            {_.map(props.inViewMarkers, (marker, key) => {
              let color;
              let diff = (props.highest - props.lowest) / 3;
			        if (marker.Price >= (props.lowest + (diff * 2))) {
                color = "#f43b5f";
              }  else if (marker.Price >= (props.lowest + (diff * 1))) {
                color = "#bc5ff2";
              } else if (marker.Price >= props.lowest) {
                color = "#5a6cf2";
              }

              if (props.zoom < 13) {
				        let scale = ((props.zoom < 13) ? ((props.zoom < 11) ? 0.15 : 0.25) : 0.5);
                let icon = {
                  path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
                  fillColor: color,
                  fillOpacity: 0.9,
                  anchor: {
                    x: 0,
                    y: 0
                  },
                  strokeWeight: 0,
                  strokeColor: "#37a737",
                  scale: scale
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
                let image = `data:image/svg+xml;charset=utf-8,` + encodeURIComponent(`<svg ${ props.zoom > 14 ? `width="87" height="96"` : `width="58" height="64"` } xmlns="http://www.w3.org/2000/svg" viewBox="-450 252 58 64">
                  <defs>
                    <filter id="dropshadow">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
                      <feOffset dx="0" dy="0" result="offsetblur" />
                      <feFlood flood-color="#000" flood-opacity="0.5" />
                      <feComposite in2="offsetblur" operator="in" />
                      <feMerge>
                        <feMergeNode/>
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                	<polygon style="filter:url(#dropshadow)" fill="white" stroke="gray" stroke-width="0.25" points="-450,252 -450,310 -423.7,310 -421,316 -418.3,310 -392,310 -392,252 	"/>
                	<rect fill="${color}" stroke="gray" stroke-width="0.25" x="-450" y="252" width="58" height="19.3"/>
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
    </GoogleMap>
));

export default class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
          zoom: 14,
          bounds: {}
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
            if ( marker.Price > highest || highest == null ) {
                highest = marker.Price;
            }
            if ( marker.Price < lowest || lowest == null ) {
                lowest = marker.Price;
            }
            length++;
            total += marker.Price;
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

		self.props.getLocation();
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
                    center={this.props.myLocation}
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
