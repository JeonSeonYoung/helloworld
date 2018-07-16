import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import Main from '../../pages/Main';
import SearchFilter from "../../pages/SearchFilter";
import Login from "../../pages/Login";
import Chat from "../../pages/Chat";

class RouteGroup extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Header}/>
                <Route path="/login" component={Login}/>
                <Route path="/main" component={Main}/>
                <Route path="/about" component={Footer}/>
                <Route path="/searchFilter" component={SearchFilter}/>
                <Route path="/chat" component={Chat}/>
            </div>
        );
    }
}

export default RouteGroup;