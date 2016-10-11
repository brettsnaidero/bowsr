import React, { Component } from 'react';

export default class PriceRange extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        console.log(this.refs);
        return (
            <div className="sidebar-pricerange">
                <div>
                    {/* Lowest: {this.refs.map.state.inArea.lowest} */}
                </div>
                <div>
                    {/* Highest: {self.refs.map.state.inArea.highest} */}
                </div>
                <div>
                    {/* Average: {self.refs.map.state.inArea.average} */}
                </div>
            </div>
        )
    }
}
