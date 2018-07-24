import React, { Component } from 'react';

class TextNotify extends Component {

    // [props]
    // text : 내용
    render() {
        return (
            <div className="row">
                <div className="col-4 sj-m-0-auto sj-p-40-0">
                    {this.props.text}
                </div>
            </div>
        );
    }
}

export default TextNotify;


