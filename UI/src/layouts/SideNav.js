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
        
        console.log("SideNav");
        console.log(login)
        console.log(fbData);
        
        return (
            <aside className="left-sidebar">
                <div className="scroll-sidebar">
                    <div className="user-profile">
                        <div className="profile-img"><img src="../assets/images/users/profile.png" alt="user"/></div>
                        <div className="profile-text">
                            <a href={null} role="button">Markarn Doe</a>
                        </div>
                    </div>
                    <nav className="sidebar-nav">
                        <ul id="sidebarnav">
                            <li className="nav-small-cap">PERSONAL</li>
                            <li>
                                <Link to="/"
                                      onClick={this.closeNav}
                                      className="waves-effect waves-dark"
                                      aria-expanded="false">
                                    <i className="ti-search"></i>
                                    <span className="hide-menu">채팅방 검색</span>
                                </Link>
                            </li>
                            <li className="nav-devider"></li>
                            <li>
                                <Link to="/chatlist"
                                      className="waves-effect waves-dark"
                                      aria-expanded="false">
                                    <i className="mdi mdi-book-multiple"></i>
                                    <span className="hide-menu">채팅방 리스트</span>
                                </Link>
                            </li>
                            <li className="nav-devider"></li>
                            <li>
                                <Link to="/setting"
                                      className="waves-effect waves-dark"
                                      aria-expanded="false">
                                    <i className="ti-settings"></i>
                                    <span className="hide-menu">설정</span>
                                </Link>
                            </li>

                            <li className="nav-devider"></li>
                            <li>
                                <Link to={{
                                    pathname: '/login',                                    
                                    state: { login: login }
                                }} className="waves-effect waves-dark"  aria-expanded="false">

                                    <i className="ti-settings"></i>
                                    <span className="hide-menu">
                                        {login ? "로그아웃" : "로그인"}
                                    </span>
                                </Link>
                            </li>

                        </ul>
                    </nav>
                    {this.props.children}
                </div>
            </aside>

        );
    }
}

export default SideNav;
// onClick={() => { this.openModal("searchChat") }}
// <Modal id={this.state.id} />