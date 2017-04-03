import React, { Component } from 'react';

import './css/style.scss';

import _ from 'lodash';
import 'whatwg-fetch';

// import db from './db';
// import createHistory from 'history';

import TestData from './data/TestData.json'; /* Local version of petrol data */

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

    			fuelType: 'U91',

          mobileShow: true
        }
    }

    componentDidMount() {
        let self = this;

        // Prod version
        fetch(`https://api.onegov.nsw.gov.au/FuelCheckApp/v1/fuel/prices/bylocation?latitude=-33.84888823904889&longitude=151.1923455396118&fuelType=U91&brands=SelectAll&radius=900&originLatitude=-32.2315&originLongitude=148.6330`)
        // // fetch(`https://api.onegov.nsw.gov.au/FuelCheckApp/v1/fuel/prices/bylocation?latitude=-33.84888823904889&longitude=151.1923455396118`)
          .then( res => {
              if(res.ok) {
                return res.json();
              } else {
                console.log('Network response was not ok.');
                window.alert('Could not connect, the petrol price service could be experiencing downtime, or you may not be connected to the internet. Please try again later.');
              }
          })
          .then(data => {
              self.setState({
                  markers: data
              }, () => {
                self.findMarkersInBounds();
              });
          })
          .error(err => {
             console.log(err);
             // Local version
             self.setState({
                 markers: TestData
             });
          });

        // Local version
        // self.setState({
        //     markers: TestData
        // });
    }

    flipMobile() {
      let mobileShow = !this.state.mobileShow;
      this.setState({
        mobileShow: mobileShow
      })
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
                });
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

  	changeLocation(newLocation) {
    		this.setState({
    			usingGeoLocation: false,
    			myLocation: newLocation.location
    		});
    		// Center map on user location
    		this.refs.map._map.panTo(newLocation.location);
  	}

    changeFuelType(newFuelType) {
    		this.setState({
    			fuelType: newFuelType
    		}, () => {
    			this.calculateThings();
    		});
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
            if (marker.ServiceStationID === this.state.openMarker) {
                marker.openMarker = true;
            } else {
                marker.openMarker = false;
            }
            if (bounds.contains(position)) {
                inViewMarkers.push(marker);
            }
        });

        this.setState({
            inViewMarkers: inViewMarkers
        }, () => {
            this.calculateThings();
        });
    }

    calculateThings() {
        let highest = null;
        let lowest = null;
        let total = 0;
        let length = 1;
        let average = 0;
		    let fuelType = this.state.fuelType;
        _.map(this.state.inViewMarkers, (marker, index) => {
    			let price;
    			if (marker.Prices.find(x => x.FuelType === fuelType)) {
    				price = marker.Prices.find(x => x.FuelType === fuelType).Price;
    			}
    			if (price) {
    				if ( price > highest || highest == null ) {
                highest = price;
            }
            if ( price < lowest || lowest == null ) {
                lowest = price;
            }
            length++;
            total += price;
    			}
        });
        average = total / (length - 1);

        this.setState({
            lowest: lowest,
            highest: highest,
            average: average
        });
    }

    markerClick(marker) {
        this.setState({
            openMarker: marker.ServiceStationID
        }, () => {
            this.findMarkersInBounds();
        })

        // Center map on user location
    		this.refs.map._map.panTo({ lat: marker.Lat, lng: marker.Long });
    }

    closeMarker(marker) {
        this.setState({
            openMarker: null
        }, () => {
            this.findMarkersInBounds();
        });
    }

    render() {
        return (
            <div className='app'>
                <Header
                  flipMobile={this.flipMobile.bind(this)}
                  mobileShow={this.state.mobileShow}
                />
                <div className={'main ' + (this.state.mobileShow ? 'left' : 'right')}>
                    <Sidebar
                      markers={this.state.markers}
                      lowest={this.state.lowest}
                      highest={this.state.highest}
                      average={this.state.average}
                      inViewMarkers={this.state.inViewMarkers}
  					          usingGeoLocation={this.state.usingGeoLocation}
  					          getLocation={this.getLocation.bind(this)}
                      changeLocation={this.changeLocation.bind(this)}
                      changeFuelType={this.changeFuelType.bind(this)}
					            fuelType={this.state.fuelType}
                      flipMobile={this.flipMobile.bind(this)}
                      mobileShow={this.state.mobileShow}
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
                      fuelType={this.state.fuelType}
                      markerClick={this.markerClick.bind(this)}
                      closeMarker={this.closeMarker.bind(this)}
                    />
                </div>
            </div>
        );
    }
}
