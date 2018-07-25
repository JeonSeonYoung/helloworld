import React, { Component } from 'react';
import Setting from '../pages/Setting';
import SearchFilter from '../layouts/SearchFilter';
import CreateChat from "./CreateChat";
import ChatUserInfo from "../pages/ChatUserInfo";
import Map from "../pages/Map";

class Modal extends Component {
    getModal() {
        switch(this.props.id) {
            case "setting":
                return <Setting />

            case "searchFilter":
                return <SearchFilter />

            case "map":
                return <Map />

            case "createChat":
                return <CreateChat />

            // 채팅창에서 사용자 클릭했을 때
            case "chatUserInfo":
                return <ChatUserInfo userInfo={this.props.userInfo} />

            default:
                return
        }
    }
    render() {
        return (
            <div className="modal fade nodisplay" id={this.props.id} tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel"aria-hidden="true">
                {this.getModal()}
            </div>
        );
    }
}

export default Modal;


