import React, { Component } from 'react';

class Search extends Component {
    render() {
        return (
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Search for..." />
                    <span className="input-group-btn">
                          <button className="btn btn-info" type="button">검색</button>
                        </span>
            </div>
        );
    }
}

export default Search;


