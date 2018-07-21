import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
                            <li>
                                <Link to="/"
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

                            {/* Login 테스트 코드 */}
                            <li className="nav-devider"></li>
                            <li>
                                <Link to="/login" className="waves-effect waves-dark"  aria-expanded="false">
                                    <i className="ti-settings"></i>
                                    <span className="hide-menu">
                                        로그인
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