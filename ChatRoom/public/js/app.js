var React = require('react');

var socket = io.connect();

class Main extends Component {

    state = {
        "distance": "-1"
    }

    // render 다음에 작동
    componentDidMount() {
        this._getChatLists()
    }

    _getChatLists = async () => {
        const chatList = await this._callChatListApi();

    }


    //채팅방 리스트
    _callChatListApi = () => {
        return fetch('https://funk0a9a03.execute-api.ap-northeast-2.amazonaws.com/dev/getchatlist', {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: JSON.stringify({ userID: '1' })
        }).then(lData => lData.json())
            .catch(error => console.log(error))
    }

    _loadingFun = (() => {
        var lData = this.state.chatList.map((pData, index) => {
            return <Message chatName={pData.chatName} nickName={pData.masterNickName} cost={pData.maxCost} key={index} />
        })
        return lData
    })

    handleClick = () => {
        console.log('show popup');
    }

    handleCreate = (lData) => {
        console.log(lData);
    }

    render() {
        return (
          <div>
              test
          </div>
        );
    }
}


//var UsersList = React.com({
//	displayName: 'UsersList',

//	render: function render() {
//		return React.createElement(
//			'div',
//			{ className: 'users' },
//			React.createElement(
//				'h3',
//				null,
//				' Online Users '
//			),
//			React.createElement(
//				'ul',
//				null,
//				this.props.users.map(function (user, i) {
//					return React.createElement(
//						'li',
//						{ key: i },
//						user
//					);
//				})
//			)
//		);
//	}
//});

//var Message = React.createClass({
//	displayName: 'Message',

//	render: function render() {
//		return React.createElement(
//			'div',
//			{ className: 'message' },
//			React.createElement(
//				'strong',
//				null,
//				this.props.user,
//				' :'
//			),
//			React.createElement(
//				'span',
//				null,
//				this.props.text
//			)
//		);
//	}
//});

//var MessageList = React.createClass({
//	displayName: 'MessageList',

//	render: function render() {
//		return React.createElement(
//			'div',
//			{ className: 'messages' },
//			React.createElement(
//				'h2',
//				null,
//				' Conversation: '
//			),
//			this.props.messages.map(function (message, i) {
//				return React.createElement(Message, {
//					key: i,
//					user: message.user,
//					text: message.text
//				});
//			})
//		);
//	}
//});

//var MessageForm = React.createClass({
//	displayName: 'MessageForm',

//	getInitialState: function getInitialState() {
//		return { text: '' };
//	},

//	handleSubmit: function handleSubmit(e) {
//		e.preventDefault();
//		var message = {
//			user: this.props.user,
//			text: this.state.text
//		};
//		this.props.onMessageSubmit(message);
//		this.setState({ text: '' });
//	},

//	changeHandler: function changeHandler(e) {
//		this.setState({ text: e.target.value });
//	},

//	render: function render() {
//		return React.createElement(
//			'div',
//			{ className: 'message_form' },
//			React.createElement(
//				'h3',
//				null,
//				'Write New Message'
//			),
//			React.createElement(
//				'form',
//				{ onSubmit: this.handleSubmit },
//				React.createElement('input', {
//					onChange: this.changeHandler,
//					value: this.state.text
//				})
//			)
//		);
//	}
//});

//var ChangeNameForm = React.createClass({
//	displayName: 'ChangeNameForm',

//	getInitialState: function getInitialState() {
//		return { newName: '' };
//	},

//	onKey: function onKey(e) {
//		this.setState({ newName: e.target.value });
//	},

//	handleSubmit: function handleSubmit(e) {
//		e.preventDefault();
//		var newName = this.state.newName;
//		this.props.onChangeName(newName);
//		this.setState({ newName: '' });
//	},

//	render: function render() {
//		return React.createElement(
//			'div',
//			{ className: 'change_name_form' },
//			React.createElement(
//				'h3',
//				null,
//				' Change Name '
//			),
//			React.createElement(
//				'form',
//				{ onSubmit: this.handleSubmit },
//				React.createElement('input', {
//					onChange: this.onKey,
//					value: this.state.newName
//				})
//			)
//		);
//	}
//});

//var ChatApp = React.createClass({
//	displayName: 'ChatApp',

//	getInitialState: function getInitialState() {
//		return { users: [], messages: [], text: '' };
//	},

//	componentDidMount: function componentDidMount() {
//		socket.on('init', this._initialize);
//		socket.on('send:message', this._messageRecieve);
//		socket.on('user:join', this._userJoined);
//		socket.on('user:left', this._userLeft);
//		socket.on('change:name', this._userChangedName);
//	},

//	_initialize: function _initialize(data) {
//		var users = data.users;
//		var name = data.name;

//		this.setState({ users: users, user: name });
//	},

//	_messageRecieve: function _messageRecieve(message) {
//		var messages = this.state.messages;

//		messages.push(message);
//		this.setState({ messages: messages });
//	},

//	_userJoined: function _userJoined(data) {
//		var _state = this.state;
//		var users = _state.users;
//		var messages = _state.messages;
//		var name = data.name;

//		users.push(name);
//		messages.push({
//			user: 'APPLICATION BOT',
//			text: name + ' Joined'
//		});
//		this.setState({ users: users, messages: messages });
//	},

//	_userLeft: function _userLeft(data) {
//		var _state2 = this.state;
//		var users = _state2.users;
//		var messages = _state2.messages;
//		var name = data.name;

//		var index = users.indexOf(name);
//		users.splice(index, 1);
//		messages.push({
//			user: 'APPLICATION BOT',
//			text: name + ' Left'
//		});
//		this.setState({ users: users, messages: messages });
//	},

//	_userChangedName: function _userChangedName(data) {
//		var oldName = data.oldName;
//		var newName = data.newName;
//		var _state3 = this.state;
//		var users = _state3.users;
//		var messages = _state3.messages;

//		var index = users.indexOf(oldName);
//		users.splice(index, 1, newName);
//		messages.push({
//			user: 'APPLICATION BOT',
//			text: 'Change Name : ' + oldName + ' ==> ' + newName
//		});
//		this.setState({ users: users, messages: messages });
//	},

//	handleMessageSubmit: function handleMessageSubmit(message) {
//		var messages = this.state.messages;

//		messages.push(message);
//		this.setState({ messages: messages });
//		socket.emit('send:message', message);
//	},

//	handleChangeName: function handleChangeName(newName) {
//		var _this = this;

//		var oldName = this.state.user;
//		socket.emit('change:name', { name: newName }, function (result) {
//			if (!result) {
//				return alert('There was an error changing your name');
//			}
//			var users = _this.state.users;

//			var index = users.indexOf(oldName);
//			users.splice(index, 1, newName);
//			_this.setState({ users: users, user: newName });
//		});
//	},

//	render: function render() {
//		return React.createElement(
//			'div',
//			null,
//			React.createElement(UsersList, {
//				users: this.state.users
//			}),
//			React.createElement(MessageList, {
//				messages: this.state.messages
//			}),
//			React.createElement(MessageForm, {
//				onMessageSubmit: this.handleMessageSubmit,
//				user: this.state.user
//			}),
//			React.createElement(ChangeNameForm, {
//				onChangeName: this.handleChangeName
//			})
//		);
//	}
//});


    