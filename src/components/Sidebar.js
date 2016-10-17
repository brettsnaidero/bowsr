import React, { Component } from 'react';

import _ from 'lodash';

import Location from './sidebar/Location';
import Average from './sidebar/Average';
import FuelType from './sidebar/FuelType';
import PriceRange from './sidebar/PriceRange';
import CheapestNearest from './sidebar/CheapestNearest';

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sidebar">
                <Location markers={this.props.markers}/>
                <FuelType />
                <PriceRange
                  lowest={this.props.lowest}
                  highest={this.props.highest}
                  average={this.props.average}/>
                <Average />
                <CheapestNearest
                  inViewMarkers={this.props.inViewMarkers}
                />
            </div>
        )
    }
}
