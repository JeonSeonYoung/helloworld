import React, { Component } from 'react';

class SideNav extends Component {
    render() {
        return (
            <div className="App">
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
                </nav>
            </div>
        );
    }
}

export default SideNav;
