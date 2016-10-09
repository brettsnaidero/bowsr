import React, { Component } from 'react';

import { GoogleMap, Marker, InfoWindow, withGoogleMap } from 'react-google-maps';
import MarkerClusterer from "../../../node_modules/react-google-maps/lib/addons/MarkerClusterer";

import mapStyles from './MapStyle';
import TestData from './TestData.json';

const PetrolStationsGoogleMap = withGoogleMap(props => (
    <GoogleMap
        defaultZoom={13}
        defaultCenter={{
            lat: props.center.lat,
            lng: props.center.lng
        }}
        ref="mapitself"
    >
        {/* Location Marker */}
        <Marker
            icon="http://lh3.googleusercontent.com/-jLpmi5h5b28/AAAAAAAAAAI/AAAAAAAAAL8/Fo8ODo5cDds/photo.jpg?sz=64"
            position={{
                lat: props.center.lat,
                lng: props.center.lng
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
                >
                    {/* <InfoWindow>
                        <div>{props.markers[index].Brand}</div>
                        <div>{props.markers[index].Name}</div>
                        <div>{props.markers[index].Price}</div>
                    </InfoWindow> */}
                </Marker>
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
        let self = this;

        console.log(mapStyles);

        // Prod version
        // fetch(`https://api.onegov.nsw.gov.au/FuelCheckApp/v1/fuel/prices/bylocation?latitude=-33.84888823904889&longitude=151.1923455396118&fuelType=U91&brands=SelectAll&radius=900&originLatitude=-32.2315&originLongitude=148.6330`)
        //     .then( res => res.json() )
        //     .then(data => {
        //         this.setState({
        //             markers: data
        //         });
        //     });

        // Local version
        self.setState({
            markers: TestData
        });

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

                let myLocation = {
                    lat: crd.latitude,
                    lng: crd.longitude
                }

                self.setState({
                    myLocation: myLocation
                });
                // This centers the map on the users location
                self.refs.map.state.map.panTo(myLocation);
            };

            function error(err) {
                console.warn('ERROR(' + err.code + '): ' + err.message);

                self.setState({
                    myLocation: {
                        lat: -33.025278,
                        lng: 147.136111
                    }
                })
            };

            navigator.geolocation.getCurrentPosition(success, error, options);
        } else {
            /* geolocation IS NOT available */
            self.setState({
                myLocation: {
                    lat: -33.025278,
                    lng: 147.136111
                }
            })
        }

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
                center={this.state.myLocation}
                styles={mapStyles}
                ref="map"
            />
        );
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
}
