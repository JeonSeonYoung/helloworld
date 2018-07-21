import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import Main from '../../pages/Main';
import SearchChat from "../../pages/SearchChat";
import SearchFilter from "../../layouts/SearchFilter";
import Login from "../../pages/Login";
import Mapp from '../../pages/Mapp';
import SideNav from "../../layouts/SideNav";
import Setting from "../../pages/Setting";
import Modal from "../../pages/Modal";
import Chat from "../../pages/Chat";
import ChatList from "../../pages/ChatList";
import Register from "../../pages/Register";

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
                            {/*<Route path="/agree" component={Agree}/>*/}
                            <Route path="/register" component={Register}/>
                            <Route path="/searchFilter" component={SearchFilter}/>
                            <Route path="/searchChat" component={SearchChat}/>
                            <Route path="/map" component={Mapp}/>
                            <Route path="/chat" component={Chat}/>
                            <Route path="/chatlist" component={ChatList}/>
                            <Route path="/setting" component={Setting}/>
                            <Footer/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RouteGroup;