import React, { Component } from 'react';

class ModalButton extends Component {
    render() {
        return (
            <button type="button" className="btn waves-effect waves-light btn-info">
                {this.props.value}
            </button>
        );
    }
}

export default ModalButton;


