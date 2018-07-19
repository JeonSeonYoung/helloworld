import React, { Component } from 'react';
import ChatLeft from "../layouts/ChatLeft";
import TypeIcon from '../layouts/TypeIcon';

class Chat extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <div className="card m-b-0">
                        <div className="chat-main-box">
                            <div className="chat-right-aside">
                                <div className="chat-main-header">
                                    <div className="p-20 b-b">
                                        <h3 className="box-title">Register basic options</h3>
                                    </div>
                                </div>
                                <div className="chat-rbox">
                                    <div className="slimScrollDiv">
                                        <ul className="chat-list p-20">
                                            <ChatLeft name="Admin"
                                                       message="Hello {username}, please select one your preference."
                                            />
                                            <li className="reverse">
                                                <div className="chat-content">
                                                    <div className="form-group">
                                                        <label>관심분야</label>
                                                        <div className="container">
                                                            <div className="row mb-2">
                                                                <div className="col-sm"><TypeIcon text="반려동물" /></div>
                                                                <div className="col-sm"><TypeIcon text="문화/공연" onClick={this.addSelectedIcon} /></div>
                                                                <div className="col-sm"><TypeIcon text="봉사" getSelectedIcon={this.getSelectedIcon} /></div>
                                                                <div className="col-sm"><TypeIcon text="운동/스포츠" /></div>
                                                            </div>
                                                            <div className="row mb-2">
                                                                <div className="col-sm"><TypeIcon text="책/글" /></div>
                                                                <div className="col-sm"><TypeIcon text="직무" /></div>
                                                                <div className="col-sm"><TypeIcon text="외국어" /></div>
                                                                <div className="col-sm"><TypeIcon text="음악/악기" /></div>
                                                            </div>
                                                            <div className="row mb-2">
                                                                <div className="col-sm"><TypeIcon text="댄스/무용" /></div>
                                                                <div className="col-sm"><TypeIcon text="사교/인맥" /></div>
                                                                <div className="col-sm"><TypeIcon text="사진" /></div>
                                                                <div className="col-sm"><TypeIcon text="야구관람" /></div>
                                                            </div>
                                                            <div className="row mb-2">
                                                                <div className="col-sm"><TypeIcon text="게임/오락" /></div>
                                                                <div className="col-sm"><TypeIcon text="요리/제조" /></div>
                                                                <div className="col-sm"><TypeIcon text="가족/결혼" /></div>
                                                                <div className="col-sm"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <ChatLeft name="Admin"
                                                      message="You choose {preference}. If you want more, please you setting page."
                                            />
                                            <ChatLeft name="Admin"
                                                      message="Where is your location?"
                                            />
                                            <ChatLeft name="Admin"
                                                      message="What is your nickname?"
                                            />
                                            <div>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <button type="button" className="btn btn-success btn-block">저장</button>
                                        </ul>
                                        <div className="slimScrollBar"></div>
                                        <div className="slimScrollRail"></div>
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

