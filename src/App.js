import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Toolbar from './components/Toolbar.js';
import Compose from './components/Compose.js';
import Messages from './components/Messages.js';

// const Home = (props) => {
//   return (
//     <div className="container">
//       <h1><Link to='/'>Get all yer Redux in a row!</Link></h1>
//       <Toolbar match={props.match}/>
//       {props.match.url ==='/compose' &&
//         <Compose match={props.match}/>
//       }
//       <Messages match={props.match} />
//     </div>
//   )
// }

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <h1><Link to='/'>Get all yer Redux in a row!</Link></h1>
          <Route path="/" render={(props) => <Toolbar {...props}/>} />
          <Route path="/compose" render={({history}) => <Compose history={history}/>} />
          <Messages />
        </div>
      </Router>
    );
  }
}

export default App;

// {/* <Route exact path="/" render={({match}) => <Home match={match}/>} /> */}
// {/* <Route path="/messages/:id" render={({match}) => <Home match={match}/>} /> */}
