import React, { Component } from 'react';

class Search extends Component {
    render() {
        return (
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Search for..." />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
                </div>
            </div>
        );
    }
}

export default Search;


