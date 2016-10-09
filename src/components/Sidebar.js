import React, { Component } from 'react';

import Location from './sidebar/Location';
import Average from './sidebar/Average';
import FuelType from './sidebar/FuelType';
import PriceRange from './sidebar/PriceRange';

export default class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    onComponentMount() {

    }

    render() {
        return (
            <div className="sidebar">
                <Location />
                <FuelType />
                <PriceRange />
                <Average />
            </div>
        )
    }
}
