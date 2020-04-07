import React, { Component } from 'react';

class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return(
            <React.Fragment>
                <section>
                    <div className="main-div">
                        <div className="sidebar">
                            <div id="OwnDetails">
                            </div>
                            <h3>GROUP MEMBERS</h3>

                            <div className="peaple">
                                <ul id="userList">
                                    <li>Abhinav</li>
                                </ul>
                            </div>

                            <button id="leaveBtn" className="leaveBtn">Leave Conversation</button>
                        </div>


                        <div className="body">
                            <div className="message-body">
                                <div className="messages" id="messages">
                                    <p>Hello G</p>
                                </div>
                            </div>
                            <div className="footer" id="footer">
                                <textarea id="message" placeholder="Enter Message Here"></textarea>
                                <button className="sendBtn">Send</button>
                                <button className="locBtn">Send Location</button>
                            </div>
                        </div>

                    </div>
                </section>
            </React.Fragment>
        )
    }
}

export default Sidebar;