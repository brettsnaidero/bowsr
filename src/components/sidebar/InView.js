import React, { Component } from 'react';
import _ from 'lodash';

import mapIcons from '../../utils/map-icons';
import brandConvert from '../../utils/brand-convert';

export default class InView extends Component {
    constructor(props) {
        super(props);

        this.state = {
          sortType: 'price'
        }
    }

    componentWillReceiveProps() {
      if (this.state.sortType === 'price') {
        this.sortByCheapest();
      } else {
        this.sortByNearest();
      }
    }

    sortByCheapest() {
    		let self = this;

    		function compare(a,b) {
    			let priceA = a.Prices.find(x => x.FuelType === self.props.fuelType).Price;
    			let priceB = b.Prices.find(x => x.FuelType === self.props.fuelType).Price;
    			if (priceA > priceB) {
    				return -1;
    			}
    			if (priceA < priceB) {
    				return 1;
    			}
    		}
    		if (this.props.inViewMarkers) {
    			// Remove markers for petrol stations not stocking the specified fuel type
    			let sortedMarkers = this.props.inViewMarkers.filter(marker => {
    				if ( marker.Prices.find(x => x.FuelType === self.props.fuelType) ) {
    					return marker.Prices.find(x => x.FuelType === self.props.fuelType).Price;
    				} else {
                        return null;
                    }
    			});
    			// Sort those markers
    			sortedMarkers = sortedMarkers.sort(compare);
    			this.setState({
    				sortedMarkers: sortedMarkers
    			});
    		}
    }

    sortByNearest() {

    }

    render() {
      return (
        <div className="location-inview">
            {_.map(this.state.sortedMarkers, (marker, index) => {
              let brand = brandConvert(marker.Brand);

              let diff = (this.props.highest - this.props.lowest) / 3;
              let price;
              let hasFuel = false;
              let color;
              if (marker.Prices.find(x => x.FuelType === this.props.fuelType)) {
                  price = marker.Prices.find(x => x.FuelType === this.props.fuelType).Price;
                  hasFuel = true;
              }
              if (price) {
                  if (price >= (this.props.lowest + (diff * 2))) {
                      color = `#f43b5f`;
                  }  else if (price >= (this.props.lowest + (diff * 1))) {
                      color = `#bc5ff2`;
                  } else if (price >= this.props.lowest) {
                      color = `#5a6cf2`;
                  }
              } else {
                  price = `No ${this.props.fuelType}`;
                  color = `#000000`;
              }
              return (
                <div className={"sidebar-station " + index} key={index}>
                    <div className="icon">
                      <img src={mapIcons[brand]} alt={brand} />
                    </div>
                    <div className="name">{marker.Name}</div>
                    <div className="price" style={{ color: color }}>{marker.Price}</div>
                </div>
              )
            })}
        </div>
      )
    }
}
