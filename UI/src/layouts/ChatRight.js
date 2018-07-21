import React, { Component } from 'react';

class ChatRight extends Component {
    render() {
        return (
            <li className="reverse">
                <div className="chat-content">
                    <h5>{this.props.name}</h5>
                    <div className="box bg-light-success">{this.props.message}</div>
                    <div className="sj-chat-time">{this.props.time}</div>
                </div>
            </li>
        );
    }
}


export default ChatRight;


