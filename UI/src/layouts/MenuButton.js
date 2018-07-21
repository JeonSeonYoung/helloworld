import React, { Component } from 'react';

class TagButton extends Component {
    render() {
        return (
            <a className="nav-link dropdown-toggle text-muted waves-effect waves-dark" href=""
               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="ti-menu"></i>
            </a>
        );
    }
}

export default TagButton;


