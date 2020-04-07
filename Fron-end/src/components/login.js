import React, { Component } from 'react';
import '../scss/login.scss';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return(
            <React.Fragment>
                <section>
                    <div className="main-div">
                        <div className="newRoom">
                            <h2>Create A new Room</h2>
                            <div className="form">
                                <label>Room Name</label>
                                <input type="text" id="newRoomName" />

                                <label>Room Id</label>
                                <input type="text" placeholder="Auto Created" disabled />

                                <label>Name</label>
                                <input type="text" id="userNameForNewRoom" placeholder="Enter your name" />

                                <button>Create Room</button>
                            </div>
                        </div>
                        <div className="newRoom">
                            <h2>Join chat Room</h2>

                            <div className="form">
                                <label>Room Name</label>
                                <input type="text" id="existingRoomName" />

                                <label>Room Id</label>
                                <input type="text" id="roomId" />

                                <label>Name</label>
                                <input type="text" id="userName" placeholder="Enter your name" />

                                <button>Join Room</button>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

export default Login