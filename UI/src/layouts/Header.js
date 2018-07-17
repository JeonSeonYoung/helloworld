import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header className="topbar">
                <nav className="navbar top-navbar navbar-expand-md navbar-light">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="/">
                            <b>
                                <i className="wi wi-sunset sj-white"></i>
                            </b>
                            <span className="sj-white">
                            HelloWorld
                        </span>
                        </a>
                    </div>
                    <div className="navbar-collapse">
                        <ul className="navbar-nav mr-auto mt-md-0">
                            <li className="nav-item dropdown mega-dropdown">
                                <a className="nav-link dropdown-toggle text-muted waves-effect waves-dark" href=""
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="ti-menu"></i>
                                </a>
                                <div className="dropdown-menu scale-up-left col-sm-5 col-md-3 col-lg-3">
                                <ul>
                                <li><a href="#">
                                <h4>채팅방 찾기</h4></a></li>
                                <li><a href="#"><h4>내 채팅방 리스트(3)</h4></a></li>
                                <li><a href="#"><h4>설정</h4></a></li>
                                <li><button type="button" data-toggle="modal" className="noButton"
                                data-target="#searchChat"><h4>채팅방 찾기</h4></button></li>
                                </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>

            </header>
        );
    }
}

export default Header;
