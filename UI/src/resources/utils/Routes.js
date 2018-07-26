import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import Login from "../../pages/Login";
import LoadingPage from "../../pages/Loading";
import Main from '../../pages/Main';
import Map from '../../pages/Map';
import Modal from "../../pages/Modal";
import Chat from "../../pages/Chat2";
import ChatList from "../../pages/ChatList";
import Register from "../../pages/Register";
import SearchChat from "../../pages/SearchChat";
import SearchFilter from "../../layouts/SearchFilter";
import SideNav from "../../layouts/SideNav";
import Setting from "../../pages/Setting";
import CreateChat from "../../pages/CreateChat";
// import { Redirect } from 'react-router-dom';
//import ShowMapp from '../../pages/ShowMapp';

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
    <Route {...rest} render={props => (
        <Layout>
            <Component {...props} />
        </Layout>
    )} />
)

const EmptyLayout = props => (
    <div>
        {props.children}
    </div>
)

const MainLayout = props => (
    <div>
        <Header/>
        <SideNav/>
        <Modal id="searchChat" />
        <div className="page-wrapper">
            <div className="container-fluid">
                {props.children}
                <Footer/>
            </div>
        </div>
    </div>
)

class RouteGroup extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <AppRoute exact path="/loading" layout={EmptyLayout} component={LoadingPage} />
                    <AppRoute exact path="/login" layout={EmptyLayout} component={Login} />
                    <AppRoute exact path="/" layout={MainLayout} component={Main} />
                    <AppRoute exact path="/register" layout={MainLayout} component={Register} />
                    <AppRoute exact path="/searchFilter" layout={MainLayout} component={SearchFilter} />
                    <AppRoute exact path="/searchChat" layout={MainLayout} component={SearchChat} />
                    <AppRoute exact path="/map" layout={MainLayout} component={Map} />
                    <AppRoute exact path="/chat" layout={MainLayout} component={Chat} />
                    <AppRoute exact path="/createchat" layout={MainLayout} component={CreateChat} />
                    <AppRoute exact path="/chatlist" layout={MainLayout} component={ChatList} />
                    <AppRoute exact path="/setting" layout={MainLayout} component={Setting} />

                    {/*<AppRoute exact path="/privacy" layout={MainLayout} component={Privacy} />*/}
                </Switch>
            </div>
        )
    }
}

export default RouteGroup;