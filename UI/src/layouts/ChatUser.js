import React, { Component } from 'react';

class ChatUser extends Component {
    render() {
        return (
            <li>
                <a href="javascript:void(0)" data-toggle="modal" data-target="#chatUserInfo">
                    <span>{this.props.name}</span>
                </a>
            </li>
        );
    }
}

export default ChatUser;


