import React, { Component } from 'react';
import Setting from '../layouts/Setting';
import SearchChat from '../layouts/SearchChat';

class Modal extends Component {
    getModal() {
        console.log(this.props);
        switch(this.props.id) {
            case "setting":
                return <Setting />
            case "searchChat":
                return <SearchChat />
            default:
                return
        }
    }
    render() {
        return (
            <div className="modal fade nodisplay" id={this.props.id}
                 tabIndex="-1" role="dialog" aria-hidden="true">
                {this.getModal()}
            </div>
        );
    }
}

export default Modal;


