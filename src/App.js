import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Toolbar from './components/Toolbar.js';
import Compose from './components/Compose.js';
import Messages from './components/Messages.js';

const Home = (props) => {
  console.log(props);
  return (
    <div className="container">
      <h1>Get all yer Redux in a row!</h1>
      <Toolbar />
      {/* <Compose /> */}
      <Messages />
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/compose" component={Compose} />
        </div>
      </Router>
    );
  }
}

export default App;
