import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import './resource/css/colors/blue.css';
import './resource/css/sj-style.css';
import './resource/css/style.css';
import Common from './Common';

class App extends Component {
  render() {
    return (
      <div>
          <Common />
        {/*<Route exact path ="/" component={<Common />} />*/}
      </div>
    );
  }
}

export default App;
