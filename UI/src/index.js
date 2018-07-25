import React from 'react';
import ReactDOM from 'react-dom';
import Common from './components/Common';

window.FB._https = true;

ReactDOM.render(
    <Common />,
    document.getElementById('main-wrapper'));