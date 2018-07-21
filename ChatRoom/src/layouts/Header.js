import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
                                    <li>
                                        <Link to="/"
                                              className="waves-effect waves-dark"
                                              aria-expanded="false">
                                            <h4>채팅방 검색</h4>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/chatlist"
                                              className="waves-effect waves-dark"
                                              aria-expanded="false">
                                            <h4>채팅방 리스트</h4>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/setting"
                                              className="waves-effect waves-dark"
                                              aria-expanded="false">
                                            <h4>설정</h4>
                                        </Link>
                                    </li>
                                </ul>
                                </div>
                            </li>
                        </ul>


                        {this.props.children}
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;
