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
      if (this.state.sortType == 'price') {
        this.sortByCheapest();
      } else {
        this.sortByNearest();
      }
    }

    sortByCheapest() {
    		let self = this;

    		function compare(a,b) {
    			let priceA = a.Prices.find(x => x.FuelType == self.props.fuelType).Price;
    			let priceB = b.Prices.find(x => x.FuelType == self.props.fuelType).Price;
    			if (priceA > priceB) {
    				return -1;
    			}
    			if (priceA < priceB) {
    				return 1;
    				return 0;
    			}
    		}
    		if (this.props.inViewMarkers) {
    			// Remove markers for petrol stations not stocking the specified fuel type
    			let sortedMarkers = this.props.inViewMarkers.filter(marker => {
    				if ( marker.Prices.find(x => x.FuelType == self.props.fuelType) ) {
    					return marker.Prices.find(x => x.FuelType == self.props.fuelType).Price;
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
              return (
                <div className={"sidebar-station " + index} key={index}>
                    <div className="icon">
                      <img src={mapIcons[brand]} alt={brand} />
                    </div>
                    <div className="name">{marker.Name}</div>
                    <div className="price">{marker.Price}</div>
                </div>
              )
            })}
        </div>
      )
    }
}
