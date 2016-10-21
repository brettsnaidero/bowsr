import React, { Component } from 'react';
import Select from 'react-select';

export default class FuelType extends Component {
    constructor(props) {
        super(props);

        this.state = {
			selectedValue: 'U91'
        }
    }

	  updateValue(newValue) {
		this.setState({
			selectedValue: newValue
		});

        this.props.changeFuelType(newValue.value);
    }

    render() {
    		let options = [
    		    { value: 'U91', label: 'U91' },
    		    { value: 'P98', label: 'P98' },
	            { value: 'DL', label: 'DL' },
	            { value: 'LPG', label: 'LPG' },
	            { value: 'PDL', label: 'PDL' }
    		];
        return (
            <div className="sidebar-fueltype">
              <Select
                name="fuelType"
                searchPromptText="Choose fuel type"
                ref="fueltype"
                options={options}
                value={this.state.selectedValue}
                onChange={this.updateValue.bind(this)}
              />
            </div>
        )
    }
}
