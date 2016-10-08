import React, { Component } from 'react';
import logo from '../images/logo.svg';

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            txt: 'Bowsr'
        }
    }
    render() {
        return (
            <header>
                <img src={logo} className="App-logo" alt="logo" />
                <h1>{this.state.txt}</h1>
            </header>
        )
    }
}
