import React, { Component } from 'react';

import './styles/App.css';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Map from './components/Map';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            txt: 'this is the state txt'
        }
    }

    render() {
        return (
            <div className="app">
                <Header />
                <div className="main">
                    <Sidebar />
                    <Map />
                </div>
            </div>
            );
    }
}
