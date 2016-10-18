import React, { Component } from 'react';

import _ from 'lodash';

import mapIcons from '../../utils/map-icons';
import brandConvert from '../../utils/brand-convert';

export default class CheapestNearest extends Component {
    constructor(props) {
        super(props);

        this.state = {
          cheapest: ''
        }
    }

    render() {
        return (
            <div className="sidebar-bottom">
              <h3>Cheapest in view:</h3>
              { this.findCheapest() }
            </div>
        )
    }

    findCheapest() {
        let inViewMarkers = this.props.inViewMarkers;
        let lowest = null;
        let lowestIndex = null;
        if(inViewMarkers && inViewMarkers.length > 0) {
            _.map(inViewMarkers, (marker, index) => {
                let price = marker.Price;
                if ( price < lowest || lowest == null ) {
                    lowest = price;
                    lowestIndex = index;
                }
            });
            let brand = brandConvert(inViewMarkers[lowestIndex].Brand);
            return (
              <div className="sidebar-station">
                  <div className="icon">
                    <img src={mapIcons[brand]} alt={brand} />
                  </div>
                  <div className="name">{inViewMarkers[lowestIndex].Name}</div>
                  <div className="price">{inViewMarkers[lowestIndex].Price}</div>
              </div>
            )
        } else {
          return (
            <div className="sidebar-station">No petrol stations currently in view</div>
          )
        }
    }
}
