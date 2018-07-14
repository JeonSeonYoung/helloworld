import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';

class RouteGroup extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Header}/>
                <Route path="/about" component={Footer}/>
            </div>
        );
    }
}

export default RouteGroup;