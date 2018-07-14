import React, { Component } from 'react';
import '../resources/css/colors/blue.css';
import '../resources/css/sj-style.css';
import '../resources/css/style.css';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";

class Common extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={Header}/>
                    <Route path="/about" component={Footer}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default Common;
