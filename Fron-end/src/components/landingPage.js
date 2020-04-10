import React, { Component } from 'react';
import '../scss/landingPage.scss';
import Sidebar from './sidebar';
import { Route } from 'react-router-dom';
import UserProfile from './userProfile';

export default class LandingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <div className = "landing-page">
                    <Sidebar />
                    <UserProfile />
                </div>
            </React.Fragment>
        )
    }
}