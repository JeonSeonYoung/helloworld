import React, { Component } from 'react';
import SideNav from './SideNav';

class Header extends Component {
    render() {
        return (
            <header className="topbar">
                <SideNav />
            </header>
        );
    }
}

export default Header;
