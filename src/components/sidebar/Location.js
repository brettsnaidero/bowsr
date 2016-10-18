import React, { Component } from 'react';
import Select from 'react-select';

// import postcodes from './map/nswpostcodes.js'; /* Postcode lats and longs */

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
    }

    render() {
		let getOptions = [
		    { value: 'one', label: 'One' },
		    { value: 'two', label: 'Two' }
		];
        return (
            <div className="sidebar-location">
				<h3>Search by postcode</h3>
                <Select
                    name="form-field-name"
                    ref="fueltype"
					value={this.state.selectedValue}
					onChange={this.updateValue.bind(this)}
					loadOptions={getOptions}
                />
				<button onClick={this.props.getLocation}>
					{ this.props.usingGeoLocation ? <div>Using location</div> : <div>Not using location</div> }
				</button>
            </div>
        )
    }

    lookupLocation() {

    }
}
