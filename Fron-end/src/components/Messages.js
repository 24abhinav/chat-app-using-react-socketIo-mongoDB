import React, { Component, useState } from 'react';

import groupLogo from '../assests/2357032.png';
import '../scss/message.scss';
import http from '../Services/general.service';
export default class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomDetails: {},
            messages: [],
            userId: atob(sessionStorage.getItem('U'))
        }

        this.renderMessage = this.renderMessage.bind(this);
    }

    componentDidMount() {
        this.fetchAllMessage();
    }

    async fetchAllMessage() {

        // alert(props.id);
        if(!this.props.id || !this.state.userId) {
            this.props.error({home: true});
        } else {
            const response = await http.get('FETCH_GROUP_MESSAGE', this.props.id);
            this.setState({
                messages: response?.response?.data?.roomDetails[0]?.Messages,
                roomDetails: response?.response?.data?.roomDetails[0]
            });
        }
    }

    renderMessage() {
        console.log(this.state.messages);
        return this.state.messages.map((item,index) => {
            let ui;
            if(item.type === 1) {
                ui = <p key = {index} className = "group-info">{item.message}</p>
            } else if (item.type === 2) {
                ui = <p key = {index} className = "group-info text-danger">{item.message}</p>
            } else if (item.type === 3) {
                ui = <div key = {index} className = {item.memberId === this.state.userId ? 'messages sent': 'messages'} >
                        <p>{item.memberName} <span>{item.time}</span></p>
                        <h4>{item.message}</h4>
                    </div>
            } else {
                ui = <h4>Not yet Confirm</h4>
            }

            return ui;
        });
    }

    render() {
        return(
            <React.Fragment>
                <div className="message-div">
                    <header className = "header">
                        <ul>
                            <li> <img src = {groupLogo} /> <sub className = "roomName">{this.state.roomDetails?.RoomName}</sub> </li>
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
                        {/* <div className = "messages recieved">
                            <p>Abhinav Anand <span>12:20 pm</span></p>
                            <h4>Kaise Ho bhai</h4>
                        </div>

                        <div className = "messages sent">
                            <p>Abhinav Anand <span>12:20 pm</span></p>
                            <h4>Kaise Ho bhai</h4>
                        </div>

                        <p className = "group-info">Ramesh Has Join this conversation</p> */}

                        {this.renderMessage()}
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