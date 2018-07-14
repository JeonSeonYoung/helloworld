import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import Main from '../../pages/Main';
import Mapp from '../../pages/Mapp';
import ShowMapp from '../../pages/ShowMapp';
import SearchFilter from "../../pages/SearchFilter";
import Chat from "../../pages/Chat";

class RouteGroup extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Header}/>
                <Route path="/main" component={Main}/>
                <Route path="/about" component={Footer}/>
                <Route path="/searchFilter" component={SearchFilter}/>
                <Route path="/Map" component={Mapp}/>
                <Route path="/ShowMap" component={ShowMapp}/>
                <Route path="/chat" component={Chat}/>
            </div>
        );
    }
}

export default RouteGroup;
