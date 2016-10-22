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
          { value: 'U91', label: 'Unleaded (U91)' },
          { value: 'P98', label: 'Premium Unleaded (P98)' },
          { value: 'DL', label: 'Diesel (DL)' },
          { value: 'LPG', label: 'LPG' },
          { value: 'PDL', label: 'PDL' }
    		];
        return (
            <div className="sidebar-fueltype">
              <h3>Fuel type:</h3>
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
