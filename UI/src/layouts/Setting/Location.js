
import React, { Component } from 'react';

class Location extends Component {
    render() {
        return (
            <div className="form-group">
                <label htmlFor="example-location">Location Setting</label>
                <input type="text" id="example-location" name="example-location"
                        className="form-control" placeholder="10km"/>
            </div>
        );
    }
}

export default Location;