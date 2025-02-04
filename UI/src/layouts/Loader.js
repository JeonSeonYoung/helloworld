import React, { Component } from 'react';

class Loader extends Component {
    render() {
        return (
            <div className="preloader">
                <svg className="circular" viewBox="25 25 50 50">
                    <circle className="path" cx="50" cy="50" r="20" fill="none" stroke-width="2"
                            stroke-miterlimit="10"/>
                </svg>
            </div>
        );
    }
}

export default Loader;


