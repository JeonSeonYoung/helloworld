import React, { Component } from 'react';
import ChatLeft from "../layouts/ChatLeft";
import ChatRight from "../layouts/ChatRight";
import ChatUser from "../layouts/ChatUser";
import Modal from '../pages/Modal';

class Chat2 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userInfo: {
                userName: ""
            }
        }

        this.getUserInfo = this.getUserInfo.bind(this);
    }

    getUserInfo(name) {
        this.setState({
            userInfo: {
                userName: name
            }
        })
    }

    render() {
        return (

            <div className="row pt-4">
                <div className="col-12">
                    <div className="card m-b-0">
                    <div className="chat-main-box">
                        {/*사용자 리스트*/}
                        <div className="chat-left-aside">
                            <div className="open-panel">
                                <i className="ti-angle-right"></i>
                            </div>
                            <div className="chat-left-inner">
                                {/*<div className="form-material">*/}
                                    {/*<input className="form-control p-20" type="text" placeholder="Search Contact" />*/}
                                {/*</div>*/}
                                <ul className="chatonline style-none sj-pb-50">
                                    <ChatUser name="Arijit Sinh" getUserInfo={this.getUserInfo} />
                                    <ChatUser name="Arijit Sinh" getUserInfo={this.getUserInfo} />
                                    <ChatUser name="Arijit Sinh" getUserInfo={this.getUserInfo} />
                                    <ChatUser name="Arijit Sinh" getUserInfo={this.getUserInfo} />
                                    <ChatUser name="Arijit Sinh" getUserInfo={this.getUserInfo} />
                                    <ChatUser name="Arijit Sinh" getUserInfo={this.getUserInfo} />
                                    <ChatUser name="Arijit Sinh" getUserInfo={this.getUserInfo} />
                                </ul>
                                <div className="sj-fixed-bottom sj-chat-out btn-block pb-3 pt-3 sj-bg-danger">
                                    <button type="button" className="btn-danger btn-block">Go Out</button>
                                </div>
                                {/*<div className="sj-fixed-bottom container pt-2 pb-2*/}
                                                {/*bg-white sj-bottom-9*/}
                                                {/*border border-bottom-0 border-left-0 border-right-0 ">*/}
                                    {/*<button type="button" className="btn btn-danger btn-block">Go Out</button>*/}
                                {/*</div>*/}
                            </div>

                        </div>
                        <Modal id="chatUserInfo" userInfo={this.state.userInfo}/>
                        {/*채팅 메세지*/}
                        <div className="chat-right-aside">
                            <div className="chat-main-header">
                                <div className="p-20 b-b">
                                    <h3 className="box-title">Chat Message</h3>
                                </div>
                            </div>
                            <div className="chat-rbox">
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
                            </div>
                            <div className="card-body b-t pb-0">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend mr-1">
                                        <button className="btn btn-lg p-0 mt-2 sj-no-focus sj-no-background" type="button">
                                            <i className="mdi mdi-plus"></i></button>
                                    </div>
                                    <input type="text" className="form-control border-0" />
                                    <div>
                                        <button className="btn btn-info btn-circle btn-lg p-0" type="submit">
                                            <i className="fa fa-paper-plane-o"></i>
                                        </button>
                                    </div>
                                </div>
                                {/*<div className="row">*/}
                                    {/*<div className="">*/}
                                        {/*<button type="button"*/}
                                                {/*className="btn btn-lg p-0 ml-3 sj-no-focus sj-no-background">*/}
                                            {/*<i className="fa fa-file-photo-o"></i></button>*/}
                                    {/*</div>*/}
                                    {/*<div className="col-8 p-0">*/}
                                         {/*<textarea placeholder="Type your message here"*/}
                                               {/*className="form-control b-0"></textarea>*/}
                                    {/*</div>*/}
                                    {/*<div className="col-2 p-0 text-right">*/}
                                        {/*<button type="button"*/}
                                                {/*className="btn btn-info btn-circle btn-lg p-0">*/}
                                            {/*<i className="fa fa-paper-plane-o"></i></button>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

            </div>


        );
    }
}

export default Chat2;

