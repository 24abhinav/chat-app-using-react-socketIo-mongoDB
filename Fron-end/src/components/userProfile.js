import React, { Component } from 'react';
import '../scss/userProfile.scss';
import '../scss/global.scss';

export default class UserProfile extends Component {
    constructor(props) {
        super(props);
    }
 
    render() {
        return(
            <React.Fragment>
                <div className = "profile-main-div">
                    <div className = "section">
                        <p className="errorMsg">Error hai</p>
                        <div className="main-div">
                            <em className="fa fa-edit"></em>
                            <div className="left">
                                <h2>Personal Details</h2>
                                <input type="text" className="form-control" />
                                <input type="text" className="form-control" disabled  />
                                <input type="text" className="form-control" maxLength="10" />
                            </div>
                            <div className="right">
                                <h2>Change Password</h2>
                                <input type="password" placeholder="Old Password"  className="form-control" />
                                <input type="password" placeholder="New Password" className="form-control" />
                                <input type="password" placeholder="Confirm New Password" className="form-control" />
                            </div>
                        </div>

                        <button className="editSaveButton">Save Changes</button>
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