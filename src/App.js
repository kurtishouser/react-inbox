import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home.js';

// moved Home component to separate file to see if test would run, they didn't
// import Toolbar from './components/Toolbar.js';
// import Compose from './components/Compose.js';
// import Messages from './components/Messages.js';

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
        <div>
          <Route exact path="/" render={({match}) => <Home match={match}/>} />
          <Route exact path="/compose" render={({match}) => <Home match={match}/>} />
          <Route path="/messages/:id" render={({match}) => <Home match={match}/>} />
        </div>
      </Router>
    );
  }
}

export default App;
