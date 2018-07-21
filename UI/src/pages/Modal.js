import React, { Component } from 'react';
import Setting from '../pages/Setting';
import SearchFilter from '../layouts/SearchFilter';

class Modal extends Component {
    getModal() {
        switch(this.props.id) {
            case "setting":
                return <Setting />
            case "searchFilter":
                return <SearchFilter />
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


