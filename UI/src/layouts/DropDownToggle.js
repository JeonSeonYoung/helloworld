import React, { Component } from 'react';

class DropDownToggle extends Component {
    render() {
        return (

            <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                {this.props.dropdownData}
            </button>
        );
    }
}

export default DropDownToggle;


