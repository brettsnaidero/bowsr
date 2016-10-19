import React, { Component } from 'react';
import Select from 'react-select';

export default class FuelType extends Component {
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
    		let options = [
    		    { value: 'one', label: 'One' },
    		    { value: 'two', label: 'Two' }
    		];
        return (
            <div className="sidebar-fueltype">
              <h3>Choose fuel type</h3>
              <Select
                name="form-field-name"
                ref="fueltype"
                options={options}
                value={this.state.selectedValue}
                onChange={this.updateValue.bind(this)}
              />
            </div>
        )
    }
}
