import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import Main from '../../pages/Main';
import SearchFilter from "../../pages/SearchFilter";
import Login from "../../pages/Login";
import Mapp from '../../pages/Mapp';
import SideNav from "../../layouts/SideNav";
import Modal from "../../pages/Modal";

//import ShowMapp from '../../pages/ShowMapp';

class RouteGroup extends Component {
    render() {
        return (
            <div>
                <div id="main-wrapper">
                    <Header/>
                    <SideNav/>
                    <Modal id="searchChat" />
                    <div className="page-wrapper">
                        <div className="container-fluid">
                            <Route exact path="/" component={Main}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/searchFilter" component={SearchFilter}/>
                            <Route path="/Map" component={Mapp}/>
                            <Footer/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RouteGroup;