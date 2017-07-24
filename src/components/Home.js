import React from 'react';
import { Link } from 'react-router-dom';
import Toolbar from './Toolbar.js';
import Compose from './Compose.js';
import Messages from './Messages.js';

const Home = (props) => {
  return (
    <div className="container">
      <h1><Link to='/'>Get all yer Redux in a row!</Link></h1>
      <Toolbar match={props.match}/>
      {props.match.url ==='/compose' &&
        <Compose match={props.match}/>
      }
      <Messages match={props.match} />
    </div>
  )
}

export default Home;
