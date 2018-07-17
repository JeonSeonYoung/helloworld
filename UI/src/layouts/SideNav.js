import React, { Component } from 'react';
class SideNav extends Component {

    render() {
        return (
            <div className="navbar-collapse">
                <ul className="navbar-nav mr-auto mt-md-0">
                    <li className="nav-item dropdown mega-dropdown">
                        <a className="nav-link dropdown-toggle text-muted waves-effect waves-dark" href=""
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="ti-menu"></i>
                        </a>
                        <div className="dropdown-menu scale-up-left">
                            <ul>
                                <li><a href="/searchChat"><h4>채팅방 찾기</h4></a></li>
                                <li><a href="#"><h4>내 채팅방 리스트(3)</h4></a></li>
                                <li><a href="#"><h4>설정</h4></a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}

export default SideNav;