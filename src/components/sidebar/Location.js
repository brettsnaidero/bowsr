import React, { Component } from 'react';
import Select from 'react-select';

import locationMarker from '../../images/gps-fixed-indicator.svg'
import postcodes from '../../data/nswpostcodes';

export default class Location extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }


	updateValue(newValue) {
	    this.setState({
	      selectedValue: newValue
	    });

	    this.props.changeLocation(newValue);
	  }

  	render() {
        return (
          <div className="sidebar-location">
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
}
