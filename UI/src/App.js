import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import './resource/css/colors/blue.css';
import './resource/css/sj-style.css';
import './resource/css/style.css';
import Common from './Common';

// 라우터공부중
// {/*<Route exact path ="/" component={<Common />} />*/}
// <div>
//     {/*<Common />*/}
//     {/*<Router>*/}
//         {/*<div>*/}
//            {/**/}
//         {/*</div>*/}
//         {/*/!*<Common/>*!/*/}
//     {/*</Router>*/}
// </div>

class App extends Component {
  render() {
    return (
        <Common />
    );
  }
}

export default App;
