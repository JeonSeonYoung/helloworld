import React, { Component } from 'react';

class Footer extends Component {
    goPage() {
        console.log('click go');
    }

    render() {
        return (
            <button type="button" className="waves-effect waves-light btn-success btn btn-circle
            m-l-10" onClick={this.goPage}></button>
        );
    }
}

export default Footer;


