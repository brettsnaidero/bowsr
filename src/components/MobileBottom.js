import React, { Component } from 'react';

import _ from 'lodash';

import Location from './sidebar/Location';
import FuelType from './sidebar/FuelType';

export default class MobileBottom extends Component {
    render() {
        return (
            <div className="bottom-mobile">
                <Location
                  markers={this.props.markers}
                  usingGeoLocation={this.props.usingGeoLocation}
                  getLocation={this.props.getLocation}
                  changeLocation={this.props.changeLocation}
                  atBottom={true}
                />
                <FuelType
                  changeFuelType={this.props.changeFuelType}
                  atBottom={true}
                />
            </div>
        )
    }
}
