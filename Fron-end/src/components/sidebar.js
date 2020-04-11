import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../scss/sidenav.scss';
import '../scss/global.scss';

var Modal = require('react-bootstrap-modal')
class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: true
        }
    }

    render() {

        let closeModal = () => this.setState({ open: false })
 
        let saveAndClose = () => {
            this.setState({ open: false })
        }

        return(
            <React.Fragment>
                <div className = "sidebar-div">
                    <nav className = "navBar">
                        <h1 className = "global-heading">
                            CHATS
                            <button title = "New Group">+</button>
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

                    {/* Create group Modal */}

                    <Modal
                    show={this.state.open}
                    onHide={closeModal}
                    aria-labelledby="ModalHeader"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id='ModalHeader'>A Title Goes here</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Some Content here</p>
                        </Modal.Body>
                        <Modal.Footer>
                            // If you don't have anything fancy to do you can use
                            // the convenient `Dismiss` component, it will
                            // trigger `onHide` when clicked
                            <Modal.Dismiss className='btn btn-default'>Cancel</Modal.Dismiss>
                
                            // Or you can create your own dismiss buttons
                            <button className='btn btn-primary' onClick={saveAndClose}>
                            Save
                            </button>
                        </Modal.Footer>
                    </Modal>
                    
                </div>
            </React.Fragment>
        )
    }
}

export default Sidebar;