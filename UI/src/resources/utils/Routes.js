import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import Main from '../../pages/Main';
import SearchFilter from "../../layouts/SearchFilter";
import Mapp from '../../pages/Mapp';
import ShowMapp from '../../pages/ShowMapp';

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
            </div>
        );
    }
}

export default RouteGroup;