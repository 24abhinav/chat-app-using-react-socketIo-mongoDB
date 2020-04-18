import React, { Component, useState } from 'react';

import groupLogo from '../assests/2357032.png';
import '../scss/message.scss';
import http from '../Services/general.service';
export default class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
    }

    componentDidMount() {
        this.fetchAllMessage();
    }

    async fetchAllMessage() {

        // alert(props.id);
        const response = await http.get('FETCH_GROUP_MESSAGE', this.props.id);
        this.setState({
            messages: response?.response?.data?.messages
        });

        console.log(this.state.messages);
    }

    render() {

        const newLocal = <em className="fa fa-arrow-down">h</em>;
        return(
            <React.Fragment>
                <div className="message-div">
                    <header className = "header">
                        <ul>
                            <li> <img src = {groupLogo} /> <sub className = "roomName">Group Name</sub> </li>
                        </ul>

                        <ul>
                            <li>
                                <select className = "room-option">
                                    <option selected disabled>Group</option>
                                    <option>Leave</option>
                                </select>
                            </li>
                        </ul>
                    </header>

                    <div className="message-container">
                        <div className = "messages recieved">
                            <p>Abhinav Anand <span>12:20 pm</span></p>
                            <h4>Kaise Ho bhai</h4>
                        </div>

                        <div className = "messages sent">
                            <p>Abhinav Anand <span>12:20 pm</span></p>
                            <h4>Kaise Ho bhai</h4>
                        </div>

                        <p className = "group-info">Ramesh Has Join this conversation</p>
                    </div>

                    <div className = "message-bottom">
                        <textarea></textarea>
                        <button className = "send">Send</button>
                        <button className = "send-loc">My Location</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}