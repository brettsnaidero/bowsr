import React, { Component } from 'react';

import _ from 'lodash';

import Location from './sidebar/Location';
import FuelType from './sidebar/FuelType';
import InView from './sidebar/InView';

export default class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <div className="sidebar-options">
                    <Location
                      markers={this.props.markers}
                      usingGeoLocation={this.props.usingGeoLocation}
                      getLocation={this.props.getLocation}
                      changeLocation={this.props.changeLocation}
                    />
                    <FuelType
                      changeFuelType={this.props.changeFuelType}
                    />
                </div>
                <InView
                  prices={this.props.prices}
                  inViewMarkers={this.props.inViewMarkers}
			            fuelType={this.props.fuelType}
                  lowest={this.props.lowest}
                  highest={this.props.highest}
                  flipMobile={this.props.flipMobile}
                  mobileShow={this.props.mobileShow}
                />
            </div>
        )
    }
}
