import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import cookie from "react-cookies";

// const SomeComponent = withRouter(props => <Header {...props}/>);

// function getLeftButton() {
//     console.log(currentLocation);
//
//     // return (
//     //     <BackButton />
//     //     <MenuButton />
//     // )
// };

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backButton: ''
        };
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
    }

    // const currentLocation = this.props.location.pathname;

    handleDocumentClick(e) {
        // // const container = e.target;
        // const container = this._element;
        // console.log(container);
        // this.toggle();
        // console.log(this);
        // if (e.target !== container && !container.contains(e.target)) {
        //     this.toggle();
        // }
    }

    componentDidMount() {
        this.backButton();
    }

    backButton() {
        var url = window.location.href;
        if (url.substring(url.length, url.length -4) == "chat") {
            this.setState({
                backButton: (<i className="mdi mdi-arrow-left"></i>)
            })
        }
    }

    render() {
        return (
            <header className="topbar">
                <nav className="navbar top-navbar navbar-expand-md navbar-light">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="/">
                            <img src="../assets/images/logo-hello.png"/>
                            <span className="sj-white">
                            HelloWorld
                        </span>
                        </a>
                    </div>
                    {/*왼쪽 메뉴*/}
                    <div className="navbar-collapse">
                        {/*<ul className="navbar-nav">*/}
                            {/**/}
                        {/*</ul>*/}
                        <ul className="navbar-nav mr-auto mt-md-0">
                            <li className="nav-item dropdown mega-dropdown">
                                {/*뒤로가기 버튼*/}
                                <a className="nav-link dropdown-toggle text-muted waves-effect waves-dark"
                                   href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {this.state.backButton}
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                {/*메뉴버튼*/}
                                <a className="nav-link dropdown-toggle text-muted waves-effect waves-dark"
                                   href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="ti-menu"></i></a>
                                <div className="dropdown-menu dropdown-menu-right scale-up-left">
                                    <a className="dropdown-item" href="#">
                                        <i className="ti-search"></i>Search Chatroom</a>
                                    <a className="dropdown-item" href="#">
                                        <i className="mdi mdi-book-multiple"></i>Chat List</a>
                                    <a className="dropdown-item" href="#">
                                        <i className="flag-icon flag-icon-cn"></i>Setting</a>
                                    <a className="dropdown-item" href="#">
                                        <i className="flag-icon flag-icon-de"></i>Logout</a>
                                </div>
                            </li>
                            <li className="nav-item dropdown mega-dropdown">
                                {/*<div className="dropdown-menu scale-up-left col-sm-5 col-md-3 col-lg-3">*/}
                                {/*<ul>*/}
                                    {/*<li>*/}
                                        {/*<a href={null}*/}
                                           {/*ref={(c)=> (this._element = c)}*/}
                                           {/*onClick={(e) => this.handleDocumentClick(e)}>*/}
                                            {/*<h4>채팅방 검색</h4>*/}
                                        {/*</a>*/}
                                        {/*/!*<Link to="/"*!/*/}
                                              {/*/!*className="waves-effect waves-dark"*!/*/}
                                              {/*/!*aria-expanded="false"*!/*/}
                                              {/*/!*onClick={(e) => this.handleDocumentClick(e)}*!/*/}
                                        {/*/!*>*!/*/}
                                            {/*/!*<h4>채팅방 검색</h4>*!/*/}
                                        {/*/!*</Link>*!/*/}
                                    {/*</li>*/}
                                    {/*<li>*/}
                                        {/*<Link to="/chatlist"*/}
                                              {/*className="waves-effect waves-dark"*/}
                                              {/*aria-expanded="false">*/}
                                            {/*<h4>채팅방 리스트</h4>*/}
                                        {/*</Link>*/}
                                    {/*</li>*/}
                                    {/*<li>*/}
                                        {/*<Link to="/setting"*/}
                                              {/*className="waves-effect waves-dark"*/}
                                              {/*aria-expanded="false">*/}
                                            {/*<h4>설정</h4>*/}
                                        {/*</Link>*/}
                                    {/*</li>*/}
                                {/*</ul>*/}
                                {/*</div>*/}
                            </li>
                        </ul>
                        {this.props.children}
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;
