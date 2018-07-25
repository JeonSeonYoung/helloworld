import React, { Component } from 'react';

const redirect = () => {
    window.location.href = "./Map";
}

class ModalButton extends Component {
    render() {
        return (
            <button type="button" onClick={redirect} className="btn waves-effect waves-light btn-info">
                {this.props.value}
            </button>
        );
    }
}

export default ModalButton;


