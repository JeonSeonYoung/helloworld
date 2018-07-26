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

    checkShow(buttonState) {
        console.log(this.state.backButton);
        if (buttonState == "")
            return "nodisplay"
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
                    {/*가운데 메뉴*/}
                    <div className="navbar-header">
                        <a className="navbar-brand" href="/">
                            {/*<img src="../assets/images/logo-hello.png"/>*/}
                            <img src="../assets/images/logo-white-icon.png"/>
                            <span className="sj-white">
                            HelloWorld
                        </span>
                        </a>
                    </div>
                    {/*왼쪽 메뉴*/}
                    <div className="navbar-collapse">
                        <ul className="navbar-nav mr-auto mt-md-0">
                            {/*뒤로가기 버튼*/}
                            <li className={"nav-item dropdown mega-dropdown " + this.checkShow(this.state.backButton)}>
                                <a className="nav-link dropdown-toggle text-muted waves-effect waves-dark"
                                   href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {this.state.backButton}
                                </a>
                            </li>
                            {/*메뉴버튼*/}
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-muted waves-effect waves-dark"
                                   href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="ti-menu"></i></a>
                                <div className="dropdown-menu dropdown-menu-left scale-up-left">
                                    <Link to="/"
                                          ref={(c)=> (this._element = c)}
                                          className="dropdown-item"
                                          aria-expanded="false"
                                          onClick={(e) => this.handleDocumentClick(e)}
                                    >
                                        <i className="ti-search mr-2"></i>Search Chatroom
                                    </Link>
                                    <Link to="/chatlist"
                                          className="dropdown-item"
                                          aria-expanded="false">
                                        <i className="mdi mdi-book-multiple mr-2"></i>Chat list
                                    </Link>
                                    <Link to="/setting"
                                          className="dropdown-item"
                                          aria-expanded="false">
                                        <i className="ti-settings mr-2"></i>Setting
                                    </Link>
                                    <a className="dropdown-item" href={null}>
                                        <i className="mdi mdi-logout mr-2"></i>Logout</a>

                                </div>
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
