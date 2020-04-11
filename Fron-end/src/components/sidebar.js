import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../scss/sidenav.scss';
import '../scss/global.scss';

import http from '../Services/general.service';

class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: true,
            groups: [],
            activeGroup: 0,
        }
        this.changeGroup = this.changeGroup.bind(this);
    }

    async componentDidMount() {
        const allGroup = await http.get('GROUP_LIST');
        
        this.setState({
            groups: allGroup.response.data
        });

    }

    changeGroup(groupId) {
        this.setState({
            activeGroup: groupId
        });
    }

    render() {

        const listItems = this.state.groups.map((item) =>
            <li key = {item.roomId[0]._id} className = {this.state.activeGroup === item.roomId[0]._id ? 'active': ''} onClick = {() => this.changeGroup(item.roomId[0]._id)}>
                {item.roomId[0].RoomName}
            </li>
        );

        return(
            <React.Fragment>
                <div className = "sidebar-div">
                    <nav className = "navBar">
                        <h1 className = "global-heading">
                            CHATS
                            <button title = "New Group">+</button>
                        </h1>
                        <ul>
                         {listItems}
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