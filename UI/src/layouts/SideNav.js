import React, { Component } from 'react';
import Modal from '../pages/Modal';
import SearchChat from "../pages/SearchChat";

class SideNav extends Component {
    state = {
        id: this.props.id
    }

    openModal(text){

        // this.setState({
        //     id: text
        // })
    }

    render() {
        return (
            <aside className="left-sidebar">
                <div className="scroll-sidebar">
                    <div className="user-profile">
                        <div className="profile-img"><img src="../assets/images/users/profile.png" alt="user"/></div>
                        <div className="profile-text">
                            <a href="#" role="button">Markarn Doe</a>
                        </div>
                    </div>
                    <nav className="sidebar-nav">
                        <ul id="sidebarnav">
                            <li className="nav-small-cap">PERSONAL</li>
                            <li><a className="waves-effect waves-dark" href="#"
                                   data-toggle="modal" data-target="#searchChat" aria-expanded="false"><i
                                className="ti-search"></i><span className="hide-menu">채팅방 찾기</span></a>
                            </li>
                            <li className="nav-devider"></li>
                            <li><a className="waves-effect waves-dark" href="#" aria-expanded="false"><i
                                className="mdi mdi-book-multiple"></i><span className="hide-menu">채팅방 리스트</span></a>
                            </li>
                            <li className="nav-devider"></li>
                            <li><a className="waves-effect waves-dark" href="#" aria-expanded="false"><i
                                className="ti-settings"></i><span className="hide-menu">설정</span></a>
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