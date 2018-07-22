import React, { Component } from 'react';

class ChatUser extends Component {
    render() {
        return (
            <li>
                <a href={null}
                   data-toggle="modal" data-target="#chatUserInfo"
                   onClick={() => this.props.getUserInfo(this.props.name)}>
                    <span>{this.props.name}</span>
                </a>
            </li>
        );
    }
}

export default ChatUser;


