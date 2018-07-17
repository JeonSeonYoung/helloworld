import React, { Component } from 'react';

class TagButton extends Component {
    render() {
        return (
            <button type="button" className="btn waves-effect waves-light btn-info">
                #동물
                <i className="mdi mdi-close"></i>
            </button>
        );
    }
}

export default TagButton;


