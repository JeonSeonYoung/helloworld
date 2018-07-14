import React, { Component } from 'react';
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
// import Button from "../layouts/Button";
// import DropDownToggle from "../layouts/DropDownToggle";
// import Message from "../layouts/Message";
// import RightFloatButton from "../layouts/RightFloatButton";
// import Search from "../layouts/Search";
import ChatRow from "../layouts/ChatRow";

class Chat extends Component {
    render() {
        return (
            <div className="main-wrapper">
                <Header/>
                <div className="page-wrapper">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card m-b-0">
                                    <div className="chat-main-box">
                                        <div className="chat-right-aside">
                                            <div className="chat-main-header">
                                                <div className="p-20 b-b">
                                                    <h3 className="box-title">Chat Message</h3>
                                                </div>
                                            </div>
                                            <div className="chat-rbox">
                                                <div className="slimScrollDiv">
                                                    <ul className="chat-list p-20">
                                                        <ChatRow/>
                                                    </ul>
                                                    <div className="slimScrollBar"></div>
                                                    <div className="slimScrollRail"></div>
                                                </div>
                                            </div>
                                            <div className="card-body b-t">
                                                <div className="row">
                                                    <div className="col-8">
                                                        <textarea placeholder="Type your message here"
                                                                  className="form-control b-0"></textarea>
                                                    </div>
                                                    <div className="col-4 text-right">
                                                        <button type="button"
                                                                className="btn btn-info btn-circle btn-lg"><i
                                                            className="fa fa-paper-plane-o"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>

                </div>
                <Footer/>
            </div>
        );
    }
}

export default Chat;

