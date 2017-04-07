import React, { Component } from 'react';
import { GoogleMap, OverlayView, withGoogleMap } from 'react-google-maps';

import _ from 'lodash';
// import createHistory from './'

import mapStyles from '../data/MapStyle'; /* Styles object for Google map */
import Pin from '../images/pin.svg'; /* User location pin icon  */

import mapIcons from '../utils/map-icons';
import brandConvert from '../utils/brand-convert';

const PetrolStationsGoogleMap = withGoogleMap(props => {
    return (
        <GoogleMap
            defaultCenter={{
                lat: props.center.lat,
                lng: props.center.lng
            }}
            defaultOptions={{
              styles: mapStyles,
              streetViewControl: false,
              mapTypeControl: false
            }}
            onMapMounted={props.handleMapMounted}
            onZoomChanged={props.onZoomChanged}
            onBoundsChanged={props.onBoundsChanged}
            zoom={props.zoom}
            ref={props.onMapMounted}
            mapTypeControl={false}
            inViewMarkers={props.inViewMarkers}
            markerClicked={props.markerClicked}
        >
            {/* Location Marker */}
            <OverlayView
                position={{
                    lat: props.center.lat,
                    lng: props.center.lng
                }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                getPixelPositionOffset={(width, height) => {
                    return { x: -(width / 2), y: -(height / 2) };
                }}
            >
                <div className="radius"></div>
            </OverlayView>
            <OverlayView
                position={{
                    lat: props.center.lat,
                    lng: props.center.lng
                }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                getPixelPositionOffset={(width, height) => {
                    return { x: -(width / 2), y: -(height) };
                }}
                draggable={true}
            >
                <div style={{ position: "relative", zIndex: "99", height: "58px", width: "58px" }}>
                    <img src={Pin} alt="Pin" />
                </div>
            </OverlayView>
            {/* Petrol Station Markers */}
            {_.map(props.inViewMarkers, (marker, key) => {
                let color;
                let diff = (props.highest - props.lowest) / 3;
                let price;
                let hasFuel = false;
                if (marker.Prices.find(x => x.FuelType === props.fuelType)) {
                    price = marker.Prices.find(x => x.FuelType === props.fuelType).Price;
                    hasFuel = true;
                }
                if (price) {
                    if (price >= (props.lowest + (diff * 2))) {
                        color = `#f43b5f`;
                    }  else if (price >= (props.lowest + (diff * 1))) {
                        color = `#5f8ef2`;
                    } else if (price >= props.lowest) {
                        color = `#2db530`;
                    }
                } else {
                    price = `N/A`;
                    color = `#000000`;
                }
                if (marker.openMarker) {
                    let brand = brandConvert(marker.Brand);
                    return (
                        <OverlayView
                            position={{
                                lat: marker.Lat,
                                lng: marker.Long
                            }}
                            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                            getPixelPositionOffset={(width, height) => {
                                return { x: -(width / 2), y: -(height) };
                            }}
                            key={key}
                        >
                            <div
                                id={"marker" + marker.ServiceStationID}
                                className={"marker bringtofront withtail " + (hasFuel ? "has" : "hasnt")}
                                style={{ zIndex: key }}
                            >
                                <div className="open-marker">
                                    <button
                                        className="close-marker"
                                        onClick={() => { props.closeMarker(marker) }}
                                    ><div className="icon">Close</div></button>
                                    <div className="name" style={{ backgroundColor: color }}>{marker.Name}</div>
                                    <div className="price"><span>{price}</span> cents per litre</div>
                                    <div className="distance">{marker.Distance}km from your location</div>
                                    <div className="goto" target="_blank"><a href={`https://maps.google.com?daddr=${escape(marker.Name)}`} title="Get directions">Get directions to {marker.Name}</a></div>
                                    {/* <div className="brand">
                                        <img src={mapIcons[brand]} alt={brand} />
                                    </div> */}
                                    <div className="tooltip--tip"></div>
                                </div>
                            </div>
                        </OverlayView>
                    )
                }
                if (props.zoom < 13) {
                    return (
                        <OverlayView
                            position={{
                                lat: marker.Lat,
                                lng: marker.Long
                            }}
                            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                            getPixelPositionOffset={(width, height) => {
                                return { x: -(width / 2), y: -(height / 2) };
                            }}
                            key={key}
                        >
                          <div
                              id={"marker" + marker.ServiceStationID}
                              className={"small-marker " + (hasFuel ? "has" : "hasnt")}
                              style={{ backgroundColor: color, zIndex: key }}
                              onClick={() => { props.markerClick(marker) }}
                          ></div>
                        </OverlayView>
                    )
                } else {
                    let brand = brandConvert(marker.Brand);
                    return (
                        <OverlayView
                            position={{
                                lat: marker.Lat,
                                lng: marker.Long
                            }}
                            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                            getPixelPositionOffset={(width, height) => {
                                return { x: -(width / 2), y: -(height) };
                            }}
                            key={key}
                        >
                            <div
                                id={"marker" + marker.ServiceStationID}
                                className={"marker" + (props.zoom > 15 ? " withtail " : " withsmalltail ") + (hasFuel ? " has " : " hasnt ")}
                                style={{ zIndex: key }}
                                onClick={() => { props.markerClick(marker) }}
                            >
                                <div className={props.zoom > 15 ? "huge-marker" : props.zoom > 13 ? "big-marker" : "kindabig-marker" }>
                                    <div className="price" style={{ backgroundColor: color }}>{price}</div>
                                    <div className="brand">
                                        <img src={mapIcons[brand]} alt={brand} />
                                    </div>
                                    <div className="tooltip--tip"></div>
                                </div>
                            </div>
                        </OverlayView>
                    )
                }
            })}
        </GoogleMap>
    )
});

export default class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
          zoom: 13
        }
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
                    options={{
                      styles: mapStyles
                    }}
                    zoom={this.state.zoom}
					          onMapMounted={this.handleMapMounted.bind(this)}
                    onZoomChanged={this.handleZoomChanged.bind(this)}
                    onBoundsChanged={this.props.findMarkersInBounds}
                    ref="map"
                    highest={this.props.highest}
                    lowest={this.props.lowest}
                    mapTypeControl={false}
                    inViewMarkers={this.props.inViewMarkers}
					          fuelType={this.props.fuelType}
                    markerClick={this.props.markerClick}
                    closeMarker={this.props.closeMarker}
                />
            </div>
        );
    }
}
