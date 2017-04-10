import React, { Component } from 'react';
import Select from 'react-select';

export default class FuelType extends Component {
    constructor(props) {
        super(props);

        this.state = {
			    selectedValue: 'E10'
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
					{ value: 'E10', label: 'Ethanol 94 (E10)' },
          { value: 'U91', label: 'Unleaded 91' },
					{ value: 'E85', label: 'Ethanol 105 (E85)' },
					{ value: 'P95', label: 'Premium 95' },
          { value: 'P98', label: 'Premium 98' },
          { value: 'DL', label: 'Diesel' },
					{ value: 'PDL', label: 'Premium Diesel' },
					{ value: 'B20', label: 'Biodiesel 20' },
          { value: 'LPG', label: 'LPG' }
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
                searchable={false}
                clearable={false}
                className={ this.props.atBottom && 'bottom' }
              />
            </div>
        )
    }
}
