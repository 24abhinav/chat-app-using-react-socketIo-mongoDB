import React, { Component } from 'react';
import '../scss/landingPage.scss';
import Sidebar from './sidebar';

export default class LandingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <Sidebar />
            </React.Fragment>
        )
    }
}