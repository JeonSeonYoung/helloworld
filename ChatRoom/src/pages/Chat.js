import React, { Component } from 'react';
// import Button from "../layouts/Button";
// import DropDownToggle from "../layouts/DropDownToggle";
// import Message from "../layouts/Message";
// import RightFloatButton from "../layouts/RightFloatButton";
// import Search from "../layouts/Search";
import ChatLeft from "../layouts/ChatLeft";
import ChatRight from "../layouts/ChatRight";

var socket = io.connect();

var UsersList = React.createClass({
    render() {
        return (
            <div className='users'>
                <h3> Online Users </h3>
                <ul>
                    {
                        this.props.users.map((user, i) => {
                            return (
                                <li key={i}>
                                    {user}
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
});

var Message = React.createClass({
    render() {
        return (
            <div className="message">
                <strong>{this.props.user} :</strong>
                <span>{this.props.text}</span>
            </div>
        );
    }
});

var MessageList = React.createClass({
    render() {
        return (
            <div className='messages'>
                <h2> Conversation: </h2>
                {
                    this.props.messages.map((message, i) => {
                        return (
                            <Message
                                key={i}
                                user={message.user}
                                text={message.text}
                            />
                        );
                    })
                }
            </div>
        );
    }
});

var MessageForm = React.createClass({

    getInitialState() {
        return {text: ''};
    },

    handleSubmit(e) {
        e.preventDefault();
        var message = {
            user : this.props.user,
            text : this.state.text
        }
        this.props.onMessageSubmit(message);
        this.setState({ text: '' });
    },

    changeHandler(e) {
        this.setState({ text : e.target.value });
    },

    render() {
        return(
            <div className='message_form'>
                <h3>Write New Message</h3>
                <form onSubmit={this.handleSubmit}>
                    <input
                        onChange={this.changeHandler}
                        value={this.state.text}
                    />
                </form>
            </div>
        );
    }
});

var ChangeNameForm = React.createClass({
    getInitialState() {
        return {newName: ''};
    },

    onKey(e) {
        this.setState({ newName : e.target.value });
    },

    handleSubmit(e) {
        e.preventDefault();
        var newName = this.state.newName;
        this.props.onChangeName(newName);
        this.setState({ newName: '' });
    },

    render() {
        return(
            <div className='change_name_form'>
                <h3> Change Name </h3>
                <form onSubmit={this.handleSubmit}>
                    <input
                        onChange={this.onKey}
                        value={this.state.newName}
                    />
                </form>
            </div>
        );
    }
});

class Chat extends Component {

    getInitialState() {
        return {users: [], messages:[], text: ''};
    }

    componentDidMount() {
        socket.on('init', this._initialize);
        socket.on('send:message', this._messageRecieve);
        socket.on('user:join', this._userJoined);
        socket.on('user:left', this._userLeft);
        socket.on('change:name', this._userChangedName);
    }

    _initialize(data) {
        var {users, name} = data;
        this.setState({users, user: name});
    }

    _messageRecieve(message) {
        var {messages} = this.state;
        messages.push(message);
        this.setState({messages});
    }

    _userJoined(data) {
        var {users, messages} = this.state;
        var {name} = data;
        users.push(name);
        messages.push({
            user: 'APPLICATION BOT',
            text : name +' Joined'
        });
        this.setState({users, messages});
    }

    _userLeft(data) {
        var {users, messages} = this.state;
        var {name} = data;
        var index = users.indexOf(name);
        users.splice(index, 1);
        messages.push({
            user: 'APPLICATION BOT',
            text : name +' Left'
        });
        this.setState({users, messages});
    }

    _userChangedName(data) {
        var {oldName, newName} = data;
        var {users, messages} = this.state;
        var index = users.indexOf(oldName);
        users.splice(index, 1, newName);
        messages.push({
            user: 'APPLICATION BOT',
            text : 'Change Name : ' + oldName + ' ==> '+ newName
        });
        this.setState({users, messages});
    }

    handleMessageSubmit(message) {
        var {messages} = this.state;
        messages.push(message);
        this.setState({messages});
        socket.emit('send:message', message);
    }

    handleChangeName(newName) {
        var oldName = this.state.user;
        socket.emit('change:name', { name : newName}, (result) => {
            if(!result) {
                return alert('There was an error changing your name');
            }
            var {users} = this.state;
            var index = users.indexOf(oldName);
            users.splice(index, 1, newName);
            this.setState({users, user: newName});
        });
    }

    render() {
        return (
            <div className="row">
                <UsersList
                    users={this.state.users}
                />
                <MessageList
                    messages={this.state.messages}
                />
                <MessageForm
                    onMessageSubmit={this.handleMessageSubmit}
                    user={this.state.user}
                />
                <ChangeNameForm
                    onChangeName={this.handleChangeName}
                />
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

