import React, { Component } from 'react';
import Modal from '../pages/Modal';


class ModalButton extends Component {
    redirect = () => {
        return <Modal id="map" vLocation={this.props.vLocation}/>
    }

    render() {
        return (
            <button type="button" onClick={this.redirect} className="btn waves-effect waves-light btn-info">
                {this.props.value}
            </button>
        );
    }
}

export default ModalButton;


