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
            active: 1,
            groupId: 0,
            refresh: true
        };

        this.changeUi = this.changeUi.bind(this);
        this.newRoom = this.newRoom.bind(this);
    }

    componentDidMount() {

    }

    changeUi(activeObj) {
        if(activeObj.message) {
            this.setState({
                active: undefined
            });
            setTimeout(() => {
                this.setState({
                    active: 1,
                    groupId: activeObj.id
                });
            }, 0);

        } else if (activeObj.profile) {
            this.setState({
                active: 2
            });
        } else if (activeObj.newGroup) {
            this.setState({
                active: 3
            });
        } else {
            this.setState({
                active: 4
            });
        }
    }

    newRoom() {
        this.setState({
            refresh: false
        });

        setTimeout(() => {
            this.setState({
                refresh: true
            });
        }, 0);
    }

    render() {

        const renderIntoRight = () => {
            var ui;
            if(this.state.active === 1) {
                return <Messages id = {this.state.groupId} error = {this.changeUi}/>
            } else if (this.state.active === 2) {
                return <UserProfile />
            } else if (this.state.active === 3) {
                return <NewGroup newRoomAlert = {this.newRoom} />
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
                    {
                        this.state.refresh ? <Sidebar changeUi = {this.changeUi}/> : ''
                    }
                    { renderIntoRight() }
                </div>
            </React.Fragment>
        )
    }
}