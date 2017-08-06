import React, {Component} from 'react';

import './css/style.scss';

import _ from 'lodash';
import 'whatwg-fetch';
import moment from 'moment';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Map from './components/Map';
import MobileBottom from './components/MobileBottom';

const oauth = {
  "refresh_token_expires_in": "0",
  "api_product_list": "[Fuel Check Portal Api]",
  "api_product_list_json": ["Fuel Check Portal Api"],
  "organization_name": "onegov",
  "developer.email": "brettsnaidero@hotmail.com",
  "token_type": "BearerToken",
  "issued_at": "1498611516218",
  "client_id": "ZVHfquojtog6qMadocy44inUrTwJQ7kX",
  "access_token": "zASGe2nvp5eZgvW2mMkhwFvozKXQ",
  "application_name": "f4e82c12-1dc9-4af3-8d33-1d5b967844a3",
  "scope": "",
  "expires_in": "43199",
  "refresh_count": "0",
  "status": "approved"
}

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prices: [],
      markers: [],
      inViewMarkers: [],

      apiKey: 'ZVHfquojtog6qMadocy44inUrTwJQ7kX',
      apiSecret: '8xp0mCDn8hBsneO0',
      accessToken: '',

      usingGeoLocation: false,
      myLocation: {
        lat: -33.8688,
        lng: 151.2093
      },

      fuelType: 'E10',

      mobileShow: false
    }
  }

  randomString(length) {
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

    if (!length) {
      length = Math.floor(Math.random() * chars.length);
    }

    let str = '';
    for (var i = 0; i < length; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  }

  getToken() {
    const fetchUrl = 'https://api.onegov.nsw.gov.au/oauth/client_credential/accesstoken?grant_type=client_credentials';
    const base64 = window.btoa(`${this.state.apiKey}:${this.state.apiSecret}`);
    const myRequest = new Request('/proxy/server', {
      method: 'get',
      headers: new Headers({
        'Target-URL': fetchUrl,
        'Authorization': `Basic ${base64}`,
        'dataType': 'json',
        'grant_type': 'client_credentials',
      }),
      mode: 'cors',
      withCredentials: true
    });

    fetch(myRequest).then(res => {
      if (res.ok) {
        return res.json();
      } else {
        console.log('Network response was not ok.');
        window.alert('There was an error connecting, please try again later.');
      }
    }).then(data => {
      console.log('data', data);
      this.setState({
        accessToken: data.access_token,
      }, () => this.fetchData());
    }).catch(err => {
      console.log(err);
    });
  }

  fetchData() {
    let self = this;
    let randomId = this.randomString(6);
    let timestamp = moment().format('DD/MM/YYYY hh:mm:ss A');
    let body = {
      "fueltype": this.state.fuelType,
      "latitude": this.state.myLocation.lat,
      "longitude": this.state.myLocation.lng,
      "radius": "30",
      "sortby": "price",
      "sortascending": "true"
    };
    body = JSON.stringify(body);
    console.log('accessToken', this.state.accessToken);
    const fetchUrl = `https://api.onegov.nsw.gov.au/FuelPriceCheck/v1/fuel/prices/nearby`;
    let myRequest = new Request('/proxy/server', {
      method: 'post',
      headers: new Headers({
        'Target-URL': fetchUrl,
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': true,
        'Authorization': `Bearer ${this.state.accessToken}`,
        'apikey': this.state.apiKey,
        'transactionid': randomId,
        'requesttimestamp': timestamp
      }),
      body: body,
      mode: 'cors',
      withCredentials: true
    });

    // Prod version
    fetch(myRequest).then(res => {
      if (res.ok) {
        return res.json();
      } else {
        console.log('Network response was not ok.');
        window.alert('Could not connect, the petrol price service could be experiencing downtime, or you may not be connected to the internet. Please try again later.');
      }
    }).then(data => {
      console.log(data);
      self.setState({
        prices: data.prices,
        markers: data.stations
      }, () => {
        self.findMarkersInBounds();
      });
    }).catch(err => {
      console.log(err);
    });
  }

  flipMobile() {
    let mobileShow = !this.state.mobileShow;
    this.setState({mobileShow: mobileShow})
  }

  changeMobile(tabChange) {
    this.setState({mobileShow: tabChange})
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
        }, () => {
          self.getToken();
        });

        // Center map on user location
        self.refs.map._map.panTo(myLocation);
      };

      function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
        window.alert('Sorry, could not retrieve your location. Please search for your city or suburb name.');
        self.getToken();
      };

      navigator.geolocation.getCurrentPosition(success, error, options);
    }
  }

  changeLocation(newLocation) {
    this.setState({
      usingGeoLocation: false,
      myLocation: newLocation.location
    }, () => {
      this.fetchData();
    });
    // Center map on user location
    this.refs.map._map.panTo(newLocation.location);
  }

  changeFuelType(newFuelType) {
    this.setState({
      fuelType: newFuelType
    }, () => {
      this.fetchData();
    });
  }

  findMarkersInBounds() {
    const bounds = this.refs.map._map.getBounds();
    if (bounds !== this.state.bounds) {
      // Notice: Check bounds equality here,
      // or it will fire bounds_changed event infinitely
      this.setState({bound: bounds});
    }

    let inViewMarkers = [];
    _.map(this.state.markers, (marker, item) => {
      let position = {
        lat: marker.location.latitude,
        lng: marker.location.longitude
      }
      if (marker.code === this.state.openMarker) {
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
    _.map(this.state.inViewMarkers, (marker, index) => {
      let price;
      this.state.prices.forEach((obj) => {
        if (obj.stationcode === marker.code) {
          price = obj.price;
        };
      });
      if (price) {
        if (price > highest || highest == null) {
          highest = price;
        }
        if (price < lowest || lowest == null) {
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
      openMarker: marker.code
    }, () => {
      this.findMarkersInBounds();
    })

    // Center map on user location
    this.refs.map._map.panTo({lat: marker.location.latitude, lng: marker.location.longitude});
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
        <Header flipMobile={this.flipMobile.bind(this)} changeMobile={this.changeMobile.bind(this)} mobileShow={this.state.mobileShow}/>
        <div className={'main ' + (this.state.mobileShow
          ? 'left'
          : 'right')}>
          <Sidebar
            prices={this.state.prices}
            markers={this.state.markers}
            lowest={this.state.lowest}
            highest={this.state.highest} average={this.state.average} inViewMarkers={this.state.inViewMarkers} usingGeoLocation={this.state.usingGeoLocation} getLocation={this.getLocation.bind(this)} changeLocation={this.changeLocation.bind(this)} changeFuelType={this.changeFuelType.bind(this)} fuelType={this.state.fuelType} flipMobile={this.flipMobile.bind(this)} mobileShow={this.state.mobileShow}/>
          <Map
            ref='map'
            prices={this.state.prices}
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
        <MobileBottom markers={this.state.markers} lowest={this.state.lowest} highest={this.state.highest} average={this.state.average} inViewMarkers={this.state.inViewMarkers} usingGeoLocation={this.state.usingGeoLocation} getLocation={this.getLocation.bind(this)} changeLocation={this.changeLocation.bind(this)} changeFuelType={this.changeFuelType.bind(this)} fuelType={this.state.fuelType} flipMobile={this.flipMobile.bind(this)} mobileShow={this.state.mobileShow}/>
      </div>
    );
  }
}
