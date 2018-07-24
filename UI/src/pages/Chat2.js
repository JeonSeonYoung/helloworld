import React, { Component } from 'react';
import ChatLeft from "../layouts/ChatLeft";
import ChatRight from "../layouts/ChatRight";
import ChatUser from "../layouts/ChatUser";
import Modal from '../pages/Modal';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import styled from 'styled-components'

const NoDots = styled.div`
  hr {
    visibility: hidden;
  }
`

const OutputText = styled.div`
  white-space: normal !important;
  word-break: break-all !important;
  overflow: initial !important;
  width: 100%;
  height: auto !important;
  color: #fafafa !important;
`

class Chat2 extends Component {

    constructor(props, context) {
        super(props, context)

        const { chatHistory } = props

        this.state = {
            chatHistory,
            input: ''
        }

        this.onInput = this.onInput.bind(this)
        this.onSendMessage = this.onSendMessage.bind(this)
        this.onMessageReceived = this.onMessageReceived.bind(this)
        this.updateChatHistory = this.updateChatHistory.bind(this)
        this.scrollChatToBottom = this.scrollChatToBottom.bind(this)
    }

    componentDidMount() {
        this.props.registerHandler(this.onMessageReceived)
        this.scrollChatToBottom()
    }

    componentDidUpdate() {
        this.scrollChatToBottom()
    }

    componentWillUnmount() {
        this.props.unregisterHandler()
    }

    onInput(e) {
        this.setState({
            input: e.target.value
        })
    }

    onSendMessage() {
        if (!this.state.input)
            return

        this.props.onSendMessage(this.state.input, (err) => {
            if (err)
                return console.error(err)

            return this.setState({ input: '' })
        })
    }

    onMessageReceived(entry) {
        console.log('onMessageReceived:', entry)
        this.updateChatHistory(entry)
    }

    updateChatHistory(entry) {
        this.setState({ chatHistory: this.state.chatHistory.concat(entry) })
    }

    scrollChatToBottom() {
        this.panel.scrollTo(0, this.panel.scrollHeight)
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
                                    <ul className="chatonline style-none sj-pb-50">
                                        <ChatUser name="Arijit Sinh" getUserInfo={this.getUserInfo} />
                                        <ChatUser name="Arijit Sinh" getUserInfo={this.getUserInfo} />
                                        <ChatUser name="Arijit Sinh" getUserInfo={this.getUserInfo} />
                                        <ChatUser name="Arijit Sinh" getUserInfo={this.getUserInfo} />
                                        <ChatUser name="Arijit Sinh" getUserInfo={this.getUserInfo} />
                                        <ChatUser name="Arijit Sinh" getUserInfo={this.getUserInfo} />
                                        <ChatUser name="Arijit Sinh" getUserInfo={this.getUserInfo} />
                                        <ChatUser name="Arijit Sinh" getUserInfo={this.getUserInfo} />
                                        <ChatUser name="Arijit Sinh" getUserInfo={this.getUserInfo} />
                                        <ChatUser name="Arijit Sinh" getUserInfo={this.getUserInfo} />
                                    </ul>
                                    <div className="sj-fixed-bottom sj-chat-out btn-block sj-bg-danger">
                                        <button type="button" onClick={this.props.onLeave} className="btn-danger btn-block sj-h-100">Go Out</button>
                                    </div>
                                </div>
                            </div>
                            <Modal id="chatUserInfo" userInfo="" />
                            {/*채팅 리스트*/}
                            <div className="chat-right-aside">
                                <div className="chat-main-header">
                                    <div className="p-20 b-b">
                                        <h3 className="box-title">{this.props.chatroom.name}</h3>
                                    </div>
                                </div>
                                <div className="chat-rbox">
                                    <ul className="chat-list p-20">
                                        <List>
                                            {
                                                this.state.chatHistory.map(
                                                    ({ user, message, event }, i) => [
                                                        <NoDots>
                                                            <ListItem
                                                                key={i}
                                                                style={{ color: '#fafafa' }}
                                                                primaryText={`${user.name} ${event || ''}`}
                                                                secondaryText={
                                                                    message &&
                                                                    <OutputText>
                                                                        {message}
                                                                    </OutputText>
                                                                }
                                                            />
                                                        </NoDots>,
                                                        <Divider inset />
                                                    ]
                                                )
                                            }
                                        </List>
                                    </ul>
                                </div>
                                <div className="card-body b-t pb-0">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend mr-1">
                                            <button onClick={this.onSendMessage} onChange={this.onInput} value={this.state.input} onKeyPress={e => (e.key === 'Enter' ? this.onSendMessage() : null)} className="btn btn-lg p-0 mt-2 sj-no-focus sj-no-background" type="button">
                                                <i className="mdi mdi-plus"></i></button>
                                        </div>
                                        <input type="text" className="form-control border-0" />
                                        <div>
                                            <button onClick={this.onSendMessage} className="btn btn-info btn-circle btn-lg p-0" type="submit">
                                                <i className="fa fa-paper-plane-o"></i>
                                            </button>
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

export default Chat2;

