import React, { Component } from 'react';
import '../scss/userProfile.scss';
import '../scss/global.scss';

import http from '../Services/general.service';

export default class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userDetails: {},
            editMode: false,
            errorMsg: ''
        }

        this.fetchUserDetails = this.fetchUserDetails.bind(this);
    }

    componentDidMount() {
        this.fetchUserDetails()
    }

    async fetchUserDetails() {
        const userDetails = await http.get('FETCH_USER_DETAILS');
        this.setState({
            userDetails: userDetails.response.data
        });
    }

    changeHandler(event) {
        // this.setState({
        //     userDetails[event.target.name]: event.target.value
        // });

        this.state.userDetails[event.target.name] = event.target.value
    }

    async saveEditData() {
        if(this.state.userDetails.old) {
            if(!this.state.userDetails.new || !this.state.userDetails.confirm) {
                this.setState({
                    errorMsg: 'Enter Your New Password!'
                });
                return;
            }

            if(this.state.userDetails.new !== this.state.userDetails.confirm) {
                this.setState({
                    errorMsg: 'Password don not match!'
                });
                return;
            }
        }

        const payload = {
            basic: {
                name: this.state.userDetails.name,
                mobile: this.state.userDetails.mobile
            },

            password: {
                new: this.state.userDetails?.new || false,
                old: this.state.userDetails?.old || false,
                confirm: this.state.userDetails?.confirm || false,
            }
        }

        this.setState({
            editMode: false
        });

        console.log(payload);
    }

 
    render() {
        return(
            <React.Fragment>
                <div className = "profile-main-div">
                    <div className = "section">
                        <div className="main-div">
                        <p className="errorMsg">{this.state.errorMsg}</p>
                            {this.state.editMode ? '' : <em className="fa fa-edit" onClick = {() => {this.setState({editMode: true})}}></em>}
                            <div className="left">
                                <h2>Personal Details</h2>
                                <input type="text" name = "name" onChange = {this.changeHandler.bind(this)} placeholder = {this.state?.userDetails?.name} className="form-control" disabled = {!this.state.editMode} autoFocus />
                                <input type="text" name = "email" onChange = {this.changeHandler.bind(this)} placeholder = {this.state?.userDetails?.email} className="form-control" disabled  />
                                <input type="text" name = "mobile" onChange = {this.changeHandler.bind(this)} placeholder = {this.state?.userDetails?.mobile} className="form-control" maxLength="10" disabled = {!this.state.editMode}/>
                            </div>
                            <div className="right">
                                <h2>Change Password</h2>
                                <input type="password" name = "old" onChange = {this.changeHandler.bind(this)} placeholder="Old Password"  className="form-control" disabled = {!this.state.editMode} />
                                <input type="password" name = "new" onChange = {this.changeHandler.bind(this)} placeholder="New Password" className="form-control" disabled = {!this.state.editMode} />
                                <input type="password" name = "confirm" onChange = {this.changeHandler.bind(this)} placeholder="Confirm New Password" className="form-control" disabled = {!this.state.editMode} />
                            </div>
                        </div>
                        {
                            this.state.editMode ? <button className="editSaveButton" onClick = {this.saveEditData.bind(this)}>Save Changes</button> : ''
                        }
                    </div>

                    <div className="toster-section">
                        <div className="success" >
                            <h2>Success</h2>
                            <p>Ho gya</p>
                        </div>
                        <br />
                        <div className="error">
                            <h2>Failed!</h2>
                            <p>Nhi hua</p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}