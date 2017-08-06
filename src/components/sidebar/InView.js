import React, {Component} from 'react';
import _ from 'lodash';

import mapIcons from '../../utils/map-icons';
import brandConvert from '../../utils/brand-convert';

export default class InView extends Component {
  constructor(props) {
    super(props);

    this.compare = this.compare.bind(this);

    this.state = {
      sortType: 'price'
    }
  }

  componentWillReceiveProps() {
    if ((this.state.sortType === 'price') && (this.props.inViewMarkers.length > 0)) {
      this.sortByCheapest();
    } else {
      this.sortByNearest();
    }
  }

  compare(a, b) {
    if (a.code && b.code) {
      let priceA = undefined;
      this.props.prices.forEach((obj) => {
        if (obj.stationcode === a.code) {
          priceA = obj.price;
        };
      });
      let priceB = undefined;
      this.props.prices.forEach((obj) => {
        if (obj.stationcode === b.code) {
          priceB = obj.price;
        };
      });
      if (priceA < priceB) {
        return -1;
      }
      if (priceA > priceB) {
        return 1;
      }
    }

    return 0;
  }

  sortByCheapest() {
    if (this.props.inViewMarkers) {
      // Remove markers for petrol stations not stocking the specified fuel type
      let sortedMarkers = this.props.inViewMarkers.filter(marker => {
        let price = undefined;
        if (marker.code) {
          this.props.prices.forEach((obj) => {
            if (obj.stationcode === marker.code) {
              price = obj.price;
            };
          });
        }
        if (price) {
        	return price;
        } else {
          return null;
        }
      });
      // Sort those markers
      sortedMarkers = sortedMarkers.sort(
        this.compare
      );
      this.setState({sortedMarkers: sortedMarkers});
    }
  }

  sortByNearest() {}

  hoverStation(markerID) {
    // let marker = document.querySelector(`#marker${markerID}`);
  }

  clickStation(markerID) {
    let marker = document.querySelector(`#marker${markerID}`);
    marker.click();

    // Move to map view if on mobile
    this.props.flipMobile();
  }

  render() {
    return (
      <div className="location-inview">
        {_.map(this.state.sortedMarkers, (marker, index) => {
          let brand = brandConvert(marker.brand);

          let diff = (this.props.highest - this.props.lowest) / 3;
          let price;
          // let hasFuel = false;
          let color;
          this.props.prices.forEach((obj) => {
            if (obj.stationcode === marker.code) {
              price = obj.price;
            };
          });
          if (price) {
            if (price >= (this.props.lowest + (diff * 2))) {
              color = `#f43b5f`;
            } else if (price >= (this.props.lowest + (diff * 1))) {
              color = `#5f8ef2`;
            } else if (price >= this.props.lowest) {
              color = `#2db530`;
            }
          } else {
            price = `N/A`;
            color = `#000000`;
          }
          return (
            <div className={"sidebar-station " + index} key={index} onClick={() => this.clickStation(marker.code)}>
              <div className="icon">
                <img src={mapIcons[brand]} alt={brand}/>
              </div>
              <div className="name">
                {marker.name}
                <div className="distance">{marker.location.distance}km away</div>
              </div>
              <div className="price" style={{
                color: color
              }}>{price}</div>
            </div>
          )
        })}
      </div>
    )
  }
}
