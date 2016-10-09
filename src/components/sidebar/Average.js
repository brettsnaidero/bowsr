import React, { Component } from 'react';

export default class Average extends Component {
    constructor(props) {
        super(props);

        this.state = {
            average: '123.2'
        }
    }

    render() {
        return (
            <div className="sidebar-averageprice">
                <div>Average price in this area</div>
                <div>${this.state.average}</div>
            </div>
        )
    }
}
