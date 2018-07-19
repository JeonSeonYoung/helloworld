import React, { Component } from 'react';
import Modal from '../pages/Modal';

class LinkButton extends Component {
    getClass() {
        switch(this.props.designType){
            case "button":
                return "waves-effect waves-light btn-info ml-1"
            default:
                return ""
        }
    }

    render() {
        return (
            <div>
                <button className={this.getClass() + " btn"} data-toggle="modal"
                        data-target={"#" + this.props.dataTarget}>{this.props.value}</button>
                <Modal id={this.props.dataTarget}/>
            </div>
        );
    }
}

export default LinkButton;