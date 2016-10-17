import React, { Component } from 'react';

export default class PriceRange extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div className="sidebar-pricerange">
                <div>
                    Lowest: {this.props.lowest}
                </div>
                <div>
                    Highest: {this.props.highest}
                </div>
                <div>
                    Average: {this.props.average}
                </div>
            </div>
        )
    }
}
