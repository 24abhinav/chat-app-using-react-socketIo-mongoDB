import React, { Component } from 'react';

import '../scss/message.scss';
export default class Messages extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <React.Fragment>
                <div className="message-div">
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