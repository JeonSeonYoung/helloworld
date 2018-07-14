import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Common from './components/Common';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Common />,
    document.getElementById('root'));
registerServiceWorker();
