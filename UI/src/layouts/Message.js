import React, { Component } from 'react';
import LinesEllipsis from 'react-lines-ellipsis';

class Message extends Component {
    goPage() {
        console.log('click go');
    }

    render() {
        return (
            <a href="./chat" className="soo-card">
                <div className="row">
                    <div className="col-md-5 col-8 align-self-center">
                        {/*방장 유무에 따라 채팅방 앞에 별표 아이콘 제공할 것임*/}
                        <div className="mail-contnet ml-3">
                            <h5>
                                <LinesEllipsis 
                                    text={this.props.chatName} 
                                    maxLine='1' 
                                    ellipsis='...'
                                    trimRight
                                    basedOn='letters'
                                />
                            </h5> <span className="mail-desc">{this.props.nickName}</span>
                            <span className="badge badge-info">{this.props.interest}</span>
                            <span className="badge badge-warning">{this.props.cost}</span>
                        </div>
                    </div>
                    <div className="col-md-7 col-4 align-self-center d-flex m-t-10 justify-content-end">
                        <button type="button" className="btn waves-effect waves-light btn-lg btn-primary"
                                onClick={this.goPage}>Join</button>
                    </div>
                </div>
            </a>
        );
    }
}

export default Message;


