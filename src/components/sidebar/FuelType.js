import Select from 'react-select';
import React, { Component } from 'react';

var options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' }
];

export default class FuelType extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    logChange(val) {
        console.log("Selected: " + val);
    }

    render() {
        return (
            <div className="sidebar-fueltype">
                <Select
                    name="form-field-name"
                    value="one"
                    ref="fueltype"
                    options={options}
                    onChange={this.logChange}
                />
            </div>
        )
    }
}
