import React, { Component } from 'react';
// import ReactDOM from 'react-dom';

import PetrolStations from './map/PetrolStations';

export default class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return (
            <div className="map">
                <PetrolStations />
            </div>
        )
    }
}
