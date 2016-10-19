import React, { Component } from 'react';
import Select from 'react-select';

import locationMarker from '../../images/gps-fixed-indicator.svg'
import postcodes from '../map/nswpostcodes';

export default class Location extends Component {
    constructor(props) {
        super(props);

        this.state = {
          options: [
            { value: 'hey', label: 'hey' }
          ]
        }
    }


	updateValue(newValue) {
    this.setState({
      selectedValue: newValue
    });
  }

  render() {
        return (
          <div className="sidebar-location">
  	        <h3>Search by postcode</h3>
            <Select
                name="form-field-name"
                ref="fueltype"
                options={postcodes}
      					value={this.state.selectedValue}
      					onChange={this.updateValue.bind(this)}
            />
    				<button onClick={this.props.getLocation} className={this.props.usingGeoLocation ? "location" : "nolocation"}>
              <img src={locationMarker} />
    					{ this.props.usingGeoLocation ? <span>Using location</span> : <span>Not using location</span> }
    				</button>
          </div>
        )
    }

    lookupLocation() {

    }
}
