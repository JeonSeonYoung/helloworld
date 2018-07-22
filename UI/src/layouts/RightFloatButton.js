import React, { Component } from 'react';

class RightFloatButton extends Component {

    state = {
        iconType: ""
    }

    getIconType() {
       switch(this.props.iconType) {
           case "search":
                return "fa fa-search"
           case "newChat":
               return "mdi mdi-note-outline"
           default:
               return "fa fa-search"
       }
    }

    render() {
        return (
            <div>
                <button type="button"
                        className="btn-success btn btn-circle btn-xl pull-right m-l-10 sj-float-right"
                        onClick={this.goPage}><i className={this.getIconType() + " text-white"}></i></button>
            </div>
        );
    }
}

export default RightFloatButton;


