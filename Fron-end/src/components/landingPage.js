import React, { Component } from 'react';
import '../scss/landingPage.scss';
import Sidebar from './sidebar';
import { Route } from 'react-router-dom';
import UserProfile from './userProfile';
import Messages from './Messages';
import NewGroup from './newGroup';
import Cookie from 'js-cookie';
import { renderIntoDocument, act } from 'react-dom/test-utils';

export default class LandingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: 0,
            groupId: 0,
        };

        this.changeUi = this.changeUi.bind(this);
    }

    componentDidMount() {

    }

    changeUi(activeObj) {
        console.log(activeObj);
        if(activeObj.message) {
            this.setState({
                active: 1,
                groupId: activeObj.id
            });
        } else if (activeObj.profile) {
            this.setState({
                active: 2
            });
        } else {
            this.setState({
                active: 3
            });
        }
    }

    render() {

        const renderIntoRight = () => {
            var ui;
            if(this.state.active === 1) {
                return <Messages id = {this.state.groupId}/>
            } else if (this.state.active === 2) {
                return <UserProfile />
            } else if (this.state.active === 3) {
                return <NewGroup />
            } else {
                return (
                    <div className=  "welcome-message">
                        <h1>Welcome to the group Chat App</h1>
                    </div>
                )
            }
        }

        return (
            <React.Fragment>
                <div className = "landing-page">
                    <Sidebar changeUi = {this.changeUi}/>
                    { renderIntoRight() }
                </div>
            </React.Fragment>
        )
    }
}