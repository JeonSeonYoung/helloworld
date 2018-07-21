import React, { Component } from 'react';

class ChatLeft extends Component {
    render() {
        return (
            <li>
                <div className="chat-img"><img src="../assets/images/users/2.jpg" alt="user" /></div>
                <div className="chat-content">
                    <h5>{this.props.name}</h5>
                    <div className="box bg-light-success">{this.props.message}</div>
                    <div className="sj-chat-time">{this.props.time}</div>
                </div>
            </li>
        );
    }
}

export default ChatLeft;


