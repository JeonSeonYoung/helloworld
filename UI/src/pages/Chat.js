import React, { Component } from 'react';
// import Button from "../layouts/Button";
// import DropDownToggle from "../layouts/DropDownToggle";
// import Message from "../layouts/Message";
// import RightFloatButton from "../layouts/RightFloatButton";
// import Search from "../layouts/Search";
import ChatUser from "../layouts/ChatUser";
import ChatLeft from "../layouts/ChatLeft";
import ChatRight from "../layouts/ChatRight";

class Chat extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <div className="card m-b-0">
                        <div className="chat-main-box">
                            <div className="chat-left-aside">
                                <div className="open-panel"><i className="ti-angle-right"></i></div>
                                <div className="chat-left-inner">
                                    <div className="form-material">
                                        <input className="form-control p-20" type="text" placeholder="Search Contact" />
                                    </div>
                                    <ul className="chatonline style-none ">
                                        <ChatUser name="Genelia Deshmukh" />
                                        <ChatUser name="Genelia Deshmukh" />
                                    </ul>
                                </div>
                            </div>
                            <div className="chat-right-aside">
                                <div className="chat-main-header">
                                    <div className="p-20 b-b">
                                        <h3 className="box-title">Chat Message</h3>
                                    </div>
                                </div>
                                <div className="chat-rbox">
                                    <div className="slimScrollDiv">
                                        <ul className="chat-list p-20">
                                            <ChatLeft name="Bianca Doe"
                                                       message="Chat messages~"
                                                       time="10:55 am" />
                                            <ChatRight name="Bianca Doe"
                                                       message="Chat messages~"
                                                       time="10:55 am" />
                                            <ChatLeft name="Bianca Doe"
                                                      message="Chat messages~"
                                                      time="10:55 am" />
                                            <ChatRight name="Bianca Doe"
                                                       message="It’s Great opportunity to work."
                                                       time="10:55 am" />
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
        );
    }
}

export default Chat;

