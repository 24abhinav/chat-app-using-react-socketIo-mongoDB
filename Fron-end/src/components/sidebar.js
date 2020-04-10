import React, { Component } from 'react';
import '../scss/sidenav.scss';
import '../scss/global.scss';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return(
            <React.Fragment>
                <div className = "sidebar-div">
                    <nav className = "navBar">
                        <h1 className = "global-heading">
                            CHATS
                            <span title = "Create New">+</span>
                        </h1>
                        <ul>
                            <li className="active">Group 1</li>
                            <li>Group 1</li>
                            <li>Group 1</li>
                            <li>Group 1</li>
                        </ul>
                    </nav>

                    <div className = "sidebar-bottom">
                        <Link className = "profile-link" to = "/profile">
                            <em className="fa fa-user"></em>
                            <h3>Abhinav Anand</h3>
                        </Link>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Sidebar;