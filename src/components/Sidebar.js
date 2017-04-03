import React, { Component } from 'react';

import _ from 'lodash';

import Location from './sidebar/Location';
import FuelType from './sidebar/FuelType';
import CheapestNearest from './sidebar/CheapestNearest';
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
                  inViewMarkers={this.props.inViewMarkers}
			            fuelType={this.props.fuelType}
                  lowest={this.props.lowest}
                  highest={this.props.highest}
                  fuelType={this.props.fuelType}
                />
                <CheapestNearest
                  inViewMarkers={this.props.inViewMarkers}
                />
            </div>
        )
    }
}
