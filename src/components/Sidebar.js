import React, { Component } from 'react';

import Location from './sidebar/Location';

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
                <div className="sidebar-fueltype">

                </div>
                <div className="sidebar-pricerange">

                </div>
                <div className="sidebar-averageprice">

                </div>
            </div>
        )
    }
}
