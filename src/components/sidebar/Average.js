import React, { Component } from 'react';

export default class Average extends Component {
    constructor(props) {
        super(props);

        this.state = {
            txt: 'this is the state txt'
        }
    }

    methodExample(e) {
        this.setState({
            txt: e.target.value
        })
    }

    render() {
        return (
            <div>
                <input type="text"
                    onChange={this.methodExample.bind(this)} 
                />
                <h1>{this.state.txt}</h1>
            </div>
        )
    }
}
