import React, { Component } from 'react';

class RightFloatButton extends Component {

    state = {
        iconType: ""
    }

    getIconType() {
        console.log(this.props.iconType);
       switch(this.props.iconType) {
           case "search":
                return "fa fa-search"
           case "newChat":
               return "mdi mdi-note-outline"
           default:
               return "fa fa-search"
       }
    }


    goPage() {
        console.log('click go');
    }

    render() {
        return (
            <div>
                <button type="button"
                        className="waves-effect waves-light btn-success btn btn-circle btn-xl pull-right m-l-10"
                        onClick={this.goPage}><i className={this.getIconType() + " text-white"}></i></button>
            </div>
        );
    }
}

export default RightFloatButton;


