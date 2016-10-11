import React, { Component } from 'react';

import { GoogleMap, Marker, MarkerClusterer, withGoogleMap } from 'react-google-maps';
// import MarkerClusterer from "../../../node_modules/react-google-maps/lib/addons/MarkerClusterer";

import mapStyles from './MapStyle'; /* Styles object for Google map */
import TestData from './TestData.json'; /* Local version of petrol data */
import postcodes from './postcodes.json'; /* Postcode lats and longs */
import Pin from '../../images/pin.svg'; /* User location pin icon  */
import mapIcons from './MapIcons'; /* Petrol station brand logos */

function brandConvert(name) {
  switch(name) {
    case "Caltex":
      return "caltex";
      break;
    case "Caltex Woolworths":
      return "caltexWoolworths";
      break;
    case "Costco":
      return "costco";
      break;
    case "7-Eleven":
      return "sevenEleven";
      break;
    case "Metro Fuel":
      return "metroFuel";
      break;
    case "Mobil":
      return "mobil";
      break;
    case "Budget":
      return "budget";
      break;
    case "BP":
      return "bp";
      break;
    case "Speedway":
      return "speedway";
      break;
    case "Coles Express":
      return "colesExpress";
      break;
    default:
      return "independent";
  }
}

const PetrolStationsGoogleMap = withGoogleMap(props => (
    <GoogleMap
        defaultZoom={13}
        defaultCenter={{
            lat: props.center.lat,
            lng: props.center.lng
        }}
        defaultOptions={{
          styles: mapStyles
        }}
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
        ></Marker>
        {/* Petrol Stations */}
        {/* <MarkerClusterer
            averageCenter
            enableRetinaIcons
            gridSize={60}
        > */}
            {Object.keys(props.markers).map((marker, index) => {
              let labelText = props.markers[index].Price;
              let color = "#48c048";
              let colorDark = "#37a737";
              let brand = brandConvert(props.markers[index].Brand);
              let image = `data:image/svg+xml;charset=utf-8,` + encodeURIComponent(`<svg width="58" height="64" xmlns="http://www.w3.org/2000/svg" viewBox="-450 252 58 64">
              	<polygon fill="white" stroke="grey" stroke-width="1.5" points="-450,252 -450,310 -423.7,310 -421,316 -418.3,310 -392,310 -392,252 	"/>
              	<rect fill="${color}" stroke="${colorDark}" stroke-width="1.5" x="-450" y="252" width="58" height="19.3"/>
              	<text fill="white" style="font-family: sans-serif; font-weight: bold; font-size: 12px;" transform="matrix(1 0 0 1 -437.8086 265.625)">${labelText}</text>
                <image width="448" height="448" href="${mapIcons[brand]}" transform="matrix(6.250000e-002 0 0 6.250000e-002 -435.0313 276.5417)"/>
              </svg>`);

              return (
                <Marker
                    position={{
                        lat: props.markers[index].Lat,
                        lng: props.markers[index].Long
                    }}
                    key={index}
                    icon={image}
                >
                    {/* <InfoWindow>
                        <div>{props.markers[index].Brand}</div>
                        <div>{props.markers[index].Name}</div>
                        <div>{props.markers[index].Price}</div>
                    </InfoWindow> */}
                </Marker>
              )
            })}
        {/* </MarkerClusterer> */}
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

                console.log('More or less ' + crd.accuracy + ' meters.');

                let myLocation = {
                    lat: crd.latitude,
                    lng: crd.longitude
                }

                self.setState({
                    myLocation: myLocation
                });
                // This centers the map on the users location
                self.refs.map.state.map.setCenter(myLocation);
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
                options={{
                  styles: mapStyles
                }}
                ref="map"
            />
        );
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
}
