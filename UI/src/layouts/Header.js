import React, { Component } from 'react';
import SideNav from './SideNav';

class Header extends Component {
    render() {
        return (
            <header className="topbar">
                <nav className="navbar top-navbar navbar-expand-md navbar-light">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="index.html">
                            <b>
                                <i className="wi wi-sunset sj-white"></i>
                            </b>
                            <span className="sj-white">
                            HelloWorld
                        </span>
                        </a>
                    </div>
                    <SideNav/>
                </nav>
            </header>
        );
    }
}

export default Header;
