import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';

import Login from '../pages/Login'

class SideNav extends Component {
    state = {
        id: this.props.id
    }

    openModal(text){

        // this.setState({
        //     id: text
        // })
    }

    closeNav() {
        console.log('close');
    }

    render() {

        // check cookie
        var fbData = cookie.load('fbData');
        var login = (typeof fbData === "undefined" || fbData == "") ? false : true; 

        return (
            <aside className="left-sidebar">
                <div className="scroll-sidebar">
                    <nav className="sidebar-nav">
                        <ul id="sidebarnav">
                            <li>
                                <a className="waves-effect waves-dark" href="/" aria-expanded="false">
                                    <i className="ti-search"></i><span className="hide-menu">Search Chat</span>
                                </a>
                            </li>
                            <li>
                                <a className="waves-effect waves-dark" href="/chatlist" aria-expanded="false">
                                    <i className="mdi mdi-book-multiple"></i><span className="hide-menu">Chat List</span>
                                </a>
                            </li>
                            <li>
                                <a className="waves-effect waves-dark" href="/setting" aria-expanded="false">
                                    <i className="ti-settings"></i><span className="hide-menu">Settings</span>
                                </a>
                            </li>
                            <li>
                                <a className="waves-effect waves-dark" href="#" aria-expanded="false">
                                    <i className="mdi mdi-logout"></i><span className="hide-menu">Logout</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        );
    }
}

export default SideNav;


// onClick={() => { this.openModal("searchChat") }}
// <Modal id={this.state.id} />