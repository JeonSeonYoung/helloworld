import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import Main from '../../pages/Main';
import SearchFilter from "../../layouts/SearchFilter";

class RouteGroup extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Header}/>
                <Route path="/main" component={Main}/>
                <Route path="/about" component={Footer}/>
                <Route path="/searchFilter" component={SearchFilter}/>
            </div>
        );
    }
}

export default RouteGroup;