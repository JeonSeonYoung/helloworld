import React, { Component } from 'react';

class TypeIcon2 extends Component {
    state = {
        disabled: false
    }

    getDisabled() {
        return (this.state.disabled) ? "disabled" : "";
    }

    render() {
        return (
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3">
                <button type="button"
                        className={"btn-success btn sj-icon m-l-10 mb-2" + this.getDisabled()}
                        // onClick={(e) => {
                        //     {
                        //         this.setState(prevState => ({
                        //             disabled: !prevState.disabled
                        //         }));
                        //
                        //         this.props.onClick(this.state.disabled, this.props.text)
                        //     }
                        // }}
                >{this.props.text}</button>
            </div>
        );
    }
}

export default TypeIcon2;


