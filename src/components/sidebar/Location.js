import React, { Component } from 'react';
// import Select from 'react-select';
import VirtualizedSelect from 'react-virtualized-select';

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
            <h3>Location:</h3>
            <div className="location-fields">
                <VirtualizedSelect
                    name="form-field-name"
                    ref="fueltype"
                    placeholder="Select location..."
                    options={postcodes}
                    value={this.state.selectedValue}
                    onChange={this.updateValue.bind(this)}
                />
                <div>
                    <button onClick={this.props.getLocation} className={this.props.usingGeoLocation ? "location" : "nolocation"}>
                        <img src={locationMarker} alt="Location" />
                            { this.props.usingGeoLocation ? <span>Using current location</span> : <span>Not using location</span> }
                    </button>
                </div>
            </div>
          </div>
        )
    }
}
