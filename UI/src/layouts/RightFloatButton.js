import React, { Component } from 'react';

class RightFloatButton extends Component {
    goPage() {
        console.log('click go');
    }

    render() {
        return (
            <div>
                <button type="button"
                        className="waves-effect waves-light btn-success btn btn-circle btn-xl pull-right m-l-10"
                        onClick={this.goPage}><i className="fa fa-search text-white"></i></button>
            </div>
        );
    }
}

export default RightFloatButton;


