import React, { Component } from 'react';
import Setting from './Setting';

class LinkButton extends Component {
    render() {
        return (
            <div>
                <button className="btn waves-effect waves-light btn-info ml-1" data-toggle="modal"
                        data-target={"#" + this.props.dataTarget}>{this.props.value}</button>

                <div className="modal fade nodisplay" id="myModal" tabIndex="-1" role="dialog"
                     aria-hidden="true">
                    <Setting />
                </div>
            </div>
        );
    }
}

export default LinkButton;


