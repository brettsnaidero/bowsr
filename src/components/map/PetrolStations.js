import React, { Component } from 'react';

import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps';
import MarkerClusterer from "../../../node_modules/react-google-maps/lib/addons/MarkerClusterer";

import TestData from './TestData.json';

const PetrolStationsGoogleMap = withGoogleMap(props => (
    <GoogleMap
        defaultZoom={6}
        defaultCenter={{
            lat: props.myLat,
            lng: props.myLong
        }}
    >
        {/* Location Marker */}
        <Marker
            icon="http://lh3.googleusercontent.com/-jLpmi5h5b28/AAAAAAAAAAI/AAAAAAAAAL8/Fo8ODo5cDds/photo.jpg?sz=64"
            position={{
                lat: props.myLat,
                lng: props.myLong
            }}
        />
        {/* Petrol Stations */}
        <MarkerClusterer
            averageCenter
            enableRetinaIcons
            gridSize={60}
        >
            {Object.keys(props.markers).map((marker, index) => (
                <Marker
                    position={{
                        lat: props.markers[index].Lat,
                        lng: props.markers[index].Long
                    }}
                    key={index}
                />
            ))}
        </MarkerClusterer>
    </GoogleMap>
));

export default class PetrolStations extends Component {
    constructor(props) {
        super(props);

        this.state = {
          markers: [],
          myLocation: {
              lat: -33.025278,
              lng: 147.136111
          }
        }
    }

    componentDidMount() {
        // Prod version
        // fetch(`https://api.onegov.nsw.gov.au/FuelCheckApp/v1/fuel/prices/bylocation?latitude=-33.84888823904889&longitude=151.1923455396118&fuelType=U91&brands=SelectAll&radius=900&originLatitude=-32.2315&originLongitude=148.6330`)
        //     .then( res => res.json() )
        //     .then(data => {
        //         this.setState({
        //             markers: data
        //         });
        //     });

        // Local version
        this.setState({
            markers: TestData
        });

        this.getLocation();
    }

    render() {
        return (
            <PetrolStationsGoogleMap
                containerElement={
                    <div style={{ height: `100%` }} />
                }
                mapElement={
                    <div style={{ height: `100%` }} />
                }
                markers={this.state.markers}
                myLat={this.state.myLocation.lat}
                myLong={this.state.myLocation.lng}
                center={this.state.myLocation}
            />
        );
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation

    getLocation() {
        if ("geolocation" in navigator) {
            /* geolocation is available */
            let options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };

            function success(pos) {
                let crd = pos.coords;

                console.log('Your current position is:');
                console.log('Latitude : ' + crd.latitude);
                console.log('Longitude: ' + crd.longitude);
                console.log('More or less ' + crd.accuracy + ' meters.');
            };

            function error(err) {
                console.warn('ERROR(' + err.code + '): ' + err.message);
            };

            navigator.geolocation.getCurrentPosition(success, error, options);
        } else {
            /* geolocation IS NOT available */
        }
    }
}
