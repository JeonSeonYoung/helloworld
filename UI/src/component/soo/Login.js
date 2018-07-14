import React, { Component } from 'react';
import './App.css';
import './resource/css/colors/blue.css';
import './resource/css/sj-style.css';
import './resource/css/style.css';
import TopNav from '../../resource/TopNav';
import Footer from '../../resource/Footer';

class Login extends Component {
    render() {
        return (
            <div>
                <header className="topbar">
                    <TopNav />
                </header>
                <Footer />
            </div>
        );
    }
}

export default Login;
