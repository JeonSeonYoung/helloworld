import React, { Component } from 'react';
import '../resources/css/colors/blue.css';
import '../resources/css/sj-style.css';
import '../resources/css/style.css';
import { BrowserRouter } from 'react-router-dom';
import RouteGroup from "../resources/utils/Routes";

class Common extends Component {
    render() {
        return (
            <BrowserRouter>
                <RouteGroup/>
            </BrowserRouter>
        );
    }
}

export default Common;
