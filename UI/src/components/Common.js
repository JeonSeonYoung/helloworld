import React, { Component } from 'react';
// import '../App.css';
import '../resources/css/colors/blue.css';
import '../resources/css/sj-style.css';
import '../resources/css/style.css';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

class Common extends Component {
    render() {
        return (
            <div>
               <Header />
                <Footer />
            </div>
        );
    }
}

export default Common;
