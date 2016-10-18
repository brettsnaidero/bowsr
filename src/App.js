import React, { Component } from 'react';

import './css/style.scss';

import _ from 'lodash';

// import db from './db';
// import createHistory from 'history';

import TestData from './TestData.json'; /* Local version of petrol data */

// let Users = db.ref('lists');
// Users.push({
//   name: '',
//
// })
// Users.on('value', snapshot => {
//   this.setState({
//     users: snapshot.val()
//   })
// })

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Map from './components/Map';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
          markers: null,
          inViewMarkers: null,

		  usingGeoLocation: false,
		  myLocation: {
              lat: -33.8688,
              lng: 151.2093
          },

		  fuelType: 'U10'
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
        //     })
        //     .error(err => {
        //          console.log(err);
        //     });

        // Local version
        self.setState({
            markers: TestData
        });

        self.calculateThings(TestData);
    }

	getLocation() {
		let self = this;
		// Get user geolocation if available
        if ('geolocation' in navigator) {
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
					usingGeoLocation: true,
                    myLocation: myLocation
                });

                // Center map on user location
                self.refs.map._map.panTo(myLocation);
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

	changeLocation() {

	}

    findMarkersInBounds() {
      const bounds = this.refs.map._map.getBounds();
      if (bounds !== this.state.bounds) {
        // Notice: Check bounds equality here,
        // or it will fire bounds_changed event infinitely
        this.setState({
          bound: bounds
        });
      }

      let inViewMarkers = [];
      _.map(this.state.markers, (marker, item) => {
        let position = {
          lat: marker.Lat,
          lng: marker.Long
        }
        if ( bounds.contains(position) ) {
          inViewMarkers.push(marker);
        }
      });

      this.setState({
        inViewMarkers: inViewMarkers
      });

      this.calculateThings();
    }

    calculateThings() {
        let highest = null;
        let lowest = null;
        let total = 0;
        let length = 1;
        let average = 0;

        _.map(this.state.inViewMarkers, (marker, index) => {
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

    render() {
        return (
            <div className='app'>
                <Header />
                <div className='main'>
                    <Sidebar
                      markers={this.state.markers}
                      lowest={this.state.lowest}
                      highest={this.state.highest}
                      average={this.state.average}
                      inViewMarkers={this.state.inViewMarkers}
					  usingGeoLocation={this.state.usingGeoLocation}
					  getLocation={this.getLocation.bind(this)}
                    />
                    <Map
                      ref='map'
                      markers={this.state.markers}
                      myLocation={this.state.myLocation}
                      lowest={this.state.lowest}
                      highest={this.state.highest}
                      average={this.state.average}
                      findMarkersInBounds={this.findMarkersInBounds.bind(this)}
                      inViewMarkers={this.state.inViewMarkers}
					  getLocation={this.getLocation.bind(this)}
					  changeLocation={this.changeLocation}
                    />
                </div>
            </div>
        );
    }
}
