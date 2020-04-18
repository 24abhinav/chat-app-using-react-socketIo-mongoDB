import React, { Component } from 'react';
import http from '../Services/general.service';

import '../scss/userProfile.scss';
import '../scss/global.scss';

export default class NewGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            RoomName: '',
            error: '',
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.createARoom = this.createARoom.bind(this);
    }

    changeHandler(e) {
        this.setState({
            RoomName: e.target.value
        })
    }

    async createARoom() {
        console.log(this.state);

        const roomDetials = await http.post('CHAT_ROOM', {RoomName: this.state.RoomName});
        if(roomDetials.Error) {
            this.setState({
                error: 'Server Error'
            });
        } else {
            this.props.newRoomAlert();
        }
    }


    render() {


        return (
            <React.Fragment>
                <div className = "profile-main-div">
                    <div className = "section">
                        <p className="errorMsg">Error hai</p>
                        <div className="main-div">
                            <div className="left">
                                <h2>Create New Group</h2>
                                <input type="text" className="form-control" placeholder = "Group Name" onChange = {this.changeHandler}/>
                                <input type="text" className="form-control" placeholder = "Group Id " disabled />
                                <input type="file" className="form-control" id = "roomLogo" />
                                <label className = "roomLogo" for = "roomLogo">
                                    <em className = "fa fa-upload"></em>
                                    <span>Group Images</span>
                                </label>

                            </div>
                        </div>

                        <button className="editSaveButton" onClick = {this.createARoom}>Create Group</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}